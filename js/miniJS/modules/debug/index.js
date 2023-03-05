export default function tap(x, fn = x => x) {
  console.log(fn(x))
  return x
}