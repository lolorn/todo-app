import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        res.json({ message: "原神!启动!" });
        break;

      default:
        res.json({
          message: "家人们谁懂啊!遇到个下头男随意请求api接口!我真的会谢!🐶",
        });
        break;
    }
  } catch (error) {}
}
