import request from "@/utils/request";
export const getAllTodoApi = () => {
  return request.get("/todo");
};
export const getTodoByConfigsApi = (configs = {}) => {
  return request.post("/todo/search", { configs: configs });
};
export const createTodoApi = (params = {}) => {
  return request.post("/todo", params);
};