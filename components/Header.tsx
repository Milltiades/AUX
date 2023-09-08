"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

export default function Header() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);

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

  const t = useTranslations("Button");
  const n = useTranslations("Navbar");
  const v = useTranslations("Navbar Items");
  const a = useTranslations("About");
  const [isMenu, setIsMenu] = useState(false);

  const minHeightStyle: any = {
    minHeight: isMenu ? "100vh" : "auto",
    justifyContent: isMenu ? "start" : "between",
    gap: isMenu ? "32px" : "10px",
    position: isMenu ? "fixed" : "relative",
    width: isMenu ? "100%" : "auto",
  };

  const handleMenuClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleNavbarMouseLeave = () => {
    setSelectedItem(null);
  };

  return (
    <div
      className=" min-h-100 : flex flex-col  md:flex-row bg-slate-50 md:py-14 shadow-lg px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 justify-between py-5"
      style={minHeightStyle}
    >
      <div className="flex flex-row justify-between">
        <Link className=" items-center flex justify-center" href="/">
          <Image width={80} height={30} src="/logo.svg" alt={"logo"} />
        </Link>
        {!isMenu ? (
          <MenuOutlined
            className=" items-center flex sm:hidden z-50 cursor-pointer"
            onClick={() => setIsMenu((prev) => !prev)}
          />
        ) : (
          <CloseOutlined
            className=" items-center flex sm:hidden z-50 cursor-pointer"
            onClick={() => setIsMenu((prev) => !prev)}
          />
        )}
      </div>
      {isMenu ? null : (
        <div className="flex justify-between mt-5 md:mt-0 ">
          <div className="flex items-center md:mr-20 mt-4 sm:mt-0">
            <Image
              className=" mr-4 image-aux"
              width={32}
              height={32}
              src={"/phone.svg"}
              alt={"phone"}
            />

            <h1 className=" text-sm md:text-lg font-bold">599 99 99 99</h1>
          </div>

          <Link href="/requestCall">
            {" "}
            <button className=" bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 md:text-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out h-11 mt-4 sm:mt-0">
              {t("title")}
            </button>
          </Link>
        </div>
      )}
      {isMenu ? (
        <nav
          className="  bg-blue-900 p-2 rounded-lg shadow-lg w-1/2"
          onMouseLeave={handleNavbarMouseLeave}
        >
          <ul className="flex flex-col ">
            {categoryInfo &&
              categoryInfo.map((item: any) => (
                <li
                  key={item.productCategoryID}
                  className="relative group bg-blue-900 hover:bg-blue-950 text-sm z-40 p-[10px] rounded-lg"
                  onMouseEnter={() => handleMenuClick(item)}
                >
                  <Link href={`/${item.productCategoryID}`}>
                    <p className="text-white cursor-pointer">
                      {n(`${item.categoryName}`)}
                    </p>
                  </Link>
                  {selectedItem === item && (
                    <DropdownMenu
                      title={item.categoryName}
                      menu={item.children}
                      setIsMenu={setIsMenu}
                      v={v}
                    />
                  )}
                </li>
              ))}
            <li className="bg-transparent hover:bg-blue-950 li-navbar">
              <Link href={"/about"} onClick={() => setIsMenu(false)}>
                <p>{a("title")}</p>
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

const DropdownMenu = ({
  title,
  menu,
  setIsMenu,
  v,
}: {
  title: any;
  setIsMenu: any;
  menu: any[];
  v: (key: string) => string;
}) => (
  <div className="absolute top-0 mt-3 bg-blue-900 p-2 rounded-lg shadow-lg nav-custom w-44">
    <ul className="space-y-1">
      {menu &&
        menu.map((subItem: any, subIndex: number) => (
          <li
            key={`${title}-${subIndex}`}
            className="bg-transparent hover:bg-blue-950 li-navbar"
            onClick={() => setIsMenu(false)}
          >
            <Link href={`/${title}/${subItem.productCategoryID}`}>
              <p className="block py-1">{v(subItem.categoryName)}</p>
            </Link>
          </li>
        ))}
    </ul>
  </div>
);
