"use client";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useToggle from "@/hooks/Toggle";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { getUserApi } from "@/api/getUser";
import { useNoticeStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("token")) {
      router.replace("/home");
    }
  }, []);

  const schema = z.object({
    username: z
      .string()
      .min(2, { message: "用户名少于2个字符" })
      .max(20, { message: "用户名大于20个字符" }),
    password: z.string().min(6, { message: "密码少于6个字符" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { showNotice, setNoticeOptions } = useNoticeStore((state) => state);

  const mutation = useMutation({
    mutationFn: (data) => {
      return getUserApi(data)
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            setNoticeOptions({ mes: res.data.message });
            showNotice();
            const { token } = res.data;
            console.log(token);
            Cookies.set("token", token, { expires: 7 });
            router.replace("/home");
          }
          if (res.data.status === "failed") {
            setNoticeOptions({ mes: res.data.message });
            showNotice();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const submit = (data: { username: string; password: string }) => {
    console.log(data);
    mutation.mutate(data);
  };

  const [show, toggle] = useToggle();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">登陆</div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">用户名</span>
          {errors.username?.message && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.username?.message}
            </p>
          )}
          <input
            className="p-2 rounded-md placeholder:italic caret-pink-500 outline-none"
            type="text"
            {...register("username")}
            placeholder="输入用户名"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">密码</span>
          {errors.password?.message && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.password?.message}
            </p>
          )}
          <div className="flex items-center bg-white dark:bg-neutral-700 rounded-lg pr-1">
            <input
              className="flex-1 p-2 rounded-md placeholder:italic caret-pink-500 outline-none"
              type={show ? "text" : "password"}
              {...register("password")}
              placeholder="输入密码"
            />
            <button type="button" onClick={toggle}>
              {show ? (
                <div className="w-8 flex items-center justify-center">
                  <Icon icon="mdi:eye" className="text-2xl" />
                </div>
              ) : (
                <div className="w-8 flex items-center justify-center">
                  <Icon icon="mdi:eye-off" className="text-2xl" />
                </div>
              )}
            </button>
          </div>
        </div>
        <button className="bg-teal-500 p-2 text-white rounded-lg">登陆</button>
        <Link
          href={"/register"}
          className="text-center underline underline-offset-2 text-sm"
        >
          没有账号了?去注册
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
