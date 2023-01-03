# -*- coding:utf-8 -*-
import os
import shutil
from threading import Thread
import tkinter as tk
import tkinter.filedialog
from tkinter import messagebox


# 打包 pyinstaller -F -w  -i favicon.ico 自动备份.py


class Tk:
    def __init__(self):
        # 调用Tk()创建主窗口
        self.root = tk.Tk()
        # 给主窗口起一个名字，也就是窗口的名字
        self.root.title('文件夹自动备份')
        # 设置窗口大小:宽x高,注,此处不能为 "*",必须使用 "x",设置位置用'+'
        self.curWidth = self.root.winfo_screenwidth()
        self.curHeight = self.root.winfo_screenheight()
        self.root.geometry('390x150+%d+%d' % ((self.curWidth - 390) / 2, (self.curHeight - 100) / 2))
        # 事件绑定，增加控件
        self.setup()

    def setup(self):
        self.btnStart = tk.Button(self.root, command=self.selectStart)
        self.btnStart['text'] = '源文件夹'
        self.btnStart.grid(row=1, column=0, pady='5px', padx='15px')
        self.btnEnd = tk.Button(self.root, command=self.selectEnd)
        self.btnEnd['text'] = '目标文件夹'
        self.btnEnd.grid(row=1, column=1, pady='5px', padx='15px')
        self.btnBackup = tk.Button(self.root, command=self.thread_it)
        self.btnBackup['text'] = '备份'
        self.btnBackup.grid(row=1, column=2, padx='10px', pady='5px')
        self.autoBackup = tk.Button(self.root, command=self.autoBackup)
        self.autoBackup['text'] = '加入自动备份'
        self.autoBackup.grid(row=1, column=3, padx='10px', pady='5px')
        self.text = tk.Entry(self.root, width=50)
        self.text.grid(row=2, columnspan=4, pady='2px', padx='5px')
        self.Shear = tk.Button(self.root, command=self.shearFile)
        self.Shear['text'] = '剪切'
        self.Shear.grid(row=3, column=0, padx='10px', pady='5px')
        self.addShear = tk.Button(self.root, command=self.addShearFile)
        self.addShear['text'] = '加入自动剪切'
        self.addShear.grid(row=3, column=1, padx='5px', pady='5px')
        self.startPath = ''
        self.end = ''
        try:
            self.file = open('auto.txt', 'a', encoding='utf-8')
        except:
            self.file = None

    def selectStart(self):
        self.text.delete(0, "end")
        self.startPath = tkinter.filedialog.askdirectory()
        if (self.startPath):
            self.text.insert(0, self.startPath + '->')
        nameArr = self.startPath.split('/')
        self.filename = nameArr[len(nameArr) - 1]

    def selectEnd(self):
        self.endPath = tkinter.filedialog.askdirectory()
        self.end = self.endPath + "/" + self.filename
        self.text.insert('end', self.end)

    def Backup(self):
        self.file = open('auto.txt', 'r', encoding='utf-8')
        if ((self.startPath != '' and self.end != '') or self.file != None):
            if (self.startPath != '' and self.end != '' and self.text.get() != ''):
                files = os.path.exists(self.end)
                if (files):
                    result = messagebox.askokcancel("提示", "备份文件夹已存在,继续备份将删除原有文件夹")
                    if (result):
                        shutil.rmtree(self.end)
                        shutil.copytree(self.startPath, self.end)
                        messagebox.showinfo("成功", '备份成功')
                    else:
                        messagebox.showinfo("失败", '取消备份')
                else:
                    shutil.copytree(self.startPath, self.end)
                    messagebox.showinfo("成功", '备份成功')
            elif self.file:
                works = self.file.read().split('\n')
                self.file.close()
                for work in works:
                    if (work != ''):
                        arr = work.split(' ')
                        start = arr[0]
                        end = arr[1]
                        files = os.path.exists(end)
                        path = os.path.exists(end[0:2])
                        if (files):
                            shutil.rmtree(end)
                            shutil.copytree(start, end)
                        elif path:
                            shutil.copytree(start, end)
                        else:
                            pass
                messagebox.showinfo('成功', '自动备份成功')
        else:
            messagebox.showwarning('警告', '请选择需要备份的文件夹和备份到哪个文件夹')
        self.btnBackup['text'] = '备份'

    def thread_it(self):
        self.btnBackup['text'] = '备份中'
        self.root.update()
        t = Thread(target=self.Backup)
        t.start()  # 启动

    def autoBackup(self):
        if (self.file):
            if (self.startPath and self.end):
                self.file.write(self.startPath + " " + self.end + "\n")
                messagebox.showinfo('成功', '加入成功')
                self.file.close()
                self.file = open('auto.txt', 'a+', encoding='utf-8')
            else:
                messagebox.showwarning('警告', '请选择需要备份的文件夹和备份到哪个文件夹')

    def shear(self):
        if (self.startPath and self.end and self.text.get() != ''):
            fileList = os.listdir(self.startPath)
            for item in fileList:
                arr = item.split('.')
                if len(arr) >= 2:
                    startPath = self.startPath + "/" + item
                    endPath = self.endPath + "/" + item
                    shutil.move(startPath, endPath)
        else:
            f = open('shear.txt', 'r', encoding='utf-8')
            works = f.read().split('\n')
            f.close()
            for work in works:
                if (work != ''):
                    wks = work.split(' ')
                    start = wks[0]
                    end = wks[1]
                    fileList = os.listdir(start)
                    path = os.path.exists(end[0:2])
                    if path:
                        for item in fileList:
                            arr = item.split('.')
                            if len(arr) >= 2:
                                startPath = start + "/" + item
                                endPath = end + "/" + item
                                shutil.move(startPath, endPath)
        messagebox.showinfo('成功', '剪切成功')
        self.Shear['text'] = '剪切'

    def shearFile(self):
        self.Shear['text'] = '剪切中'
        self.root.update()
        t = Thread(target=self.shear)
        t.start()  # 启动

    def addShearFile(self):
        if (self.startPath and self.end):
            file = open('shear.txt', 'a+', encoding='utf-8')
            file.write(self.startPath + " " + self.endPath + "\n")
            messagebox.showinfo('成功', '加入自动剪切成功')
            file.close()
        else:
            messagebox.showwarning('警告', '请选择需要剪切的文件夹和剪切到哪个文件夹')


if __name__ == '__main__':
    win = Tk()
    win.root.mainloop()
