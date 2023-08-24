"use client";

import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { NavItems } from "@/constants";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const v = useTranslations("Navbar Items");

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleMenuClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleNavbarMouseLeave = () => {
    setSelectedItem(null);
  };

  return (
    <nav
      className="hidden md:flex bg-blue-900 p-4 px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60"
      onMouseLeave={handleNavbarMouseLeave}
    >
      <ul className="flex space-x-4">
        {NavItems.map((item) => (
          <Link href={item.link} className="text-white  cursor-pointer" key={item.id}>
            {" "}
            <li
              
              className="relative group bg-blue-900 hover:bg-blue-950 text-sm"
              onMouseEnter={() => handleMenuClick(item)}
            >
              {t(`${item.title}`)}

              {selectedItem === item && (
                <DropdownMenu title={item.title} menu={item.menu} v={v} />
              )}
            </li>
          </Link>
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
  title: string;
  menu: any[];
  v: (key: string) => string;
}) => (
  <div className="absolute left-0 mt-3 bg-blue-900 p-2 rounded-lg shadow-lg w-52 ">
    <ul className="space-y-1">
      {menu &&
        menu.map((subItem: any, subIndex: number) => (
          <li
            key={`${title}-${subIndex}`}
            className="bg-transparent hover:bg-blue-950"
          >
            <Link href="/" className="block py-1">
              {v(subItem.option)}
            </Link>
          </li>
        ))}
    </ul>
    
  </div>
);

export default Navbar;
