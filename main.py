import sys

from PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBox
from dictionary import Ui_Dictionary


class MyMainWindow(QMainWindow, Ui_Dictionary):
	def __init__(self, parent=None):
		super(MyMainWindow, self).__init__(parent)
		self.setupUi(self)
		self.dict = {}
		self.getDict()
		self.searchButton.clicked.connect(self.search)
		self.addButton.clicked.connect(self.addWord)

	def search(self):
		value = self.searchText.text()
		res = ''
		for key in self.dict:
			if key == value:
				res = self.dict[key]
				break
			elif self.dict[key] == value:
				res = key
				break
			else:
				res = '未找到'
		self.textBrowser.setText(res)

	def addWord(self):
		ch = self.chText.text()
		en = self.enText.text()
		f = open("dict.txt", 'a', encoding='utf-8')
		if en in self.dict:
			msg_box = QMessageBox(QMessageBox.Warning, '警告', '单词已存在!')
			msg_box.exec_()
			return
		f.write("\n" + en + ' ' + ch)
		f.close()
		msg_box = QMessageBox(QMessageBox.Warning, '成功', '添加单词成功!')
		msg_box.exec_()
		self.getDict()
		self.chText.setText('')
		self.enText.setText('')

	def getDict(self):
		f = open('dict.txt', 'a+', encoding='utf=8')
		f.close()
		f = open('dict.txt', 'r', encoding='utf-8')
		context = f.read()
		f.close()
		lines = context.split("\n")
		for line in lines:
			if line.strip() == '':
				continue
			strs = line.split(" ")
			key = strs[0]
			value = strs[1]
			self.dict[key] = value


if __name__ == "__main__":
	app = QApplication(sys.argv)
	myWin = MyMainWindow()
	myWin.show()
	sys.exit(app.exec_())
