import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const allUser = await prisma.user.findMany();
      return res.status(201).json('666');
    default:
      return res.status(405).json({ message: '未知的请求方法,你干嘛哎吆!' });
  }
}
