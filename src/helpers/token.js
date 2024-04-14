import Cookies from "js-cookie";

export const getLoggername = () => {
  const name = Cookies.get("username");
  return name;
};

export const setAuth = (name) => {
  Cookies.set("username", name);
};
