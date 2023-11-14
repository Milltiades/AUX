"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const params = useParams();

  const [productInfo, setProductInfo] = useState<any>();
  const [productImage, setProductImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/getFile/${productInfo?.photo || ""}`
        );
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setProductImage(objectUrl);
      } catch (error) {
        console.error("Error Fetching Image", error);
      }
    };
    if (productInfo) {
      fetchProductImage();
    }
  }, [productInfo]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/oneProduct/${params.item}`
        );
        const data = await response.json();
        setProductInfo(data);
      } catch (error) {
        console.error("Error fetching product info:", error);
      }
    };

    fetchProductInfo();
  }, [params.item]);

  console.log("params", params);
  console.log("oneProduct:", productInfo);
  console.log("productImage", productImage);

  const t = useTranslations<any>(params.category);
  const p = useTranslations<any>("Call");

  return (
    <div className="pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      {productInfo ? (
        <div className="flex flex-col sm:flex-row sm:items-start sm:mt-20">
          <div
            className="bg-white h-60 w-full product-image sm:w-1/2 sm:h-96"
            style={{ backgroundImage: `url(${productImage})` }}
          ></div>
          <div className="p-0 sm:p-5 sm:px-10 mt-5 sm:mt-0 w-auto sm:w-1/2 sm:h-96 flex flex-col gap-5 items-center sm:items-end">
            <div className="w-auto">
              <h1 className="mt-2 text-lg sm:text-xl  ">
                {t(productInfo.name)}
              </h1>
              <p className="">{t(productInfo.description)}</p>
            </div>
            <Link href="/requestCall">
              {" "}
              <button className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11 sm:mt-10">
                {p("btn")}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
