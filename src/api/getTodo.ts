import request from "@/utils/request";
export const getTodo = () => {
  request.get("/todo");
};
export const createTodo = (params = {}) => {
  request.post("/todo", params);
};
