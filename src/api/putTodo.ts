import request from "@/utils/request";

export const putTodoApi = (data: { id: number; params: {} }) => {
  const { id, params } = data;
  return request.put(`/todo?id=${id}`, params);
};

export const deleteTodoApi = (id: number) => {
  return request.delete(`/todo?id=${id}`);
};
