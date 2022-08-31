# encoding=utf-8
# 请求对象
import urllib.error
import urllib.request

def qGet(url):
    try:
        res = urllib.request.urlopen(url)
        return res.read()
    except urllib.error.HTTPError or urllib.error.ContentTooShortError or urllib.error.URLError as e:
        return e.code

def httpGet(url,header={}):
    try:
        request = urllib.request.Request(url, headers=header,method='GET')
        response = urllib.request.urlopen(request).read()
        return response
    except urllib.error.HTTPError or urllib.error.ContentTooShortError or urllib.error.URLError as e:
        return e.code


def httpPost(url,data,header={}):
    try:
        request = urllib.request.Request(url,data=data, headers=header,method="POST")
        response = urllib.request.urlopen(request).read()
        # 读取页面信息
        return response
    except urllib.error.HTTPError or urllib.error.ContentTooShortError or urllib.error.URLError as e:
        return e.code


def saveRes(res,path):
    try:
        f = open(path, "wb")
        f.write(res)
        f.close()
        return "ok"
    except Exception as e:
       return e

res=httpGet("https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF")
# print(res)
saveRes(res,"../test.png")