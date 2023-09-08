import { NextApiRequest, NextApiResponse } from "next";
import { findTodo } from "../../../../../prisma/todo";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { configs } = req.body;
  try {
    const searchedTodos = await findTodo(configs);
    return res.status(201).json(searchedTodos);
  } catch (error) {
    console.log(error);
  }
}
