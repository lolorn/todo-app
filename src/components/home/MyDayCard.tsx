"use client";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { getTodoByConfigsApi } from "@/api/getTodo";
function MyDayCard() {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          categoryId: 2,
        },
        take: 3,
        orderBy: {
          createdAt: "asc",
          //asc or desc
        },
      }),
    queryKey: ["get3TodayTask"],
  });

  const { data: todayTaskCount } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          categoryId: 2,
        },
      }),
    queryKey: ["getTodayAll"],
  });
  return (
    <div className="col-span-2  bg-white  dark:bg-neutral-800 shadow-md h-40 rounded-2xl flex flex-col px-4 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="ph:sun-bold" className="text-2xl text-sky-500" />
          <div className="text-slate-500 dark:text-slate-300 font-medium">
            我的一天
          </div>
        </div>
        <div>
          <div className="font-bold text-2xl">
            {todayTaskCount?.data.todos.length}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-200"></div>
      <ul className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            加载中...
          </div>
        ) : (
          data?.data.todos.map((value: any, index: number) => (
            <li className="flex-1 flex items-center gap-2" key={value.id}>
              <span className="bg-blue-500 w-6 h-6 rounded-full text-white flex items-center justify-center">
                {index + 1}
              </span>
              <span className="font-medium">{value.title}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MyDayCard;
