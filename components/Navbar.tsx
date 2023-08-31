"use client";

import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { NavItems } from "@/constants";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const v = useTranslations("Navbar Items");

  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);

  const handleMenuClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleNavbarMouseLeave = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
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

    fetchProductInfo();
  }, []);

  return (
    <nav
      className="hidden md:flex bg-blue-900 p-4 px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 h-[65px]"
      onMouseLeave={handleNavbarMouseLeave}
    >
      <ul className="flex space-x-4">
        {categoryInfo &&
          categoryInfo.map((item: any) => (
            <li
              key={item.productCategoryID}
              className="relative group bg-blue-900 hover:bg-blue-950 text-sm li-navbar"
              onMouseEnter={() => handleMenuClick(item)}
            >
              <Link href={`/${item.productCategoryID}`}>
                <p className="text-white cursor-pointer">
                  {t(`${item.categoryName}`)}
                </p>
              </Link>
              {selectedItem === item && (
                <DropdownMenu
                  title={item.categoryName}
                  menu={item.children}
                  v={v}
                />
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

const DropdownMenu = ({
  title,
  menu,
  v,
}: {
  title: any;
  menu: any[];
  v: (key: string) => string;
}) => (
  <div className="absolute left-0 mt-3 bg-blue-900 p-2 rounded-lg shadow-lg w-52">
    <ul className="space-y-1">
      {menu &&
        menu.map((subItem: any, subIndex: number) => (
          <li
            key={`${title}-${subIndex}`}
            className="bg-transparent hover:bg-blue-950 li-navbar"
          >
            <Link href={`/${title}/${subItem.productCategoryID}`}>
              <p className="block py-1">{v(subItem.categoryName)}</p>
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Navbar;
