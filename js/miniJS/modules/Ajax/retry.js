// 自动重试
export default function retry(func, times = 1, delay = 0) {
  return new Promise((resolve, reject) => {
    // func是一件事，将他封装
    let inner = async function () {
      try {
        const result = await func()
        resolve(result)
      } catch (e) {
        if (times-- <= 0) {
          reject(e)
        } else {
          console.log('开始重试,剩余', times);
          // 延时
          setTimeout(() => {
            inner()
          }, delay)
        }
      }
    }
    inner()
  })
}