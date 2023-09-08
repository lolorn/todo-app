import request from "@/utils/request";

export const putIsDone = (data: { id: number; params: {} }) => {
  const { id, params } = data;
  return request.put(`/todo?id=${id}`, params);
};
