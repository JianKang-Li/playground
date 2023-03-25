// 最大并发数
/**
* @param {Array} urls 请求地址数组
* @param {Number} maxNum 同时请求的最大数量
* @return {Array} 请求结果数组
**/
export default function concurRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results = [];
    let index = 0; //下一个请求下标
    let count = 0; //当前请求完成数量
    async function request() {
      if (index === urls.length) {
        return;
      }
      const i = index;
      const url = urls[index];
      index++;
      try {
        const resp = await fetch(url); //发送请求
        results[i] = resp;
      } catch (err) {
        results[i] = err;
      } finally {
        // 判断是否所有请求完成
        count++;
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }
    const times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}