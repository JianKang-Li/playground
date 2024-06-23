// sleep()
export default function sleep(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
