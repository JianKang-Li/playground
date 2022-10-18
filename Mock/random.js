// 获取随机值
function getRandom() {
  return Math.random()
}

//创建指定范围内的随机数字
function CNumber(min = 0, max = 100) {
  let a;
  a = Math.floor(Math.random() * (max - min)) + min;
  return a;
};

//创建指定长度的字符串
function CString(n = 5) {
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let j = 0; j < n; j++) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
};

// 创建随机数字数组
function CNumbers(n = 5, min = 0, max = 100) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (max - min)) + min;
  }
  return a;
};

//获取当前日期并格式化为（YYYY-MM-DD）
function CDate() {
  let date = new Date();
  let day =
    date.getFullYear().toString().padStart(4, 0) +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    date.getDate().toString().padStart(2, 0);
  return day;
};

// 获取当前时间
function CTime() {
  let date = new Date();
  let time = date.toTimeString().slice(0, 8)
  return time;
};

// 当前日期和时间
function DateTime() {
  let date = new Date();
  let day =
    date.getFullYear().toString().padStart(4, 0) +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    date.getDate().toString().padStart(2, 0);
  let time = date.toTimeString().slice(0, 8)
  return day + " " + time;
}

// 获取唯一值
function generateRandom() {
  return Math.random().toString(16).slice(2);
}

function CBoolean() {
  return Math.random() >= 0.5
}

function Bool2Num() {
  Math.random() >= 0.5 ? 0 : 1
}

module.exports = {
  getRandom,
  generateRandom,
  DateTime,
  CTime,
  CDate,
  CNumbers,
  CString,
  CNumber,
  getRandom,
  CBoolean,
  Bool2Num
}