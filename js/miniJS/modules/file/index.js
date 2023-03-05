export function getFileType(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}