import prisma from "@/lib/prisma";
import { string, z, ZodError } from "zod";

const userSchema = z.object({
  username: string()
    .min(3, { message: "用户名少于3个字符" })
    .max(20, { message: "用户名大于20个字符" }),
  password: string().min(6, { message: "密码少于6个字符" }),
  email: string().email({ message: "邮箱格式错误" }),
});

export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const userData = userSchema.parse({ username, password, email });
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors;
    } else {
      return error;
    }
  }
};

export const updateUser = async (
  id: string,
  username?: string,
  password?: string,
  email?: string
) => {
  try {
    if (id === undefined) {
      return new Error("id没有传递啊");
    }
    const updateData: {
      username?: string;
      password?: string;
      email?: string;
    } = {};

    if (username !== undefined) {
      const usernameData = userSchema.shape.username.parse({ username });
      updateData.username = usernameData;
    }

    if (password !== undefined) {
      const passwordData = userSchema.shape.username.parse({ password });
      updateData.password = passwordData;
    }

    if (email !== undefined) {
      const emailData = userSchema.shape.username.parse({ email });
      updateData.email = emailData;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
    });
    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors;
    } else {
      return error;
    }
  }
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const findUser = async (
  username: string,
  password: string,
  email: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
      password,
      email,
    },
  });
  return user;
};
