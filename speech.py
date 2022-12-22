# -*- coding:utf-8 -*-
import tkinter as tk
import win32com.client


# 打包 pyinstaller -F -w  speech.py


class Tk:
    def __init__(self):
        # 调用Tk()创建主窗口
        self.root = tk.Tk()
        # 给主窗口起一个名字，也就是窗口的名字
        self.root.title('文字转语音')
        # 设置窗口大小:宽x高,注,此处不能为 "*",必须使用 "x",设置位置用'+'
        self.curWidth = self.root.winfo_screenwidth()
        self.curHeight = self.root.winfo_screenheight()
        self.root.geometry('300x300+%d+%d' % ((self.curWidth - 450) / 2, (self.curHeight - 300) / 2))
        # 事件绑定，增加控件
        self.setup()

    def setup(self):
        self.text = tk.Text(self.root, width=35, height=20, undo=True,
                            autoseparators=False)
        self.text.pack()
        self.btn = tk.Button(self.root, command=self.start)
        self.btn['text'] = '朗读'
        self.btn.pack()
        self.speaker = win32com.client.Dispatch("SAPI.SpVoice")

    def start(self):
        self.btn['text'] = '朗读中'
        self.root.update()
        text = self.text.get("1.0", "end")
        self.speaker.Speak(text)
        self.btn['text'] = '朗读'


if __name__ == '__main__':
    win = Tk()
    win.root.mainloop()
