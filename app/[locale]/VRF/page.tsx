"use client"

import { NavItems } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";


export default function VRFPage() {
  const t = useTranslations("VRF");
 

  // Find the "VRF" category in NavItems
  const vrfCategory = NavItems.find(item => item.title === "VRF");

  if (!vrfCategory) {
    return null; // Return early or render a loading/error component
  }

  return (
    <div className="  pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <div className=" text-xs sm:text-sm   text-gray-500">
        <Link href="/" passHref>
          {t("Home")}
        </Link>
        /
        <Link href={vrfCategory.link} passHref>
          {t("Title")}
        </Link>
      </div>
      <div className="mt-8">
        <nav>
          <ul className="flex justify-start gap-2">
            {vrfCategory.menu.map(menuItem => (
              <li className="li-vrf" key={menuItem.option}>
                {t(menuItem.option)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <h1 className="product-h1 mt-8 md:mt-16 font-bold text-sm md:text-lg">{t("Title")}</h1>
      <div>
       
      
               
      
     
      </div>
    </div>
  );
}
