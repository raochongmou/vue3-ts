class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    let value = window.localStorage.getItem(key);
    if(value) {
      value = JSON.parse(value);
    }
    return value;
  }
  removeCache(key: string) {
    window.localStorage.removeItem(key);
  }
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();

// excel字母取数
export function createCellPos(n) {
  var ordA = "A".charCodeAt(0); //字母转unicode
  var ordZ = "Z".charCodeAt(0);
  var len = ordZ - ordA + 1; // 计算字母长度
  // var len = ordZ - ordA + 1; // 计算字母长度
  var s = "";
  while (n >= 0) {
    //将输入数字转换成字母
    s = String.fromCharCode((n % len) + ordA) + s;
    //每次进行完需要重新floor向下取整，-1是因为 A的unicode是0
    n = Math.floor(n / len) - 1;
  }
  return s;
}