import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from tool import Ui_MainWindow
from os import system


class MyMainWindow(QMainWindow, Ui_MainWindow):
	def __init__(self, parent=None):
		super(MyMainWindow, self).__init__(parent)
		self.setupUi(self)
		self.registry.clicked.connect(self.openRegistry)
		self.control.clicked.connect(self.openControl)
		self.exec.clicked.connect(self.execCmd)
		self.dev.clicked.connect(self.openDev)
		self.disk.clicked.connect(self.openDisk)
		self.command.clicked.connect(self.openCmd)
		self.server.clicked.connect(self.openServe)


	def openServe(self):
		system('start /B services.msc')
		# subprocess.call('services.msc', creationflags=DETACHED_PROCESS)

	def openRegistry(self):
		system('start /B regedit.exe')
		# subprocess.call('regedit.exe', creationflags=DETACHED_PROCESS)

	def openControl(self):
		system("start /B control")
		# subprocess.call('control', creationflags=DETACHED_PROCESS)

	def openDev(self):
		system('start /B devmgmt.msc')
		# subprocess.call('devmgmt.msc', creationflags=DETACHED_PROCESS)

	def openDisk(self):
		system('start /B diskmgmt.msc')
		# subprocess.call('diskmgmt.msc', creationflags=DETACHED_PROCESS)

	def openCmd(self):
		system('start cmd')
		# subprocess.call('start cmd', creationflags=DETACHED_PROCESS)

	def execCmd(self):
		try:
			cmd = self.cmd.text()
			system("start "+cmd)
		except Exception as e:
			print(e)

if __name__ == "__main__":
	app = QApplication(sys.argv)
	myWin = MyMainWindow()
	myWin.setWindowTitle('工具箱')
	myWin.show()
	sys.exit(app.exec_())
