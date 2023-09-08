"use client";

import { useTranslations } from "next-intl";
import React from "react";

export default function page() {
  const t = useTranslations("About");
  return (
    <div className="pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <h1 className=" mt-8 text-xl sm:text-2xl">{t("title")}</h1>
      <p className=" mt-5 text-sm sm:text-xl">{t("text")}</p>
    </div>
  );
}
