import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "注册用户!(doge)",
};

function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 h-full">{children}</div>;
}

export default RegisterLayout;
