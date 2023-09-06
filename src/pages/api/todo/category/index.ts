import { NextApiRequest, NextApiResponse } from "next";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../../../../prisma/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description } = req.body;
  const id = req.query.id;
  try {
    switch (req.method) {
      case "POST": {
        const newCategory = await createCategory(name,description);
        return res.status(201).json(newCategory);
      }

      case "PUT": {
        const updatedCategory = await updateCategory(
          id as string,
          name,
          description
        );
        return res.status(201).json(updatedCategory);
      }
      case "DELETE": {
        const deletedCategory = await deleteCategory(id as string);
        return res.status(201).json(deletedCategory);
      }
      default:
        return res.status(405).json({ error: "未知方法" });
    }
  } catch (error) {
    console.log(error);
  }
}
