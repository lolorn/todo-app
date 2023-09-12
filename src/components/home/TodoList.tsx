import { Icon } from "@iconify/react";
import { useState } from "react";
import moment from "moment";
import { deleteTodoApi } from "@/api/putTodo";
import { useNoticeStore } from "@/store/store";
function TodoList({
  todos,
}: {
  todos: Array<{
    id: number;
    title: string;
    reminder: null | Date;
    endTime: null | Date;
    important: boolean;
    status: string;
    isDone: boolean;
    description: string | null;
  }>;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const { showNotice, setNoticeOptions } = useNoticeStore((state) => state);
  return (
    <div className="h-full">
      {todos.length === 0 ? (
        <div className="text-center">这里什么也没有!</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <>
              <li
                className={`${
                  todo.isDone
                    ? "bg-neutral-100 dark:bg-neutral-700"
                    : "bg-slate-200 dark:bg-green-900"
                }  p-2 rounded-lg flex items-center gap-2`}
                key={todo.id}
                onClick={() => {
                  if (open === todo.id) {
                    setOpen(null);
                  } else {
                    setOpen(() => todo.id);
                  }
                }}
              >
                <span
                  className={`${
                    todo.isDone
                      ? "italic text-slate-600 line-through"
                      : "font-medium"
                  }`}
                >
                  {todo.title}
                </span>
                <div className="flex gap-2 items-center justify-end flex-1">
                  {todo.reminder ? (
                    <Icon
                      icon="gala:clock"
                      className="text-2xl text-teal-500"
                    />
                  ) : null}
                  {todo.endTime ? (
                    <Icon
                      icon="tabler:clock-x"
                      className="text-2xl text-rose-500"
                    />
                  ) : null}
                  {todo.important ? (
                    <Icon
                      icon="solar:star-bold-duotone"
                      className="text-2xl text-amber-400"
                    />
                  ) : null}
                </div>
                <div>
                  <Icon
                    icon="material-symbols:delete"
                    className="text-2xl text-red-500"
                    onClick={() => {
                      deleteTodoApi(todo.id)
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
                    }}
                  />
                </div>
                {(todo.description || todo.endTime || todo.reminder) && (
                  <div>
                    <Icon
                      icon="eva:arrow-up-fill"
                      className="text-lg"
                      rotate={open === todo.id ? 2 : 0}
                    />
                  </div>
                )}
              </li>
              {open === todo.id &&
              (todo.description || todo.endTime || todo.reminder) ? (
                <div
                  // key={"children" + todo.id.toString()}
                  className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex flex-col gap-2"
                >
                  {todo.description ? (
                    <div className="flex gap-2 items-start text-sm">
                      <span className="p-0.5 bg-slate-500 text-white rounded-md shrink-0">
                        备注:
                      </span>
                      {todo.description}
                    </div>
                  ) : null}
                  {todo.reminder ? (
                    <div className="flex gap-2 items-center text-sm">
                      <span className="p-0.5 bg-emerald-500 text-white rounded-md shrink-0">
                        提醒时间:
                      </span>
                      <span>{moment(todo.reminder).format("llll")}</span>
                    </div>
                  ) : null}
                  {todo.endTime ? (
                    <div className="flex gap-2 items-center text-sm">
                      <span className="p-0.5 bg-red-500 text-white rounded-md shrink-0">
                        结束时间:
                      </span>
                      <span>{moment(todo.endTime).format("llll")}</span>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
