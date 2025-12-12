import axios from "axios";
import { store } from "../../store/store";
import { logout, setCredentials } from "../../store/auth/authSlice";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && error.message === "accessToken expired") {
      const { auth } = store.getState();
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refreshToken: auth.refreshToken,
          }
        );

        instance.defaults.headers[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        store.dispatch(setCredentials(data));
        return instance(originalRequest);
      } catch {
        store.dispatch(logout());
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
