import request from "@/utils/request";

export const getAllCategoryApi = () => {
  return request.get("/todo/category");
};
