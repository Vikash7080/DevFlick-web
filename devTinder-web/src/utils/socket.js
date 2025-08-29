// utils/socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket; // global singleton socket

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket"], // fast & reliable
    });
  }
  return socket;
};

export const getSocket = () => socket;
