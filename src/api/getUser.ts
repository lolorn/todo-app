import request from "@/utils/request";
export const getUserApi = async (
  data: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  }
) => {
  return request.post("/user/search", data);
};
