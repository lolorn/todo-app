import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allTodos = await prisma.todo.findMany();
  return res.status(201).json(allTodos);
}
