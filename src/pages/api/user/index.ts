import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allUser = await prisma.user.findMany();
  return res.status(201).json(allUser);
}
