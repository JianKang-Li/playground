import requests

heads = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
}
r = requests.get("http://milkylady.com/product/list.html?cate_no=140", headers=heads)
img = r.content
print(img)
# f = open("F:\\python\\test\\img\\test.jpg", "wb")
# f.write(img)
# f.close()
