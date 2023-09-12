"use client";
import { getAllTodoApi, getTodoByConfigsApi } from "@/api/getTodo";
import MyDayCard from "@/components/home/MyDayCard";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TodoList from "@/components/home/TodoList";
import { boolean } from "zod";
//!网格布局有问题哦
function HomePage() {
  const { data: allTodos } = useQuery({
    queryFn: () => getAllTodoApi(),
    queryKey: ["getAllTodos"],
    refetchOnWindowFocus: false,
  });

  /* const { data: doneTodos } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          isDone: true,
        },
      }),
    queryKey: ["getDoneTodos"],
    refetchOnWindowFocus: false,
  });

  const { data: notDoneTodos } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          isDone: false,
        },
      }),
    queryKey: ["getNotDoneTodos"],
    refetchOnWindowFocus: false,
  });

  const { data: importantTodos } = useQuery({
    queryFn: () =>
      getTodoByConfigsApi({
        where: {
          important: true,
        },
      }),
    queryKey: ["getImportantTodos"],
    refetchOnWindowFocus: false,
  }); */

  const data = [
    {
      id: 1,
      icon: "mingcute:inbox-fill",
      title: "全部",
      iconBg: "bg-black",
      count: allTodos?.data.todos.length,
    },
    {
      id: 2,
      icon: "ph:star-bold",
      title: "重要",
      iconBg: "bg-amber-500",
      count: allTodos?.data.todos.filter(
        (item: { important: boolean }) => item.important
      ).length,
    },
    {
      id: 3,
      icon: "mingcute:check-fill",
      title: "已完成",
      iconBg: "bg-emerald-500",
      count: allTodos?.data.todos.filter(
        (item: { isDone: boolean }) => item.isDone
      ).length,
    },
    {
      id: 4,
      icon: "maki:cross",
      title: "未完成",
      iconBg: "bg-red-500",
      count: allTodos?.data.todos.filter(
        (item: { isDone: boolean }) => !item.isDone
      ).length,
    },
  ];

  const [selectedId, setSelectedId] = useState(0);

  return (
    <div className="h-full grid grid-cols-2 grid-rows-[10rem_7rem_7rem_1fr] gap-4">
      <MyDayCard />
      {data.map((item) => (
        <motion.div
          key={item.id}
          // layoutId={item.id.toString()}
          onClick={() => setSelectedId(() => item.id)}
          whileTap={{ scale: 1.1, transition: { type: "spring" } }}
          className=" rounded-2xl bg-white dark:bg-neutral-800  p-4 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className={`${item.iconBg} p-1.5 rounded-full text-white`}>
              <Icon icon={item.icon} className="text-2xl" />
            </div>
            <div className="font-bold text-2xl">{item.count}</div>
          </div>
          <div className="font-medium text-slate-500 dark:text-slate-300 text-sm">
            {item.title}
          </div>
        </motion.div>
      ))}
      <AnimatePresence initial={false}>
        {selectedId && (
          <motion.div
            key={"menu1"}
            layout
            className="fixed z-40 top-0 left-0 right-0 bottom-0"
            onClick={() => {
              setSelectedId(0);
            }}
          >
            <motion.div
              key={"menu2"}
              layout
              style={{
                top: 80,
                left: 16,
                width: "calc(100vw - 2rem)",
                height: "calc(100vh - 10rem)",
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100vh - 10rem)", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              // transition={{ type: "spring" }}
              layoutId={selectedId.toString()}
              className="bg-white dark:bg-neutral-800 shadow-md fixed z-50 rounded-2xl p-4 flex flex-col"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <motion.div className="flex items-center justify-between">
                <motion.div className="text-2xl font-medium">
                  {data[selectedId - 1].title}
                </motion.div>
                <motion.button
                  onClick={() => {
                    setSelectedId(() => 0);
                  }}
                >
                  <Icon
                    icon="carbon:close-filled"
                    className="text-2xl text-red-500"
                  />
                </motion.button>
              </motion.div>
              <motion.div className="flex-1 pt-4 overflow-y-scroll">
                {(() => {
                  switch (selectedId) {
                    case 1:
                      return <TodoList todos={allTodos?.data.todos} />;
                    case 2:
                      return (
                        <TodoList
                          todos={allTodos?.data.todos.filter(
                            (item: { important: boolean }) => item.important
                          )}
                        />
                      );
                    case 3:
                      return (
                        <TodoList
                          todos={allTodos?.data.todos.filter(
                            (item: { isDone: boolean }) => item.isDone
                          )}
                        />
                      );
                    case 4:
                      return (
                        <TodoList
                          todos={allTodos?.data.todos.filter(
                            (item: { isDone: boolean }) => !item.isDone
                          )}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
