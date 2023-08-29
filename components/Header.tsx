"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { NavItems } from "@/constants";

export default function Header() {
  const t = useTranslations("Button");
  const [isMenu, setIsMenu] = useState(false);

  const minHeightStyle: any = {
    minHeight: isMenu ? "100vh" : "auto",
    justifyContent: isMenu ? "start" : "between",
    gap: isMenu ? "32px" : "10px",
    position: isMenu ? "fixed" : "relative",
    width: isMenu ? "100%" : "auto",
  };

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleMenuClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleNavbarMouseLeave = () => {
    setSelectedItem(null);
  };

  const v = useTranslations("Navbar Items");
  const tt = useTranslations("Navbar");
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

            {/* <img className=" w-10 h-10 mr-4" src="./phone.svg" alt="phone" /> */}

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
        <nav>
          <ul>
            {NavItems.map((item) => (
              <Link
                href={item.link}
                className="text-white  cursor-pointer "
                key={item.id}
              >
                {" "}
                <li
                  className="relative group bg-blue-900 hover:bg-blue-950 text-sm z-40 w-1/2"
                  onMouseEnter={() => handleMenuClick(item)}
                >
                  {tt(`${item.title}`)}

                  {selectedItem === item && (
                    <DropdownMenu
                      title={item.title}
                      menu={item.menu}
                      v={v}
                      setIsMenu={setIsMenu}
                      isMenu={isMenu}
                    />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

const DropdownMenu = ({
  title,
  menu,
  isMenu,
  setIsMenu,
  v,
}: {
  isMenu: any;
  setIsMenu: any;
  title: string;
  menu: any[];
  v: (key: string) => string;
}) => (
  <div className="absolute top-0 mt-3 bg-blue-900 p-2 rounded-lg shadow-lg nav-custom w-44">
    <ul className="space-y-1">
      {menu &&
        menu.map((subItem: any, subIndex: number) => (
          <li
            key={`${title}-${subIndex}`}
            className="bg-transparent hover:bg-blue-950 z-50"
            onClick={() => setIsMenu(false)}
          >
            <Link href={subItem.link} className="block py-1">
              {v(subItem.option)}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

// const DropdownMenu = ({
//   title,
//   menu,
//   v,
// }: {
//   title: string;
//   menu: any[];
//   v: (key: string) => string;
// }) => (
//   <div className="absolute left-0 mt-3 bg-blue-900 p-2 rounded-lg shadow-lg w-52">
//     <ul className="space-y-1">
//       {menu &&
//         menu.map((subItem: any, subIndex: number) => (
//           <li
//             key={`${title}-${subIndex}`}
//             className="bg-transparent hover:bg-blue-950"
//           >
//             <Link href={subItem.link}>
//               <p className="block py-1">{v(subItem.option)}</p>
//             </Link>
//           </li>
//         ))}
//     </ul>
//   </div>
// );

