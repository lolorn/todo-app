import type { Metadata } from "next";

export const metadata : Metadata = {
  title:"登陆账号!^_^"
}

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-full">{children}</div>;
}

export default LoginLayout;
