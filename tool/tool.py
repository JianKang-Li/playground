# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'tool.ui'
#
# Created by: PyQt5 UI code generator 5.15.4
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(423, 288)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.registry = QtWidgets.QPushButton(self.centralwidget)
        self.registry.setGeometry(QtCore.QRect(40, 170, 81, 31))
        self.registry.setObjectName("registry")
        self.control = QtWidgets.QPushButton(self.centralwidget)
        self.control.setGeometry(QtCore.QRect(140, 170, 101, 31))
        self.control.setObjectName("control")
        self.search = QtWidgets.QLineEdit(self.centralwidget)
        self.search.setGeometry(QtCore.QRect(40, 30, 261, 31))
        self.search.setObjectName("search")
        self.exec = QtWidgets.QPushButton(self.centralwidget)
        self.exec.setGeometry(QtCore.QRect(310, 30, 51, 31))
        self.exec.setObjectName("exec")
        self.dev = QtWidgets.QPushButton(self.centralwidget)
        self.dev.setGeometry(QtCore.QRect(140, 220, 101, 31))
        self.dev.setObjectName("dev")
        self.disk = QtWidgets.QPushButton(self.centralwidget)
        self.disk.setGeometry(QtCore.QRect(250, 170, 111, 31))
        self.disk.setObjectName("disk")
        self.command = QtWidgets.QPushButton(self.centralwidget)
        self.command.setGeometry(QtCore.QRect(40, 220, 81, 31))
        self.command.setObjectName("command")
        self.server = QtWidgets.QPushButton(self.centralwidget)
        self.server.setGeometry(QtCore.QRect(250, 220, 111, 31))
        self.server.setObjectName("server")
        self.result = QtWidgets.QListView(self.centralwidget)
        self.result.setGeometry(QtCore.QRect(40, 70, 321, 81))
        self.result.setObjectName("result")
        MainWindow.setCentralWidget(self.centralwidget)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.registry.setText(_translate("MainWindow", "打开注册表"))
        self.control.setText(_translate("MainWindow", "打开控制面板"))
        self.exec.setText(_translate("MainWindow", "Search"))
        self.dev.setText(_translate("MainWindow", "打开设备管理器"))
        self.disk.setText(_translate("MainWindow", "打开磁盘管理器"))
        self.command.setText(_translate("MainWindow", "打开CMD"))
        self.server.setText(_translate("MainWindow", "打开本地服务"))
