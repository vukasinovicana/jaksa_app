import axios from "axios";
import { User } from "../types/User";

export const fetchAllUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:8080/api/user/allUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const fetchUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUser = async (userData: Partial<User>) => {
  const token = localStorage.getItem("token");
  const res = await axios.put("http://localhost:8080/api/user/me", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await axios.put(
    "http://localhost:8080/api/user/change-password",
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
