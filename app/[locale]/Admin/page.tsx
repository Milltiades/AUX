"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavItems } from "@/constants";

// type Inputs = {
//   categoryName: string;
//   parentID?: string;
// };

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const t = useTranslations("Admin");
  const p = useTranslations("Navbar");

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subMenu, setSubMenu] = useState<any>([]);
  const [subID, setSubID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const v = useTranslations(selectedCategory);

  const handleSubMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubID = e.target.value;
    setSubID(selectedSubID);
  };

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/register/${subID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
            productCategoryID: subID,
          }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Data sent successfully");
        reset();
        setName("")
        setDescription("")
        alert("Produc add successfuly")
      } else {
        const responseData = await response.json();
        console.error("Failed to send data to the backend:", responseData);
        alert("Uups Error! All Fields are necessary")
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedCategory = e.target.value;
    setSelectedCategory(newSelectedCategory);

    const matchingCategory = NavItems.find((item) => item.title === newSelectedCategory);
    if (matchingCategory) {
      setSubMenu(matchingCategory.menu);
    } else {
      setSubMenu([]);
    }
  };

  return (
    <div className="flex items-center justify-center p-5  min-h-custom md:px-40 md:py-20">
      <div className="bg-gray-100 max-w-lg m-auto flex flex-col p-5 sm:p-10 text-white rounded-lg shadow-2xl w-full">
        <h1 className="mb-10 text-sm sm:text-2xl text-blue-900 font-bold">{t("Add Product")}</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <select
            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
            onChange={handleCategoryChange}
          >
            {NavItems && NavItems.map((item:any) => (
              <option value={item.title} key={item.id}>{p(item.title)}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
            onChange={handleSubMenuChange}
          >
            {subMenu && subMenu.map((item: any) => (
              <option key={item.productCategoryID} value={item.productCategoryID}>
                {v(item.option)}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 bg-transparent border-b-2 text-blue-900 border-blue-900 placeholder-blue-900 focus:border-blue-900 hover:border-blue-900 p-2 text-sm sm:text-lg"
            placeholder={t("Name")}
          />
          
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-8 bg-transparent border-b-2 text-blue-900 border-blue-900 placeholder-blue-900 focus:border-blue-900 hover:border-blue-900 p-2 text-sm sm:text-lg"
            placeholder={t("Description")}
          />

          <input
            type="submit"
            value={t("Add")}
            className="bg-blue-900 text-white font-bold rounded-xl w-40 md:w-56 hover:bg-blue-700 transition duration-300 ease-in-out h-11 self-end text-sm sm:text-lg"
          />
        </form>
      </div>
    </div>
  );
}
