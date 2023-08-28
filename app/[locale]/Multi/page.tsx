"use client";

import { NavItems } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VRFPage() {
  const t = useTranslations("Multi-Split");
  const p = useTranslations("Multi-Split - Products");

  // Find the "VRF" category in NavItems
  const multiSplitCategory = NavItems.find((item) => item.title === "Multi-Split");

  if (!multiSplitCategory) {
    return null; // Return early or render a loading/error component
  }

  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState(
    "4cf96862-a196-40cc-9e27-96aa46a9d60a"
  );
  const [categoryLink, setCategoryLink] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productID}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log(productID);
  }, [productID]);

 

  return (
    <div className="  pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <div className=" text-xs sm:text-sm   text-gray-500">
        <Link href="/" passHref>
          {t("Home")}
        </Link>
        /
        <Link href={multiSplitCategory.link} passHref>
          {t("Title")}
        </Link>
        {/* /
        <Link href={multiSplitCategory.link} passHref>
          {t(categoryLink)}
        </Link> */}
      </div>
      <div className="mt-8">
        <nav>
          <ul className="flex justify-start gap-2">
            {multiSplitCategory.menu.map((menuItem: any) => (
              <li
                className="li-vrf"
                key={menuItem.option}
                onClick={() => {
                  setCategoryLink(menuItem.option);
                  setProductID(menuItem.productCategoryID);
                }}
              >
                {t(menuItem.option)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <h1 className="product-h1 mt-8 md:mt-16 font-bold text-sm md:text-lg">
        {t("Title")}
      </h1>
      <h2 className=" mt-2 md:mt-4 text-sm md:text-lg">{categoryLink && t(categoryLink)}</h2>
      <div>
        <div className=" w-full flex  flex-wrap">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="  p-2 flex flex-col w-1/2 sm:w-1/3 md:w-1/4"
            >
              <div className="bg-gray-500 w-full h-40 sm:h-60  rounded-lg"></div>
              <h1 className="mt-2">{p(product.name)}</h1>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
}
