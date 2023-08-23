"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Inputs = {
  name: string;
  email: string;
  mobile: number;
};

export default function Page() {
  const [done, setDone] = useState(false);

  const t = useTranslations("Call");

  const form = useRef<any>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (e: any) => {
    // e.preventDefault();

    emailjs
      .sendForm(
        "service_j314zp1",
        "template_d53bdci",
        form.current,
        "FAPBz0_Pndyb_160r"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          router.push("/");
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="flex items-center justify-center p-5  min-h-custom md:px-40 md:py-20 ">
      <div className="bg-gray-100 max-w-lg m-auto flex flex-col p-10 text-white rounded-lg shadow-2xl w-full">
        <h1 className="mb-10 text-2xl text-blue-900 font-bold">{t("title")}</h1>
        <form
          ref={form}
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className=" placeholder-blue-900 h-8  bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 p-2"
            type="text"
            {...register("name", { required: true })}
            placeholder={t("name")}
          />

          <input
            className=" h-8  bg-transparent border-b-2 text-blue-900 border-blue-900 placeholder-blue-900 focus:border-blue-900 hover:border-blue-900 p-2"
            type="text"
            {...register("email", { required: true })}
            placeholder={t("email")}
          />

          <input
            className=" h-8  bg-transparent border-b-2 text-blue-900 border-blue-900 placeholder-blue-900 focus:border-blue-900 hover:border-blue-900 p-2"
            type="text"
            {...register("mobile", { required: true })}
            placeholder={t("mobile")}
          />
          <input
            type="submit"
            value={t("btn")}
            className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-xl text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11 self-end"
          />
        </form>
      </div>
    </div>
  );
}
