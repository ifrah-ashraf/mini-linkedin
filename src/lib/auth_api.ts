import { LoginPayload, SignupPayload } from "@/types";
import axiosInstance from "./axios"; 

export const loginUser = async (data: LoginPayload) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: SignupPayload) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
