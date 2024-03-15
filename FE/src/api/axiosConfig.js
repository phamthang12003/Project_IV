import axios from "axios";
import authAPI from "./authAPI";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_ENDPOINT + "/api/",
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    /**
     * * Sau khi gọi refresh token thì lần sau gọi lại get user
     * * thì nó sẽ set lại header request lên server
     */
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const config = error.config;
    const response = error?.response;

    /**
     * * Kiểm tra nếu nó bằng đường dẫn "/Auth/RefreshToken" thì sẽ return error
     * * Nếu không sẽ bị lặp vô tận
     */
    if (response && response.status === 401 && config.url === "/Auth/RefreshToken") {
      return Promise.reject(error);
    }

    console.log("====================================");
    console.log(`error`, error);
    console.log("====================================");

    // * kiểm tra accessToken hết hạn thì sẽ gọi "/Auth/RefreshToken" để cung cấp lại accessTonken
    if (
      response &&
      response.status === 401 &&
      !response.data &&
      response.statusText === "Unauthorized"
    ) {
      const res = await authAPI.post(
        {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        },
        "/RefreshToken"
      );

      if (res.data) {
        // * Sau khi gọi refresh token thì chúng ta sẽ có accessToken mới
        // * và set vào localStorage sau đó set headers cho axios
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        instance.defaults.headers.common["Authorization"] = "Bearer " + res.data.accessToken;

        return instance(config);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
