// svg代码转base64
export default function svg2base(svg) {
  return 'data:image/svg+xml;base64,' + window.btoa(svg);
}