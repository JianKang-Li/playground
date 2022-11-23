import sys

from PyQt5.QtCore import QStringListModel
from PyQt5.QtGui import QIcon

from PyQt5.QtWidgets import QApplication, QMainWindow, QAction, QMenu, QSystemTrayIcon, qApp
from tool import Ui_MainWindow
from os import system, chdir, popen
import re


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
    return result


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
        self.lists = get_install_list()
        for i in self.lists:
            self.items.append(i['name'])
        self.listModel = QStringListModel()
        self.listModel.setStringList(self.items)
        self.result.setModel(self.listModel)
        self.result.clicked.connect(self.clicked)

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
    myWin.setWindowTitle('工具箱')
    myWin.setWindowIcon(QIcon("./favicon.ico"))
    myWin.show()
    app.setQuitOnLastWindowClosed(False)
    sys.exit(app.exec_())
