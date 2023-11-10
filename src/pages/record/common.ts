import axios from "axios";
import api from "./api";
const GET = (url: string) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .then((res) => {
      if (res.code != -1) {
        return res.data;
      } else {
        throw new Error(res.msg);
      }
    });
};
export { api, GET };
