export function singleton(className) {
  let ins;
  return class {
    constructor(...args) {
      if (!ins) {
        ins = new className(...args);
      }
      return ins;
    }
  }
}