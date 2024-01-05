const userHost = "http://user.1036892522.top";
export default {
  login: userHost + "/login",
  register: userHost + "/register",
  userinfo: userHost + "/userinfo",
  github_login:
    userHost +
    "/github/login?state=" +
    encodeURIComponent(
      location.origin + location.pathname + "?page=token&token="
    ),
};
