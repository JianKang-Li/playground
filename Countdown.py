# -*- coding:utf-8 -*-
import tkinter as tk
from time import sleep
import threading
from tkinter import messagebox


# 打包 pyinstaller -F -w  Countdown.py

class Tk:
    def __init__(self):
        # 调用Tk()创建主窗口
        self.root = tk.Tk()
        # 给主窗口起一个名字，也就是窗口的名字
        self.root.title('倒计时')
        # 设置窗口大小:宽x高,注,此处不能为 "*",必须使用 "x",设置位置用'+'
        self.curWidth = self.root.winfo_screenwidth()
        self.curHeight = self.root.winfo_screenheight()
        self.root.geometry('250x50+%d+%d' % ((self.curWidth - 450) / 2, (self.curHeight - 300) / 2))
        # 事件绑定，增加控件
        self.setup()

    def setup(self):
        self.time = 60
        self.edit = tk.Entry(self.root, width=10)
        self.edit.grid(row=1, column=1, padx='10px', pady='5px')
        self.edit.insert(0, '0:30')
        self.btn = tk.Button(self.root, command=self.start)
        self.btn['text'] = '开始'
        self.btn.grid(row=1, column=0, padx='10px', pady='5px')

    def QueryWindow(self, time):
        # 显示一个警告信息，点击确后，销毁窗口
        sleep(time)
        messagebox.showinfo("end", "时间到了")
        self.btn['text'] = '开始'

    def start(self):
        self.btn['text'] = '计时中'
        text = self.edit.get()
        arr = text.split(':')
        self.time = int(arr[0]) * 60 + int(arr[1])
        self.root.update()
        t = threading.Thread(target=self.QueryWindow(self.time))
        t.start()


if __name__ == '__main__':
    win = Tk()
    win.root.mainloop()
