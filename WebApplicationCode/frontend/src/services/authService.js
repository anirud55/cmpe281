// const loggedIn = true;
// const user = true;
// const admin = true;

// export { loggedIn, user, admin };

import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token.cloudAV";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  //actual code
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("JWT: ", jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }

  // -----tested using below values------
  // return null;
  // return {
  //   _id: "1234",
  //   name: "Himaja Chandaluri",
  //   email: "himaja.chandaluri@gmail.com",
  //   isAdmin: false,
  //   iat: 1617904344,
  // };
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
