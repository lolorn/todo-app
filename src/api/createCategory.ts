import request from "@/utils/request";

export const createCategoryApi = (params = {}) => {
  return request.post("todo/category", params);
};

export const deleteCategoryApi = (id: number) => {
  return request.delete(`todo/category/?id=${id}`);
};
