"use client";
import { Icon } from "@iconify/react";
import Drawer from "@/components/Drawer";
//!网格布局有问题哦
function HomePage() {
  return (
    <div>
      <div className="grid grid-cols-2 grid-rows-[minmax(10rem,1fr)_7rem_7rem] gap-4">
        <div className="col-span-2 border bg-white shadow-sm h-40 rounded-2xl flex flex-col px-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="ph:sun-bold" className="text-2xl text-sky-500" />
              <div className="text-slate-500 font-medium">我的一天</div>
            </div>
            <div>
              <div className="font-bold text-2xl">5</div>
            </div>
          </div>
          <ul className="flex-1 flex flex-col">
            <li className="flex-1">1</li>
            <li className="flex-1">2</li>
            <li className="flex-1">3</li>
          </ul>
        </div>
        <div className="border rounded-2xl bg-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-black p-1.5 rounded-full text-white">
              <Icon icon="mingcute:inbox-fill" className="text-2xl" />
            </div>
            <div className="font-bold text-2xl">11</div>
          </div>
          <div className="font-medium text-slate-500 text-sm">全部</div>
        </div>
        <div className="border rounded-2xl bg-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-amber-500 p-1.5 rounded-full text-white">
              <Icon icon="ph:star-bold" className="text-2xl" />
            </div>
            <div className="font-bold text-2xl">0</div>
          </div>
          <div className="font-medium text-slate-500 text-sm">重要</div>
        </div>
        <div className="border rounded-2xl bg-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-emerald-500 p-1.5 rounded-full text-white">
              <Icon icon="mingcute:check-fill" className="text-2xl" />
            </div>
            <div className="font-bold text-2xl">0</div>
          </div>
          <div className="font-medium text-slate-500 text-sm">已完成</div>
        </div>
        <div className="border rounded-2xl bg-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-red-500 p-1.5 rounded-full text-white">
              <Icon icon="maki:cross" className="text-2xl" />
            </div>
            <div className="font-bold text-2xl">0</div>
          </div>
          <div className="font-medium text-slate-500 text-sm">未完成</div>
        </div>
      </div>
      <div className="h-[1px] bg-gray-300 my-4" />
      <div></div>
    </div>
  );
}

export default HomePage;
