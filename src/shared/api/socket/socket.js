import { io } from "socket.io-client";

let socket = null;

const getSocketBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  return url.endsWith("/api") ? url.slice(0, -4) : url;
};

export const connectSocket = (token) => {
  if (socket) return socket;

  socket = io(getSocketBaseUrl(), {
    auth: { token },
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
