// 数据导出为execl
/**
  * @param {Object} json 导出数据
  * {
  *   head:['姓名',"性别","年龄"],
  *   data:[["小名","男",18],["小红","女",18],["小张","男",17]]
  * }
  **/
export default function Excel(json) {
  let str = "<table border='1' style='border-collapse:collapse'>"
  for (let key in json) {
    switch (key) {
      case 'head': {
        str += '<thead><tr>'
        for (let i of json['head']) {
          str += `<td>${i}</td>`
        }
        str += "</tr></thead>"
        break;
      }
      case 'data': {
        str += "<tbody>"
        for (let data of json['data']) {
          str += "<tr>"
          for (let i of data) {
            str += `<td>${i}</td>`
          }
          str += "</tr>"
        }
        str += "</tbody>"
        break;
      }
    }
  }
  str += "</table>"
  const blob = new Blob([str], { type: 'application/xlsx' });
  return blob
}
