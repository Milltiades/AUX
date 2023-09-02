import { useTranslations } from "next-intl";
import React from "react";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <div className="flex flex-col md:flex-row bg-gray-300  md:py-16 md:pb-10 p-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 justify-between md:px-5 gap-5">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className=" flex flex-col gap-5">
          <h1 className=" font-semibold text-sm md:text-lg text-gray-600">
            {t("contact")}
          </h1>
          <h1 className=" font-semibold text-xs md:text-sm text-gray-600">
            599 99 99 99 <br />
            auxtesttest@aux.ge
          </h1>
        </div>
        <div className=" flex flex-col gap-5">
          <h1 className=" font-semibold text-sm md:text-lg text-gray-600">
            {t("address")}
          </h1>
          <h1 className=" font-semibold text-xs md:text-sm text-gray-600">
            {t("tbilisi")} <br /> {t("tsereteli")}
          </h1>
        </div>
        <div className=" flex flex-col gap-5">
          <h1 className=" font-semibold text-sm md:text-lg text-gray-600">
            {t("working")}
          </h1>
          <h1 className=" font-semibold text-xs md:text-sm text-gray-600">
            {t("days")} <br />
            10:00-18:00
          </h1>
        </div>
      </div>
      <div className=" border-t-2 border-slate-600 w-full opacity-50 mt-5">
        <h1 className="mt-2">Copyright &copy; 2023. All Rights Reserved</h1>
      </div>
    </div>
  );
}
