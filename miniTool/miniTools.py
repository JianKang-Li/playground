import sys
from PyQt5.QtCore import QStringListModel
from PyQt5.QtGui import QIcon

from PyQt5.QtWidgets import QApplication, QMainWindow, QAction, QMenu, QSystemTrayIcon, qApp, QFileDialog, QMessageBox
from tool import Ui_MainWindow
from os import system, chdir, popen, listdir, rename, path
import re
import win32api


# 打包 pyinstaller -F -w -i favicon.ico miniTools.py


def get_install_list():
    import winreg
    result = []
    # 需要遍历的两个注册表
    sub_key = [r'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall',
               r'SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall']

    for i in sub_key:
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, i)
        for j in range(winreg.QueryInfoKey(key)[0]):
            try:
                obj = {}
                each_key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, f'{i}\\{winreg.EnumKey(key, j)}')
                DisplayName = winreg.QueryValueEx(each_key, 'DisplayName')[0]
                path = winreg.QueryValueEx(each_key, 'DisplayIcon')[0]
                res = re.compile(r'.*\.ico$')
                if (path != "" and not res.match(path)):
                    obj["name"] = DisplayName
                    obj["path"] = path
                    result.append(obj)
            except WindowsError:
                pass
    key = winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                         r'Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders')
    desk = winreg.QueryValueEx(key, "Desktop")[0]
    for item in listdir(desk):
        obj = {}
        if (re.search(r".lnk", item) != None):
            obj['name'] = item
            obj['path'] = desk + "\\" + item
            result.append(obj)
    return [result, desk]


class MyMainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(MyMainWindow, self).__init__(parent)
        self.setupUi(self)
        self.ui = Ui_MainWindow
        self.setTrayIcon()
        self.init_ui()

    def init_ui(self):
        self.registry.clicked.connect(self.openRegistry)
        self.control.clicked.connect(self.openControl)
        self.exec.clicked.connect(self.execCmd)
        self.dev.clicked.connect(self.openDev)
        self.disk.clicked.connect(self.openDisk)
        self.command.clicked.connect(self.openCmd)
        self.server.clicked.connect(self.openServe)
        self.items = []
        self.lists = get_install_list()[0]
        for i in self.lists:
            self.items.append(i['name'])
        self.desktop = get_install_list()[1]
        self.listModel = QStringListModel()
        self.listModel.setStringList(self.items)
        self.result.setModel(self.listModel)
        self.result.clicked.connect(self.clicked)
        self.check_folder.clicked.connect(self.getFilePath)
        self.renamebtn.clicked.connect(self.rename)
        self.path = None
        self.replace.clicked.connect(self.rep)
        self.screenshots.clicked.connect(self.shots)

    def rep(self):
        if (self.Text.toPlainText() != '' and self.replaceText.text() != ""):
            text = self.Text.toPlainText()
            reps = self.replaceText.text()
            word = self.words.text()
            if (reps == "\\n"):
                result = text.replace('\n', word)
            elif (word == "\\n"):
                result = text.replace(reps, "\n")
            else:
                result = text.replace(reps, word)
            self.Text.setPlainText(result)
        else:
            self.show_message("请确保文本和待替换文本不为空")

    def show_message(self, message):
        QMessageBox.about(self, "tip", message)

    def getFilePath(self):
        directory = QFileDialog.getExistingDirectory(None, "选取文件夹", "c:/")  # 起始路径
        if directory != '':
            self.path = directory
            self.floder.setText(directory)

    def rename(self):
        if (self.path != None):
            if (self.filename.text() != ''):
                filename = self.filename.text()
                num = 1
                # 遍历更改文件名
                for file in listdir(self.path):
                    arr = file.split('.')
                    extend = arr[len(arr) - 1]
                    if len(arr) >= 2:
                        rename(path.join(self.path, file),
                               path.join(self.path, filename.format(n=str(num)) + '.' + extend))

                        num += 1
                self.show_message("重命名完成")
            else:
                self.show_message("请输入示例文件名使用{n}为重命名默认字段")
        else:
            self.show_message('请先选择文件夹')

    def setTrayIcon(self):
        # 初始化菜单单项
        self.quitAppAction = QAction("退出")
        # 菜单单项连接方法
        self.quitAppAction.triggered.connect(self.quitApp)
        # 初始化菜单列表
        self.trayIconMenu = QMenu()
        self.trayIconMenu.addAction(self.quitAppAction)
        # 构建菜单UI
        self.trayIcon = QSystemTrayIcon()
        self.trayIcon.setContextMenu(self.trayIconMenu)
        self.trayIcon.setIcon(QIcon("./favicon.ico"))
        # 左键双击打开主界面
        self.trayIcon.activated[QSystemTrayIcon.ActivationReason].connect(self.openMainWindow)
        # 允许托盘菜单显示
        self.trayIcon.show()

    def openMainWindow(self, reason):
        if reason == QSystemTrayIcon.DoubleClick:
            self.showNormal()
            self.activateWindow()

    def quitApp(self):
        qApp.quit()

    def clicked(self, qModel):
        index = qModel.row()
        name = self.items[index]
        item = None
        for i in self.lists:
            if (i['name'] == name):
                item = i
                break
        self.openSoft(item['path'])

    def openSoft(self, path):
        path = path.replace('"', "")
        if (re.search(r'lnk', path) != None):
            win32api.ShellExecute(0, 'open',path, '', '', 1)
        else:
            arr = path.split("\\")
            exe = arr[len(arr) - 1]
            pa = path[0:len(path) - len(exe) - 1]
            arr1 = exe.split(",")
            exe = arr1[0]
            b = None
            try:
                chdir(pa)
                b = popen('"{}"'.format(exe))
            except Exception as e:
                b.close()

    def openServe(self):
        system('start /B services.msc')

    def openRegistry(self):
        system('start /B regedit.exe')

    def openControl(self):
        system("start /B control")

    def openDev(self):
        system('start /B devmgmt.msc')

    def openDisk(self):
        system('start /B diskmgmt.msc')

    def openCmd(self):
        system('start cmd')

    def shots(self):
        system('start snippingtool')

    def execCmd(self):
        try:
            app = re.compile(self.search.text(), re.I)
            self.items = []
            for i in range(0, len(self.lists)):
                if (app.match(self.lists[i]["name"])):
                    self.items.append(self.lists[i]['name'])
            self.listModel.setStringList(self.items)
            self.result.setModel(self.listModel)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    myWin = MyMainWindow()
    myWin.setWindowTitle('miniTools')
    myWin.setWindowIcon(QIcon("./favicon.ico"))
    myWin.show()
    app.setQuitOnLastWindowClosed(False)
    sys.exit(app.exec_())
