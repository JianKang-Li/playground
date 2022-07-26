import requests

heads = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
}
r = requests.get("https://www.fikishop.com/00163-1.jpg", headers=heads)
img = r.content
f = open("F:\\python\\test\\img\\test.jpg", "wb")
f.write(img)
f.close()
