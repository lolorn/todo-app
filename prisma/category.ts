import prisma from "@/lib/prisma";
import { ZodError, z } from "zod";

export const createCategory = async (
  name: string,
  description?: string | null
) => {
  try {
    if (name === undefined) {
      return { status: "failed", message: "创建分类失败 没有分类名" };
    }

    const _name = z.string().parse(name);

    const _findCategoryName = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (JSON.stringify(_findCategoryName) === "null") {
      const newCategory = await prisma.category.create({
        data: {
          name,
          description: description ? description : null,
        },
      });
      return { status: "success", message: "创建分类成功", newCategory };
    } else {
      return { status: "failed", message: "创建分类失败 分类已经存在" };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return { status: "failed", message: "创建分类失败", error: error.errors };
    } else {
      return { status: "failed", message: "创建分类失败", error };
    }
  }
};

export const updateCategory = async (
  id: string,
  name?: string,
  description?: string
) => {
  try {
    const updateData: { name?: string; description?: string } = {};
    const _id = z.number().parse(Number(id));

    if (name !== undefined) {
      const _name = z.string().parse(name);
      updateData.name = _name;
    }

    if (description !== undefined) {
      const _description = z.string().parse(description);
      updateData.description = _description;
    }

    const _findCategoryName = await prisma.category.findUnique({
      where: {
        id: _id,
      },
    });

    if (JSON.stringify(_findCategoryName) !== "null") {
      if (Object.keys(updateData).length === 0) {
        return { status: "failed", message: "没有传递需要更新的字段" };
      }

      const newCategory = await prisma.category.update({
        where: {
          id: _id,
        },
        data: updateData,
      });
      return { status: "success", message: "更新分类成功", updateData };
    } else {
      return { status: "failed", message: "更新分类失败 分类不存在" };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "failed",
        message: "更新分类失败 校验未通过",
        error: error.errors,
      };
    } else {
      return { status: "failed", message: "更新分类失败", error };
    }
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (id === undefined) {
      return { status: "failed", message: "删除分类失败 id未传递" };
    }
    const _id = z.number().parse(Number(id));

    const isExit = await prisma.category.findUnique({
      where: {
        id: _id,
      },
    });

    if (JSON.stringify(isExit) !== "null") {
      const deletedCategory = await prisma.category.delete({
        where: {
          id: _id,
        },
      });
      return { status: "success", message: "删除分类成功", deletedCategory };
    } else {
      return { status: "failed", message: "删除分类失败 分类不存在" };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "failed",
        message: "删除分类失败 校验未通过",
        error: error.errors,
      };
    } else {
      return { status: "failed", message: "删除分类失败", error };
    }
  }
};

export const findCategory = async () => {
  const categories = await prisma.category.findMany();
  return { status: "success", message: "这是所有分类", categories };
};
