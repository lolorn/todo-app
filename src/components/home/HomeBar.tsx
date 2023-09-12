"use client";
import { Icon } from "@iconify/react";
import { useDrawerStore } from "@/store/store";
import AddTask from "../AddTask";
import AddCategory from "../AddCategory";
function HomeBar() {
  const toggle = useDrawerStore((state) => state.toggleDrawerStatus);
  const changeContent = useDrawerStore((state) => state.changeContent);
  const changeTitle = useDrawerStore((state) => state.changeTitle);
  return (
    <div className="h-full flex items-center justify-between">
      <div className="text-blue-500">
        <button
          onClick={() => {
            changeContent(<AddTask />);
            changeTitle("添加任务");
            toggle();
          }}
          className="flex items-center gap-2"
        >
          <Icon icon="gala:add" className="text-2xl" />
          <span className="font-medium">添加任务</span>
        </button>
      </div>
      <div className="text-indigo-500 font-medium">
        <button
          onClick={() => {
            changeContent(<AddCategory />);
            changeTitle("添加列表");
            toggle();
          }}
        >
          添加列表
        </button>
      </div>
    </div>
  );
}

export default HomeBar;
