import axios from "axios";
import { Class } from "../types/Class";
import { ClassRequest } from "../types/ClassRequest";

export const fetchAllClassesForStudent = async (
  studentId: number
): Promise<Class[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `http://localhost:8080/api/class/allClassesForStudent/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const fetchAllClasses = async (): Promise<Class[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:8080/api/class/allClasses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const acceptRequest = async (classId: number): Promise<string> => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:8080/api/class/acceptRequest/${classId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const rejectRequest = async (classId: number): Promise<string> => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:8080/api/class/rejectRequest/${classId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteClass = async (classId: number): Promise<string> => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:8080/api/class/deleteClass/${classId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createClassRequest = async (
  request: ClassRequest
): Promise<string> => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:8080/api/class/createClassRequest",
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
