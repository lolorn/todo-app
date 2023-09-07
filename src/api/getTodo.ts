import request from "@/utils/request";
export const getAllTodoApi = () => {
  request.get("/todo");
};
export const getTodoByConfigsApi = (configs = {}) => {
  request.post("/todo/search", {configs:configs});
};
export const createTodoApi = (params = {}) => {
  request.post("/todo", params);
};
