let BASE_URL = "";

if(import.meta.env.MODE === "development") {
  BASE_URL = "http://123.207.32.32:5000";
  // BASE_URL = "http://codercba.com:5000";
  // BASE_URL = "http://152.136.185.210:5000";
} else if(import.meta.env.MODE === "production") {
  BASE_URL = "http://124.207.32.32:8080/";
} else {
  BASE_URL = "http://125.207.32.32:8080/";
}


export { BASE_URL };