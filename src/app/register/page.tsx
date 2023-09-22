"use client";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useToggle from "@/hooks/Toggle";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { createUserApi } from "@/api/createUser";
import { useNoticeStore } from "@/store/store";

function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("token")) {
      router.replace("/home");
    }
  }, []);

  const schema = z
    .object({
      username: z
        .string()
        .min(2, { message: "用户名少于2个字符" })
        .max(20, { message: "用户名大于20个字符" }),
      password: z.string().min(6, { message: "密码少于6个字符" }),
      email: z.string().email({ message: "邮箱格式错误" }),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      path: ["repeatPassword"],
      message: "两次密码不一致",
    });
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      repeatPassword: "",
    },
  });

  const { setNoticeOptions, showNotice } = useNoticeStore((state) => state);

  const mutation = useMutation({
    mutationFn: (data) => {
      return createUserApi(data)
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

  const submit = (data: {
    username: string;
    password: string;
    email: string;
  }) => {
    console.log(data);
    mutation.mutate(data);
  };

  const [showPw, togglePw] = useToggle();
  const [showRpw, toggleRpw] = useToggle();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: "",
        password: "",
        email: "",
        repeatPassword: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center gap-4">
        <div className="text-sky-500 font-bold text-3xl flex flex-col items-center">
          注册账户
        </div>
        <p className="flex items-center text-2xl font-semibold text-blue-500">
          以使用
          <span className="bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
            简陋
          </span>
          的任务App
          <Icon
            icon="fluent-emoji-flat:clown-face"
            className="ml-2 animate-bounce"
          />
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col flex-1 gap-4 m-4 bg-slate-300 dark:bg-neutral-800 p-4 rounded-lg"
        autoComplete="off"
      >
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
          <span className="font-bold text-lg">邮箱</span>
          {errors.email?.message && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.email?.message}
            </p>
          )}
          <input
            className="p-2 rounded-md placeholder:italic caret-pink-500 outline-none"
            type="text"
            {...register("email")}
            placeholder="输入邮箱"
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
              type={showPw ? "text" : "password"}
              {...register("password")}
              placeholder="输入密码"
            />
            <button type="button" onClick={togglePw}>
              {showPw ? (
                <Icon icon="mdi:eye" className="text-2xl" />
              ) : (
                <Icon icon="mdi:eye-off" className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">确认密码</span>
          {errors.repeatPassword?.message && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.repeatPassword?.message}
            </p>
          )}
          <div className="flex items-center bg-white dark:bg-neutral-700 rounded-lg pr-1">
            <input
              className="flex-1 p-2 rounded-md placeholder:italic caret-pink-500 outline-none"
              type={showRpw ? "text" : "password"}
              {...register("repeatPassword")}
              placeholder="确认密码"
            />
            <button type="button" onClick={toggleRpw}>
              {showRpw ? (
                <Icon icon="mdi:eye" className="text-2xl" />
              ) : (
                <Icon icon="mdi:eye-off" className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <button className="bg-indigo-500 p-2 text-white rounded-lg">
          注册
        </button>
        <Link
          href={"/login"}
          className="text-center underline underline-offset-2 text-sm"
        >
          有账号了?去登陆
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
