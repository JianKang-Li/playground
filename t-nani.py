# coding=utf-8
# 导包
# 发送请求
import urllib
import requests
import re
import os

# 解析网站源码
from bs4 import BeautifulSoup

# 时间
import time


def getTime():
    strs = time.localtime()
    return (
        str(strs.tm_year)
        + str(strs.tm_mon)
        + str(strs.tm_mday)
        + str(strs.tm_hour)
        + str(strs.tm_min)
        + str(strs.tm_sec)
    )


# 爬取网址
# url="http://www.t-nani.co.kr/index.html"
baseUrl = "http://www.t-nani.co.kr/"
# 图片保存位置
path = "F:\\python\\test\\img"

# 移除js、css
def remove_js_css(content):
    r = re.compile(r"""<script.*?</script>""", re.I | re.M | re.S)
    s = r.sub("", str(content))
    r = re.compile(r"""<style.*?</style>""", re.I | re.M | re.S)
    s = r.sub("", s)
    r = re.compile(r"""<!--.*?-->""", re.I | re.M | re.S)
    s = r.sub("", s)
    return s


# 移除空格
def remove_empty_line(content):
    r = re.compile(r"""^\s+$""", re.M | re.S)
    s = r.sub("", str(content))
    r = re.compile(r"""\n+""", re.M | re.S)
    s = r.sub("\n", s)
    return s


def remove_any_tag(s):
    s = re.sub(r"""<[^>]+>""", "", s)
    s.replace(" ", "")
    return s.strip()


def getImgList(html):
    reg = r'src=".*\.jpe?g.*"'
    imgre = re.compile(reg)
    imglist = re.findall(imgre, html)
    return imglist


# 获取图片
def getImg(imglist):
    times = getTime()
    length = str(len(imglist))
    if not os.path.isdir(path):
        os.makedirs(path)
    paths = path + "\\"
    x = 1
    print("Start %d images!" % (int(length)))
    for imgurl in imglist:
        imgurl = imgurl.replace('src="', "")
        imgurl = imgurl.replace('"', "")
        url = baseUrl + imgurl
        print(url + " " + str(x) + "/" + length)
        f = open(paths + times + "_" + str(x) + ".jpg", "wb")
        f.write((urllib.request.urlopen(url)).read())
        x = x + 1
    print("Done all!")


# 获取html源码
def getHtml(url):
    res = requests.get(url)
    if res.status_code == 200:
        html = res.content
        soup = BeautifulSoup(html, "html.parser")
        html = remove_js_css(soup)
        html = remove_empty_line(html)
        # print(html)
        return html
    else:
        print("请求失败" + str(res.status_code))
        return -1


urlList = [
    "http://www.t-nani.co.kr/index.html",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=P&xcode=005",
    "http://www.t-nani.co.kr/shop/bestseller.html?xcode=BEST",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=Y&xcode=007",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=X&xcode=030",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=X&xcode=004",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=X&xcode=027",
    "http://www.t-nani.co.kr/shop/shopbrand.html?xcode=016&type=P",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=X&xcode=010",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=X&xcode=011",
    "http://www.t-nani.co.kr/shop/shopbrand.html?type=P&xcode=034",
]

img = []
for i in urlList:
    html = getHtml(i)
    imglist = getImgList(html)
    img.extend(imglist)
    img = set(img)
    img = list(img)
getImg(img)
