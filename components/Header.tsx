"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

export default function Header() {
  const t = useTranslations("Button");
  const [menu, setMenu] = useState(false);
  return (
    <div className=" flex flex-col  md:flex-row bg-slate-50 md:py-14 shadow-lg px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 justify-between py-5">
      <div className="flex flex-row justify-between">
        <Link className=" items-center flex justify-center" href="/">
          <Image width={80} height={30} src="/logo.svg" alt={"logo"} />
        </Link>
        {!menu ? (
          <MenuOutlined className=" items-center flex sm:hidden z-50 cursor-pointer" onClick={() => setMenu((prev) => !prev)}/>
        ) : (
          <CloseOutlined className=" items-center flex sm:hidden z-50 cursor-pointer" onClick={() => setMenu((prev) => !prev)}/>
        )}
      </div>
      <div className="flex justify-between mt-5 md:mt-0 ">
        <div className="flex items-center md:mr-20 mt-4 sm:mt-0">
          <Image
            className=" mr-4 image-aux"
            width={32}
            height={32}
            src={"/phone.svg"}
            alt={"phone"}
          />

          {/* <img className=" w-10 h-10 mr-4" src="./phone.svg" alt="phone" /> */}

          <h1 className=" text-sm md:text-lg font-bold">599 99 99 99</h1>
        </div>

        <Link href="/requestCall">
          {" "}
          <button className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11 mt-4 sm:mt-0">
            {t("title")}
          </button>
        </Link>
      </div>
    </div>
  );
}
