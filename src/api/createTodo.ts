import request from "@/utils/request";

export const createTodoApi = (params = {}) => {
  return request.post("/todo", params);
};
