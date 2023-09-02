import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function OurWork() {
  const t = useTranslations("Gallery");
  return (
    <div className=" flex flex-col md:flex-row  items-center gap-10 md:gap-0 py-10  bg-gray-300 md:justify-between md:py-14 md:px-20 text-gray-600 shadow-lg m-5 sm:m-5 lg:mx-48 xl:mx-56 2xl:mx-60 bg-gallery">
      {/* <h1 className="  text-xl sm:text-2xl md:text-3xl font-semibold sm:text-center">
        {t("Our Work")}
      </h1> */}

      <Link href="/Gallery">
        {" "}
        <button className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-xl text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11">
          {t("See Works")}
        </button>
      </Link>
    </div>
  );
}
