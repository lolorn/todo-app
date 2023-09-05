import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  deleteUser,
  findUser,
  updateUser,
} from "../../../../prisma/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { username, password, email } = req.body;
  try {
    switch (req.method) {
      case "POST": {
        const newUser = await createUser(username, password, email);
        return res.status(201).json(newUser);
      }

      case "PUT": {
        const updatedUser = await updateUser(
          id as string,
          username,
          password,
          email
        );
        return res.status(201).json(updatedUser);
      }

      case "DELETE": {
        const deletedUser = await deleteUser(id as string);
        return res.status(201).json(deletedUser);
      }

      case "GET": {
        const user = await findUser(username, password, email);
        return res.status(201).json(user);
      }

      default: {
        return res.status(405).json({ error: "未知方法" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
