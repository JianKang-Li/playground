// 获取全局对象
/**
* @return {window|self|global} 返回全局对象 
* 
**/
export default function getGlobal() {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};