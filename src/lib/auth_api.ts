import axios from "./axios";
import { LoginPayload, SignupPayload,  } from "@/types";

export const loginUser = async (data: LoginPayload) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: SignupPayload) => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axios.get("/auth/me");
  return res.data;
};
