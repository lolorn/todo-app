"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDrawerStore } from "@/store/store";
import UserPage from "../UserPage";

function HomeHeader() {
  const toggle = useDrawerStore((state) => state.toggleDrawerStatus);
  const changeContent = useDrawerStore((state) => state.changeContent);
  const changeTitle = useDrawerStore((state) => state.changeTitle);
  return (
    <div className="h-full flex items-center justify-between">
      <div
        className="flex items-center gap-2"
        onClick={() => {
          changeContent(<UserPage />);
          changeTitle("设置")
          toggle();
        }}
      >
        <Image src={""} alt={""} className="w-10 h-10 rounded-full" />
        <div>Username</div>
      </div>
      <div className="flex items-center">
        <Link href="/search">
          <Icon icon="iconamoon:search-bold" className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default HomeHeader;
