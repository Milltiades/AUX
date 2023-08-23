import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Consultation() {

    const t = useTranslations('Consultation')
  return (
    <div className=" flex justify-center md:items-center gap-10 md:gap-0 py-10  bg-gray-300 md:justify-between md:py-14 md:px-20 text-gray-600 shadow-lg">
      <h1 className=" text-3xl font-semibold">{t('title')}</h1>
      <div className="flex flex-col font-semibold">
        <div className="flex w-full justify-between">
          <h2 className=" text-xl">
            {t('call')} 
          </h2>
          <h2 className=" text-xl">599 99 99 99</h2>
        </div>
        <div className="flex mt-4 items-center ">
          <h2 className=" text-xl mr-4">{t('or')}</h2>
        <Link href='/requestCall'>  <button className=" bg-blue-900 text-white font-bold px-8 rounded-xl w-56 text-xl hover:bg-blue-700 transition duration-300 ease-in-out h-11">
            {t('button')}
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
