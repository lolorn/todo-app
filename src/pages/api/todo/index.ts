import { NextApiRequest, NextApiResponse } from "next";
import {
  createTodo,
  deleteTodo,
  findTodo,
  updateTodo,
} from "../../../../prisma/todo";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const {
    title,
    description,
    categoryId,
    endTime,
    reminder,
    important,
    status,
    isDone,
    configs,
  } = req.body;
  try {
    switch (req.method) {
      case "POST": {
        const newTodo = await createTodo(
          title,
          categoryId,
          description,
          endTime,
          reminder,
          important,
        );
        return res.status(201).json(newTodo);
      }
      case "PUT": {
        const updatedTodo = await updateTodo(
          id as string,
          title,
          categoryId,
          description,
          isDone,
          endTime,
          reminder,
          important,
        );
        return res.status(201).json(updatedTodo);
      }
      case "DELETE": {
        const deletedTodo = await deleteTodo(id as string);
        return res.status(201).json(deletedTodo);
      }
      case "GET": {
        const todos = await findTodo(configs);

        return res.status(201).json(todos);
      }
      default: {
        return res.status(405).json({ error: "未知方法" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
