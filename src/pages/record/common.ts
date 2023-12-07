import axios from "axios";
import api from "./api";
const handleRes = (res: any) => {
  return Promise.resolve(res.data).then((res) => {
    if (res.code != -1) {
      return res.data;
    } else {
      throw new Error(res.msg);
    }
  });
};
const GET = (url: string) => {
  return axios.get(url).then(handleRes);
};
const POST = (url: string, data: any = {}) => {
  return axios.post(url, data).then(handleRes);
};
export { api, GET, POST };
