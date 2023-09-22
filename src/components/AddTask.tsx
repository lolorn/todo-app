import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllCategoryApi } from "@/api/getCategory";
import { useEffect } from "react";
import { createTodoApi } from "@/api/getTodo";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "moment/locale/zh-cn";
import { useNoticeStore, useDrawerStore } from "@/store/store";
import AddCategory from "./AddCategory";

function AddTask() {
  const queryClient = useQueryClient();
  const { data: allCategory } = useQuery({
    queryFn: () => {
      return getAllCategoryApi();
    },
    queryKey: ["getAllCategory"],
    refetchOnWindowFocus: false,
  });

  const changeContent = useDrawerStore((state) => state.changeContent);
  const changeTitle = useDrawerStore((state) => state.changeTitle);

  const { showNotice, setNoticeOptions } = useNoticeStore((state) => state);

  const mutation = useMutation({
    mutationFn: (params) => {
      // console.log(params);
      return createTodoApi(params)
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            setNoticeOptions({ mes: res.data.message });
            showNotice();
          }
          if (res.data.status === "failed") {
            setNoticeOptions({ mes: res.data.message });
            showNotice();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTodayAllTodos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getDoneTodos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getNotDoneTodos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllTodos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getImportantTodos"],
      });
    },
  });

  const schema = z.object({
    title: z.string().min(1, { message: "没有标题" }),
    description: z.string().nullable(),
    categoryId: z.string(),
    important: z.boolean(),
    endTime: z.date().nullable(),
    reminder: z.date().nullable(),
  });

  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: null,
      categoryId: "1",
      important: false,
      endTime: null,
      reminder: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    mutation.mutate(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        description: null,
        categoryId: "1",
        important: false,
        endTime: null,
        reminder: null,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const categoryIdInput = watch("categoryId");
  const importantInput = watch("important");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full py-4 flex flex-col gap-4 bg-slate-100  dark:bg-neutral-800"
    >
      <div className="bg-white dark:bg-neutral-700 flex flex-col mx-4 p-2 rounded-lg gap-2">
        <div className="flex">
          <input
            {...register("title")}
            className="flex-1 p-2 outline-none caret-violet-500"
            type="text"
            placeholder="标题"
            autoFocus
          />
          <Controller
            control={control}
            name="important"
            render={({ field }) => (
              <label {...field} className="flex items-center justify-center">
                <input type="checkbox" className="hidden" />
                {importantInput ? (
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
          <p className="text-xs text-red-500 dark:text-red-400 p-2">
            {errors.title?.message}
          </p>
        )}
        <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
        <textarea
          {...register("description")}
          className="p-2 h-32 resize-none outline-none caret-violet-500 overflow-y-scroll"
          placeholder="描述"
        />
      </div>
      <div className="bg-white dark:bg-neutral-700 flex items-center flex-wrap mx-4 p-2 rounded-lg gap-">
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <div className="flex gap-2" {...field}>
              {allCategory?.data.categories.map((item: any) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-1 p-1 ${
                    categoryIdInput === item.id.toString()
                      ? "bg-indigo-300 dark:bg-indigo-600"
                      : "bg-indigo-100 dark:bg-indigo-800"
                  }  rounded-md`}
                >
                  <input
                    className="hidden"
                    type="radio"
                    name="cg"
                    value={item.id}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          )}
        />
        <div
          className="flex-1 flex items-end justify-end"
          onClick={() => {
            changeContent(<AddCategory />);
            changeTitle("添加列表");
          }}
        >
          <Icon icon="basil:add-solid" className="text-2xl text-green-500" />
        </div>
      </div>
      <div className="mx-4 p-2 bg-white dark:bg-neutral-700 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Icon icon="gala:clock" className="text-2xl text-teal-500" />
            <span>提醒</span>
          </div>
          <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
          <Controller
            name="reminder"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <Datetime
                  onChange={(data) => field.onChange(data._d)}
                  inputProps={{
                    name: "reminder",
                    autoComplete: "off",
                    type: "button",
                    className:
                      "bg-emerald-500 p-1 rounded-md text-white text-sm",
                    value: "选择提醒时间",
                  }}
                />
                {(() => {
                  if (JSON.stringify(field.value) === "null") {
                    return "";
                  } else {
                    const formattedDate = moment(field.value).format("llll");
                    return <>{formattedDate}</>;
                  }
                })()}
              </div>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Icon icon="tabler:clock-x" className="text-2xl text-rose-500" />
            <span>截止</span>
          </div>
          <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => {
              return (
                <div className="flex items-center justify-between">
                  <Datetime
                    onChange={(data) => {
                      field.onChange(data._d);
                    }}
                    inputProps={{
                      name: "endTime",
                      autoComplete: "off",
                      type: "button",
                      className: "bg-red-500 p-1 rounded-md text-white text-sm",
                      value: "选择截止时间",
                    }}
                  />
                  {(() => {
                    if (JSON.stringify(field.value) === "null") {
                      return "";
                    } else {
                      const formattedDate = moment(field.value).format("llll");
                      return <>{formattedDate}</>;
                    }
                  })()}
                </div>
              );
            }}
          />
        </div>
      </div>
      <button className="mx-4 p-2 text-sky-500 bg-white dark:bg-neutral-700 rounded-lg disabled:text-slate-500">
        确认
      </button>
    </form>
  );
}

export default AddTask;
