import prisma from "@/lib/prisma";
import { ZodError, any, boolean, date, number, string, z } from "zod";

const todoSchema = z.object({
  id: number(),
  title: string(),
  categoryId: number(),
  description: string(),
  isDone: boolean(),
  endTime: date(),
  reminder: date(),
  important: boolean(),
  status: string(),
});
//创建任务
export const createTodo = async (
  title: string,
  categoryId?: number,
  description?: string,
  endTime?: Date,
  reminder?: Date,
  important?: boolean
) => {
  const defaultCategoryId = 1;
  const defaultCategoryName = "任务";

  if (title === undefined) {
    return { status: "failed", message: "任务标题未传递" };
  }

  try {
    const _categoryId = todoSchema.shape.categoryId.parse(Number(categoryId));

    const defaultCategoryExit = await prisma.category.findUnique({
      where: {
        id: defaultCategoryId,
      },
    });

    if (defaultCategoryExit) {
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description,
          endTime,
          reminder,
          categoryId: _categoryId || defaultCategoryId,
          important,
        },
      });
      return { message: "创建任务成功", status: "success", newTodo };
    } else {
      const createdDefaultCategory = await prisma.category.create({
        data: {
          id: defaultCategoryId,
          name: defaultCategoryName,
        },
      });
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description,
          endTime,
          reminder,
          categoryId: categoryId || defaultCategoryId,
        },
      });
      return {
        message: "创建任务成功 并创建了默认分类",
        status: "success",
        newTodo,
        defaultCategory: createdDefaultCategory,
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "failed",
        message: "创建任务失败,校验不通过",
        error: error.errors,
      };
    } else {
      return { status: "failed", message: "创建任务失败", error };
    }
  }
};
//更新任务
export const updateTodo = async (
  id: string,
  title?: string,
  categoryId?: number,
  description?: string,
  isDone?: boolean,
  endTime?: Date,
  reminder?: Date,
  important?: boolean,
  status?: string
) => {
  try {
    const updateData: {
      title?: string;
      categoryId?: number;
      description?: string;
      isDone?: boolean;
      endTime?: Date;
      reminder?: Date;
      important?: boolean;
      status?: string;
    } = {};
    if (id === undefined) {
      return { status: "failed", message: "id没有传递" };
    }

    const _id = todoSchema.shape.id.parse(Number(id));

    if (title !== undefined) {
      const verifiedTitle = todoSchema.shape.title.parse(title);
      updateData.title = verifiedTitle;
    }

    if (categoryId !== undefined) {
      const verifiedCategoryId = todoSchema.shape.categoryId.parse(categoryId);
      updateData.categoryId = verifiedCategoryId;
    }

    if (description !== undefined) {
      const verifiedDescription =
        todoSchema.shape.description.parse(description);
      updateData.description = verifiedDescription;
    }

    if (isDone !== undefined) {
      const verifiedIsDone = todoSchema.shape.isDone.parse(isDone);
      updateData.isDone = verifiedIsDone;
    }

    if (endTime !== undefined) {
      const _endTime = new Date(endTime);
      const verifiedEndTime = todoSchema.shape.endTime.parse(_endTime);
      updateData.endTime = verifiedEndTime;
    }

    if (reminder !== undefined) {
      const _reminder = new Date(reminder);
      const verifiedReminder = todoSchema.shape.reminder.parse(_reminder);
      updateData.reminder = verifiedReminder;
    }

    if (important !== undefined) {
      const verifiedImportant = todoSchema.shape.important.parse(important);
      updateData.important = verifiedImportant;
    }

    if (status !== undefined) {
      const verifiedStatus = todoSchema.shape.status.parse(status);
      updateData.status = verifiedStatus;
    }

    const isExit = await prisma.todo.findUnique({
      where: {
        id: _id,
      },
    });

    // console.log(isExit, typeof JSON.stringify(isExit));

    if (JSON.stringify(isExit) !== "null") {
      if (Object.keys(updateData).length === 0) {
        return { status: "failed", message: "没有传递需要更新的字段" };
      }

      const updateTodo = await prisma.todo.update({
        where: {
          id: _id,
        },
        // ! 如何解决?
        data: updateData,
      });
      return {
        status: "success",
        message: "更新任务成功",
        updatedDate: updateData,
      };
    } else {
      return { status: "failed", message: "此id不存在" };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "failed",
        message: "更新任务失败,校验不通过",
        error: error.errors,
      };
    } else {
      return {
        status: "failed",
        message: "更新任务失败",
        error,
      };
    }
  }
};
//删除任务
export const deleteTodo = async (id: string) => {
  try {
    if (id === undefined) {
      return { status: "failed", message: "id没有传递" };
    }
    const _id = todoSchema.shape.id.parse(Number(id));
    const todo = await prisma.todo.delete({
      where: {
        id: _id,
      },
    });
    return { status: "success", message: "删除任务成功", todo };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "failed",
        message: "更新任务失败,校验不通过",
        error: error.errors,
      };
    } else {
      return { status: "failed", message: "删除任务失败", error };
    }
  }
};

//查找任务
export const findTodo = async (config: object) => {
  if (config === undefined) {
    const todos = await prisma.todo.findMany();
    return { status: "success", message: "这是所有任务", todos };
  } else {
    const todos = await prisma.todo.findMany(config);
    return {
      status: "success",
      message: "这是根据条件查找的任务",
      config,
      todos,
    };
  }
};
