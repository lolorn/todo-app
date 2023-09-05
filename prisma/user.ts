import prisma from "@/lib/prisma";

export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });
  return user;
};

export const updateUser = async (
  id: string,
  username?: string,
  password?: string,
  email?: string
) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
      password,
      email,
    },
  });
  return user;
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
