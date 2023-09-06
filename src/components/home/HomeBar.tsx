"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";

function HomeBar() {
  return (
    <div className="h-full flex items-center justify-between">
      <div className="text-blue-500">
        <Link href={"/addTodo"} className="flex items-center gap-2">
          <Icon icon="gala:add" className="text-2xl" />
          <span className="font-medium">添加任务</span>
        </Link>
      </div>
      <div className="text-indigo-500 font-medium">
        <Link href={"/addList"}>添加列表</Link>
      </div>
    </div>
  );
}

export default HomeBar;
