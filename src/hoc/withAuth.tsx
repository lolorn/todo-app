"use client";
import React, { ComponentType, useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

//* 其实感觉这个高阶组件好像没啥用，在home页面如果没有token的话直接重定向到login页面就是咯

const withAuth = <A extends object>(Component: ComponentType<A>) => {
  const WithAuth: React.FC<A> = (props) => {
    useEffect(() => {
      if (!Cookies.get("token")) {
        console.log("重定向到login");
        redirect("/login");
      }
    }, []);
    return <Component {...props} />;
  };

  return WithAuth;
};

export default withAuth;
