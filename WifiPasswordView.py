# -*- coding:utf-8 -*-
import tkinter as tk
from os import popen
from re import search

# 打包 pyinstaller -F -w  WifiPasswordView.py

class Tk:
    def __init__(self):
        # 调用Tk()创建主窗口
        self.root = tk.Tk()
        # 给主窗口起一个名字，也就是窗口的名字
        self.root.title('windows已连接WiFi密码显示')
        # 设置窗口大小:宽x高,注,此处不能为 "*",必须使用 "x",设置位置用'+'
        self.curWidth = self.root.winfo_screenwidth()
        self.curHeight = self.root.winfo_screenheight()
        self.root.geometry('450x300+%d+%d' % ((self.curWidth - 450) / 2, (self.curHeight - 300) / 2))
        # 事件绑定，增加控件
        self.setup()

    def setup(self):


        self.text = ""
        self.wifi()
        # 显示wifi信息控件
        self.info = tk.Label(self.root, text=self.text, justify='left')
        self.info.pack()

    def wifi(self):
        wificmd = ('netsh wlan show profiles ')
        with popen(wificmd) as f:
            wifiname_list = []
            for line in f:
                if '所有用户配置文件 :' in line:
                    line = line.strip()
                    wifiname = line.split(':')[1]
                    wifiname_list.append(wifiname)
        for i in wifiname_list:
            get = ('netsh wlan show profiles name={} key=clear').format(i)
            with popen(get) as r:
                result = r.read()
                arr = result.split('\n')
                for item in arr:
                    if (search(r"关键内容.*", item)):
                        password = item.split(':')[1]
                        self.text += "名称:{}  密码:{}\n".format(i, password)
            r.close()


if __name__ == '__main__':
    win = Tk()
    win.root.mainloop()
