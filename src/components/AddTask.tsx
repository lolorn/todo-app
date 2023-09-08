import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNewTaskStore } from "@/store/store";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryApi } from "@/api/getCategory";
import { useEffect } from "react";
import { createTodoApi } from "@/api/getTodo";

function AddTask() {
  const { data: allCategory } = useQuery({
    queryFn: () => {
      return getAllCategoryApi();
    },
    queryKey: ["getAllCategory"],
  });

  const schema = z.object({
    title: z.string().min(1, { message: "没有标题" }),
    description: z.string(),
    categoryId: z.string(),
    important: z.boolean(),
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "1",
      important: false,
    },
  });

  const {
    taskTitle,
    setTaskTitle,
    description,
    setDescription,
    categoryId,
    setCategoryId,
    important,
    setImportant,
  } = useNewTaskStore((state) => state);

  const onSubmit = (data: any) => {
    console.log(data);
    // debugger;
    // createTodoApi(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        description: "",
        categoryId: "1",
        important: false,
      });
      setTaskTitle("");
      setDescription("");
      setImportant(false);
      setCategoryId(1);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full py-4 flex flex-col gap-0.5 bg-slate-100  dark:bg-neutral-800"
    >
      <div className="bg-white flex flex-col m-4 p-2 rounded-lg gap-2">
        <div className="flex">
          <input
            {...register("title")}
            className="flex-1 p-2 outline-none caret-violet-500"
            type="text"
            placeholder="标题"
            autoFocus
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <Controller
            control={control}
            name="important"
            render={({ field }) => (
              <label {...field} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => {
                    setImportant(!important);
                  }}
                />
                {important ? (
                  <Icon
                    icon="material-symbols:star"
                    className="text-2xl text-amber-500"
                  />
                ) : (
                  <Icon
                    icon="material-symbols:star-outline"
                    className="text-2xl text-amber-500"
                  />
                )}
              </label>
            )}
          />
        </div>
        {errors.title?.message && (
          <p className="text-xs text-red-500 p-2">{errors.title?.message}</p>
        )}
        <div className="h-[1px] bg-neutral-200"></div>
        <textarea
          {...register("description")}
          className="p-2 h-32 resize-none outline-none caret-violet-500 overflow-y-scroll"
          placeholder="描述"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {errors.description?.message && <p>{errors.description?.message}</p>}
      </div>
      <div className="bg-white flex items-center flex-wrap m-4 p-2 rounded-lg gap-">
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <div className="flex gap-2" {...field}>
              {allCategory?.data.categories.map((item: any) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-1 p-1 ${
                    categoryId === item.id ? "bg-indigo-300" : "bg-indigo-100"
                  }  rounded-md`}
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="cg"
                    value={item.id}
                    onChange={() => {
                      setCategoryId(item.id);
                    }}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          )}
        />
        <div className="flex-1 flex items-end justify-end">
          <Icon icon="basil:add-solid" className="text-2xl text-green-500" />
        </div>
      </div>
      <button className="m-4 p-2 text-sky-500 bg-white rounded-lg disabled:text-slate-500">
        确认
      </button>
    </form>
  );
}

export default AddTask;
