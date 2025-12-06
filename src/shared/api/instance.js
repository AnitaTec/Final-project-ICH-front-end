import axios from "axios";
import { store } from "../../store/store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && error.message === "accessToken expired") {
      const { auth } = store.getState();
      const { data } = await instance.post("/auth/refresh", {
        refreshToken: auth.refreshToken,
      });
      instance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
      return instance(originalRequest);
    }
  }
);
export default instance;
