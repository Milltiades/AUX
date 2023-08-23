import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("Button");
  return (
    <div className=" bg-slate-50 md:py-14 shadow-lg lg:px-40 justify-between px-5 py-5 md:flex">
      <Link className=" items-center flex justify-center" href="/">
        <Image width={80} height={30} src="/logo.svg" alt={"logo"} />
      </Link>
      <div className="flex justify-between mt-5 md:mt-0">
        <div className="flex items-center md:mr-20">
          <Image
            className=" mr-4"
            width={41}
            height={41}
            src={"/phone.svg"}
            alt={"phone"}
          />

          {/* <img className=" w-10 h-10 mr-4" src="./phone.svg" alt="phone" /> */}

          <h1 className=" text-lg md:text-lg font-bold">599 99 99 99</h1>
        </div>

        <Link href="/requestCall">
          {" "}
          <button className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-xl text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11 mt-2 sm:mt-0">
            {t("title")}
          </button>
        </Link>
      </div>
    </div>
  );
}
