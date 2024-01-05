import axios from "axios";
import api from "./api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const handleRes = (res: any) => {
  return Promise.resolve(res.data).then((res) => {
    if (res.code != -1) {
      return res.data;
    } else {
      if (res.msg == "Invalid token") {
        ElMessage.warning("请重新登录");
        router.push("/login");
      } else {
        throw new Error(res.msg);
      }
    }
  });
};
const GET = (url: string) => {
  return axios
    .get(url, {
      headers: { token: sessionStorage.getItem("token") || "" },
    })
    .then(handleRes);
};
const POST = (url: string, data: any = {}) => {
  return axios
    .post(url, data, {
      headers: { token: sessionStorage.getItem("token") || "" },
    })
    .then(handleRes);
};
function getQueryString(name: string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const r = window.location.search.slice(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return "";
}
export { api, GET, POST, getQueryString };
