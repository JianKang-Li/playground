// 判断浏览器类型
export default function detectDeviceType() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'Mobile'
    : 'Desktop'
}
