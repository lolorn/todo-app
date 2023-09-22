import { useQuery } from "@tanstack/react-query";
import { getAllCategoryApi } from "@/api/getCategory";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNoticeStore } from "@/store/store";
import { createCategoryApi, deleteCategoryApi } from "@/api/createCategory";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDrawerStore } from "@/store/store";
import AddTask from "./AddTask";

function AddCategory() {
  const { data: allCategory, refetch } = useQuery({
    queryFn: () => {
      return getAllCategoryApi();
    },
    queryKey: ["getAllCategory"],
    refetchOnWindowFocus: false,
  });

  const schema = z.object({
    name: z.string().min(1, { message: "没有分类名" }),
    description: z.string(),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { showNotice, setNoticeOptions } = useNoticeStore((state) => state);

  const { changeContent, changeTitle } = useDrawerStore((state) => state);

  const onSubmit = (data: any) => {
    console.log(data);
    return createCategoryApi(data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setNoticeOptions({ mes: res.data.message });
          showNotice();
          refetch();
        }
        if (res.data.status === "failed") {
          setNoticeOptions({ mes: res.data.message });
          showNotice();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        description: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full p-4 flex flex-col gap-4 bg-slate-100 dark:bg-neutral-800"
    >
      <div className="flex items-center flex-wrap gap-4">
        {allCategory?.data.categories.map((item: any) => (
          <div
            className="p-2 rounded-md bg-green-300 dark:bg-slate-700  flex items-center gap-2 shrink-0"
            key={item.id}
          >
            {item.name}
            <Icon
              icon="material-symbols:delete"
              className="text-2xl text-red-500"
              onClick={() => {
                deleteCategoryApi(item.id)
                  .then((res) => {
                    console.log(res);
                    if (res.data.status === "success") {
                      setNoticeOptions({ mes: res.data.message });
                      showNotice();
                      refetch();
                    }
                    if (res.data.status === "failed") {
                      setNoticeOptions({ mes: res.data.message });
                      showNotice();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            />
          </div>
        ))}
        <div
          className="flex-1 flex items-center justify-center"
          onClick={() => {
            changeContent(<AddTask />);
            changeTitle("添加任务");
          }}
        >
          <Icon icon="basil:add-solid" className="text-2xl text-sky-500" />
          添加任务
        </div>
      </div>
      <input
        type="text"
        className="p-2 outline-none caret-violet-500 rounded-lg"
        {...register("name")}
        placeholder="输入一个列表名吧"
        autoFocus
        autoComplete="off"
      />
      {errors.name?.message && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {errors.name.message}
        </p>
      )}
      <input
        type="text"
        className="p-2 outline-none caret-violet-500 rounded-lg"
        {...register("description")}
        placeholder="列表描述"
        autoComplete="off"
      />
      <button className="p-2 text-sky-500 bg-white dark:bg-neutral-700 rounded-lg">
        确认
      </button>
    </form>
  );
}

export default AddCategory;
