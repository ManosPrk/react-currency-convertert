import JwtDecode from "jwt-decode";

export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export const getStorageUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    return null;
  }
  if (JwtDecode(user.token).exp < Date.now() / 1000) {
    localStorage.removeItem("user");
    return null;
  }
  return user;
};
