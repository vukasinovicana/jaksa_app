import axios from "axios";

export const loginApi = (username: String, password: String) =>
  axios
    .post("http://localhost:8080/api/login", { username, password })
    .then((res) => res.data.token);

export const registerApi = (
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  phone: String
) =>
  axios
    .post("http://localhost:8080/api/register", {
      firstname,
      lastname,
      username,
      password,
      email,
      phone,
    })
    .then((res) => res.data.token);
