import React from "react";
import Image from "next/image";

function UserPage() {
  return (
    <div className="h-full py-4 flex flex-col items-center gap-0.5 bg-slate-100  dark:bg-neutral-800">
      <Image src={""} alt={""} className="h-20 w-20 rounded-full" />
      <div className="flex flex-col items-center">
        <div className="text-2xl">Lolorn</div>
        <div className="text-sm text-slate-500">wangenzhao.adore@gmail.com</div>
      </div>
      <div className="text-blue-500 bg-slate-200  p-4 w-full flex justify-center">
        管理账户
      </div>
      <div className="text-red-500 bg-slate-200  p-4 w-full flex justify-center">
        退出登陆
      </div>
      <div className="text-red-500 bg-slate-200  p-4 w-full flex justify-center">
        删除账户
      </div>
    </div>
  );
}

export default UserPage;
