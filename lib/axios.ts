import axios from "axios";

let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = "https://api-kuisberhadiah.praktekoding.com/api";
} else {
  baseURL = "http://quiz-api.test/api";
}

const axiosApi = axios.create({
  baseURL: baseURL,
});

export default axiosApi;
