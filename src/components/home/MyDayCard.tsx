"use client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTodoByConfigsApi } from "@/api/getTodo";
import { putIsDone } from "@/api/putTodo";
function MyDayCard() {
  const queryClient = useQueryClient();
  const { data: todayTaskCount, isLoading } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          categoryId: 2,
        },
      }),
    queryKey: ["getTodayAllTodos"],
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: putIsDone,
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
    },
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
            {
              todayTaskCount?.data.todos.filter((item: any) => {
                return !item.isDone;
              }).length
            }
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-200"></div>
      <ul className="flex-1 flex flex-col gap-2 my-1 overflow-y-scroll">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            加载中...
          </div>
        ) : (
          todayTaskCount?.data.todos.map((item: any, index: number) => {
            return (
              <li
                className={`flex items-center justify-between shrink-0 py-1 pr-4 ${
                  item.isDone ? "text-slate-500" : "order-none"
                }`}
                style={{ order: item.isDone ? index + 1 : 0 }}
                key={item.id}
              >
                <div className="flex gap-2">
                  <span className="bg-blue-500 w-6 h-6 rounded-full text-white flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => {
                      mutation.mutate({
                        id: item.id,
                        params: { isDone: !item.isDone },
                      });
                    }}
                  />
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default MyDayCard;
