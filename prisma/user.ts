import prisma from "@/lib/prisma";
import { string, z, ZodError } from "zod";

const userSchema = z.object({
  username: string()
    .min(2, { message: "用户名少于2个字符" })
    .max(20, { message: "用户名大于20个字符" }),
  password: string().min(6, { message: "密码少于6个字符" }),
  email: string().email({ message: "邮箱格式错误" }),
});
//创建用户
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
    return { message: "创建用户成功", status: true, data: user };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: false,
        message: "创建用户失败,校验不通过",
        error: error.errors,
      };
    } else {
      return { status: false, message: "创建用户失败", error };
    }
  }
};
//更新用户
export const updateUser = async (
  id: string,
  username?: string,
  password?: string,
  email?: string
) => {
  const updateData: {
    username?: string;
    password?: string;
    email?: string;
  } = {};
  try {
    if (id === undefined) {
      return { status: false, message: "id没有传递" };
    }

    if (username !== undefined) {
      const usernameData = userSchema.shape.username.parse(username);
      updateData.username = usernameData;
    }

    if (password !== undefined) {
      const passwordData = userSchema.shape.password.parse(password);
      updateData.password = passwordData;
    }

    if (email !== undefined) {
      const emailData = userSchema.shape.email.parse(email);
      updateData.email = emailData;
    }

    // 检查是否有传递需要更新的字段
    if (Object.keys(updateData).length === 0) {
      return { status: false, message: "没有传递需要更新的字段" };
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
    });
    return { message: "更新用户成功", data: updateData };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: false,
        message: "更新用户失败,校验不通过",
        error: error.errors,
      };
    } else {
      return {
        status: false,
        message: "更新用户失败",
        error,
      };
    }
  }
};
//删除用户
export const deleteUser = async (id: string) => {
  try {
    if (id === undefined) {
      return { status: false, message: "id没有传递" };
    }
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return { status: false, message: "删除用户失败", error };
  }
};
//查找用户
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
