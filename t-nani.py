# coding=utf-8
# 导包
# 发送请求
import requests
import re
import os

# 解析网站源码
from bs4 import BeautifulSoup

# 时间
import time

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
}


def getTime():
    strs = time.localtime()
    return (
            str(strs.tm_year)
            + str(strs.tm_mon)
            + str(strs.tm_mday)
            + str(strs.tm_hour)
            + str(strs.tm_min)
    )


# 爬取网址
baseUrl = "http://www.t-nani.co.kr/"
# baseUrl = "https://www.fiki.com.tw/"
# baseUrl = "http:"
# baseUrl="http://www.roer.co.kr"

times = getTime()
# 图片保存位置
path = "D:\\Frontend\\python\\test\\img\\" + times


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


def getImgList(html, type):
    reg = r'src="[^>]*\.' + type + '.*?"'
    imgre = re.compile(reg)
    imglist = re.findall(imgre, html)
    return imglist


# 获取图片
def getImg(imglist, type):
    length = str(len(imglist))
    if not os.path.isdir(path):
        os.makedirs(path)
    paths = path + "\\"
    x = 1
    print("Start %d images!" % (int(length)))
    for imgurl in imglist:
        imgurl = imgurl.replace('src="', "")
        imgurl = imgurl.replace('"', "")
        if imgurl.find("http") != -1:
            url = imgurl
        else:
            url = baseUrl + imgurl
        print(url + " " + str(x) + "/" + length)
        try:
            f = open(paths + str(x) + "." + type, "wb")
            img = requests.get(url, headers=headers).content
            f.write(img)
            f.close()
        except Exception as e:
            print(e)
        x = x + 1
    print("Done all!")


# 获取html源码
def getHtml(url):
    res = requests.get(url, headers=headers)
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

# 图片格式
type = "jpg"

# 图片地址列表
img = []

for i in urlList:
    html = getHtml(i)
    imglist = getImgList(html, type)
    img.extend(imglist)
    img = set(img)
    img = list(img)
# print(img)
getImg(img, type)
