export function setCookie(
  key: string | number, 
  value: any, 
  { maxAge = "", domain = "", path = "", secure = "" } = {}
) {
  // let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
  if(typeof maxAge === "number") {
    cookie += `;max-age=${maxAge}`;
  }
  if(domain) {
    cookie += `;domain=${domain}`;
  }
  if(path) {
    cookie += `;path=${path}`;
  }
  if(secure) {
    cookie += `;secure=${secure}`;
  }
  document.cookie = cookie;
}

export function getCookie(key) {
  key = `${encodeURIComponent(key)}`;
  const cookie = document.cookie.split(";");
  for(let item of cookie) {
    const [cookieKey, cookieValue] = item.split("=");
    if(key === cookieKey) {
      // return decodeURIComponent(cookieValue);
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  }
  return;
}