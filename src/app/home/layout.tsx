import HeaderBar from "@/components/HeaderBar";
import TabBar from "@/components/TabBar";
import type { Metadata } from "next";
import HomeHeader from "@/components/home/HomeHeader";
import HomeBar from "@/components/home/HomeBar";


export const metadata: Metadata = {
  title: "主页-开始完成任务吧!",
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-4 h-full">
      <HeaderBar>
        <HomeHeader />
      </HeaderBar>
      <div className="flex-1 py-2">{children}</div>
      <TabBar>
        <HomeBar />
      </TabBar>
    </div>
  );
}
