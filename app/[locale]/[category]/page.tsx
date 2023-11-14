"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [categoryInfo, setCategoryInfo] = useState<any>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [productInfo, setProductInfo] = useState<any>([]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/list/products`
        );
        const data = await response.json();
        setProductInfo(data);
      } catch (error) {
        console.error("Error fetching product info:", error);
      }
    };
    fetchProductInfo();
  }, []);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product_category/list/categorys`
        );
        const data = await response.json();
        setCategoryInfo(data);
      } catch (error) {
        console.error("Error fetching category info:", error);
      }
    };
    fetchCategoryInfo();
    // Get the current URL path
    const path = window.location.pathname;
    setCurrentPath(path);
  }, []);

  const desiredObject = categoryInfo.find(
    (item: any) => item.productCategoryID === params.category
  );
  const desiredProduct = productInfo.filter(
    (product: any) =>
      product.productCategoryID === "987941c9-1c34-4132-840d-ada6a41c68b1"
  );

  const t = useTranslations<any>("Navbar Items");

  return (
    <div className="  pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <div className="mt-8">
        <nav>
          <ul className="flex justify-start gap-2">
            {desiredObject &&
              desiredObject.children.map((child: any) => (
                <li key={child.productCategoryID} className="li-vrf">
                  <Link href={`${currentPath}/${child.productCategoryID}`}>
                    <p>{t(child.categoryName)}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
