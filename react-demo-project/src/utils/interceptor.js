// import { useSelector } from "react-redux";
import api from "service/api";
import tokenService from "service/tokenService";

export function interceptor() {
  // const localToken = useSelector((state) => state.auth.token);
  // console.log(localToken);
  // const localToken = localStorage.getItem("token");
  api.interceptors.request.use((config) => {
    if (tokenService.getLocalAccessToken()) {
      config.headers.Authorization = `Bearer ${tokenService.getLocalAccessToken()}`;
    }
    console.log(tokenService.getLocalAccessToken());
    return config;
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      console.log(originalConfig.url);
      if (
        originalConfig.url !== api.baseUrl + "/auth/register" &&
        originalConfig.url !== api.baseUrl + err.response
      ) {
        console.log(err.response.status);
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await api.post(api.baseUrl + "/auth/refresh-tokens", {
              refreshToken: tokenService.getLocalAccessToken(),
            });
            tokenService.setToken(rs.data);
            return api(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
}
