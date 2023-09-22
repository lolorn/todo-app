import request from "@/utils/request";

export const createUserApi = (data = {}) => {
  return request.post("/user", data);
};
