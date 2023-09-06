import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "主页-添加任务",
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
