import { useTranslations } from "next-intl";
import React from "react";

export default function Footer() {

    const t = useTranslations('Footer')
  return (
    <div className="flex flex-col md:flex-row bg-gray-300 p-5 md:py-16 lg:px-40 justify-between md:px-5 gap-5">
      <div className=" flex flex-col gap-5">
        <h1 className=" font-semibold text-lg md:text-xl text-gray-600">{t('contact')}</h1>
        <h1 className=" font-semibold text-sm md:text-lg text-gray-600">
          599 99 99 99 <br />
          auxtesttest@aux.ge
        </h1>
      </div>
      <div className=" flex flex-col gap-5">
        <h1 className=" font-semibold text-lg md:text-xl text-gray-600">{t('address')}</h1>
        <h1 className=" font-semibold text-sm md:text-lg text-gray-600">{t('tbilisi')} <br/> {t('tsereteli')}
        </h1>
        </div>
      <div className=" flex flex-col gap-5">
        <h1 className=" font-semibold text-lg md:text-xl text-gray-600">{t('working')}</h1>
        <h1 className=" font-semibold text-sm md:text-lg text-gray-600">{t('days')} <br/>
        10:00-18:00
        </h1>
      </div>
    </div>
  );
}
