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
# url="http://www.t-nani.co.kr/index.html"
# baseUrl = "http://www.t-nani.co.kr/"
# baseUrl = "https://www.fiki.com.tw/"
baseUrl = "http:"

times = getTime()
# 图片保存位置
path = "F:\\python\\test\\img\\" + times

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
    "http://milkylady.com/product/list.html?cate_no=140",
    "http://milkylady.com/product/list.html?cate_no=140&page=2",
    "http://milkylady.com/product/list.html?cate_no=140&page=3",
    "http://milkylady.com/product/list.html?cate_no=140&page=4",
    "http://milkylady.com/product/list.html?cate_no=140&page=5",
    "http://milkylady.com/product/list.html?cate_no=140&page=6",
    "http://milkylady.com/product/list.html?cate_no=140&page=7",
    "http://milkylady.com/product/list.html?cate_no=140&page=8",
    "http://milkylady.com/product/list.html?cate_no=140&page=9",
    "http://milkylady.com/product/list.html?cate_no=140&page=10",
    "http://milkylady.com/product/list.html?cate_no=140&page=11",
    "http://milkylady.com/product/list.html?cate_no=140&page=12",
    "http://milkylady.com/product/list.html?cate_no=140&page=13",
    "http://milkylady.com/product/list.html?cate_no=140&page=14"
    "http://milkylady.com/product/list.html?cate_no=140&page=15",
    "http://milkylady.com/product/list.html?cate_no=140&page=16",
    "http://milkylady.com/product/list.html?cate_no=140&page=17",
    "http://milkylady.com/product/list.html?cate_no=140&page=18",
    "http://milkylady.com/product/list.html?cate_no=140&page=19",
    "http://milkylady.com/product/list.html?cate_no=140&page=20",
    "http://milkylady.com/product/list.html?cate_no=140&page=21",
    "http://milkylady.com/product/list.html?cate_no=140&page=22",
    "http://milkylady.com/product/list.html?cate_no=140&page=23",
    "http://milkylady.com/product/list.html?cate_no=140&page=24",
    "http://milkylady.com/product/list.html?cate_no=140&page=25",
    "http://milkylady.com/product/list.html?cate_no=140&page=26",
    "http://milkylady.com/product/list.html?cate_no=140&page=27",
    "http://milkylady.com/product/list.html?cate_no=140&page=28",
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
print(img)
getImg(img, type)
