# encoding=utf-8

# 导入os库
import os

# 图片存放的路径
path = input("请输入批处理路径：")
# 重命名方案前缀和后缀
prefix = input('请输入前缀：')
suffix = input('请输入后缀：')

num = 1
# 遍历更改文件名
for file in os.listdir(path):
    arr = file.split('.')
    extend = arr[len(arr) - 1]
    if len(arr) >= 2:
        os.rename(os.path.join(path, file), os.path.join(path, (prefix + str(num) + suffix) + '.' + extend))
        num += 1
