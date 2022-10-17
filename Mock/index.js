// 获取随机值
function getRandom() {
  return Math.random()
}

// 快速排序
function quickSort(arr) {
  if (!Array.isArray(arr)) return;
  if (arr.length <= 1) return arr;
  var left = [],
    right = [];
  var num = Math.floor(arr.length / 2);
  var numValue = arr.splice(num, 1)[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > numValue) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), numValue, ...quickSort(right)];
}

// 利用Set去重
function unique(arr) {
  let set = new Set(arr)
  return Array.from(set)
}

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

// 时间格式化
function timeFromDate(date) {
  return date.toTimeString().slice(0, 8)
}

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

// 数组对象去重
function uniqueArrayObject(arr = [], key) {
  if (arr.length === 0) return;
  let list = [];
  let map = {};
  arr.forEach((ele) => {
    if (!map[ele[key]]) {
      map[ele[key]] = ele;
    }
  });
  list = Object.values(map);
  return list;
}

// 获取唯一值
function generateRandom() {
  return Math.random().toString(16).slice(2);
}

// 创建函数
function create(obj) {
  let keys = Object.keys(obj)
  let item = {}
  for (let key of keys) {
    let reqs = obj[key].split(' ')
    let type = reqs[0]
    let len = reqs.length - 1
    switch (type) {
      case 'number': {
        item[key] = CNumber(parseInt(reqs[1]), parseInt(reqs[2]) + 1)
        break;
      }
      case 'numberStr': {
        item[key] = CNumbers(reqs[1], 0, 9).join('')
        break;
      }
      case 'string': {
        switch (len) {
          case 1: item[key] = CString(reqs[1]);
          case 2: item[key] = getRandom() >= 0.5 ? CString(parseInt(reqs[1])) : CString(parseInt(reqs[2]));
        }
        break;
      }
      case 'time': {
        item[key] = CTime()
        break;
      }
      case 'DayTime': {
        item[key] = DateTime()
        break;
      }
      case 'day': {
        item[key] = CDate()
        break;
      }
      case 'id': {
        item[key] = generateRandom()
        break;
      }
      case 'boolean': {
        item[key] = getRandom() >= 0.5
        break;
      }
      case 'Bool2Num': {
        item[key] = getRandom() >= 0.5 ? 0 : 1
        break;
      }
    }
  }
  return item
}

// 入口函数
function mock(obj, num) {
  let mock = []
  for (let i = 0; i < num; i++) {
    let item = create(obj)
    mock.push(item)
  }
  return mock
}


// 数据样式
let student = {
  ID: "id",//id
  name: "string 2 4",//字符串
  sex: "Bool2Num",//布尔转数字
  phone: "numberStr 11",//全数字字符串
  create_time: "DayTime",//时间
  author: "boolean"//布尔
}

console.log(mock(student, 10));