import { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "@/prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  try {
    switch (req.method) {
      case "POST": {
        const data = await findUser(username, password);
        return res.status(201).json(data);
      }
      default:
        return res.status(500).json({ error: "未知方法" });
    }
  } catch (error) {
    console.log(error);
  }
}
