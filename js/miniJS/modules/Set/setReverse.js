// set翻转
export default function setReverse(set) {
  const arr = Array.from(set).reverse()
  set.clear()
  arr.forEach((item) => {
    set.add(item)
  })
}