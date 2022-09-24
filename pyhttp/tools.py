import json
import urllib.request
import urllib.parse

Iheaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}


def ToObj(text):
    text = text.replace("\t", '').strip()
    lines = text.split("\n")
    for i in range(0, len(lines)):
        line = lines[i].replace('\t', '').strip()
        lines[i] = line
    obj = {}
    for i in range(0, len(lines)):
        line = lines[i].split(":")
        obj[line[0]] = line[1].strip()
    return obj


def getSimpHeader():
    return Iheaders


def getRequest(url, data=None, headers=None):
    if headers is None:
        headers = Iheaders
    request = urllib.request.Request(url=url, headers=headers)
    if data is not None:
        data = urllib.parse.urlencode(data).encode('UTF-8')
        request = urllib.request.Request(url=url, headers=headers, data=data)
    return request


def getRes(response, code=None):
    if code is None:
        code = 'utf-8'
    res = {
        'url': response.geturl(),
        'code': response.getcode(),
        'headers': response.getheaders(),
        'content': response.read().decode(code)
    }
    return res


def fJSON(text):
    return json.loads(text)


def saveF(filename, content):
    with open(filename, 'w', encoding='utf-8') as fp:
        fp.write(content)
        fp.close()

def urlCode(strs):
    return urllib.parse.quote(strs)