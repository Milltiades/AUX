"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
export default function Page() {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subMenu, setSubMenu] = useState<any>([]);
  const [subID, setSubID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<any>(null);

  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [productIDValue, setProductIDValue] = useState<any>();
  const [allProducts, setAllProducts] = useState<any>([]);
  const [productImages, setProductImages] = useState<any>({});

  useEffect(() => {
    const FetchAllProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/list/products`
        );
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data);
        } else {
          console.error("failed fetch all products:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching all products:", error);
      }
    };
    FetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const images: { [key: string]: string } = {};
        for (const item of allProducts) {
          const response = await fetch(
            `http://localhost:3000/products/getFile/${item.photo}`
          );
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          images[item.productID] = objectUrl;
        }
        setProductImages(images);
      } catch (error) {
        console.error("Error Fetching Images", error);
      }
    };
    fetchProductImages();
  }, [allProducts]);

  console.log("allProducts:", allProducts);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product_category/list/categorys`
        );
        if (response.ok) {
          const data = await response.json();
          setCategoryInfo(data);
        } else {
          console.error("Failed to fetch category info:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching category info:", error);
      }
    };

    fetchCategoryInfo();
  }, []);

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

      if (response.ok) {
        console.log("Data sent successfully");
        reset();
        setName("");
        setDescription("");
        alert("Product added successfully");
        window.location.reload();
      } else {
        const responseData = await response.json();
        console.error("Failed to send data to the backend:", responseData);
        alert("Oops! All fields are necessary");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedCategory = e.target.value;
    setSelectedCategory(newSelectedCategory);

    const matchingCategory = categoryInfo.find(
      (item: any) => item.categoryName === newSelectedCategory
    );
    if (matchingCategory) {
      setSubMenu(matchingCategory.children);
    } else {
      setSubMenu([]);
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPhotoFile(selectedFile);
    }
  };

  const onPhotoSubmit = async () => {
    try {
      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile);

        const photoResponse = await fetch(
          `http://localhost:3000/products/upload/photo/${productIDValue}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (photoResponse.ok) {
          console.log("Photo updated successfully");
        } else {
          console.error("Failed to update photo", photoResponse.statusText);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleDeleteProduct = async (productID: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/delete/${productID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Product deleted successfully");
        alert("Product Deleted");
        window.location.reload();
        // You might want to update your list of products here.
      } else {
        console.error("Failed to delete product:", response.statusText);
        // Handle error case here.
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const t = useTranslations("Admin");
  const v = useTranslations("Navbar");
  const p = useTranslations("Navbar Items");

  console.log("productImages:", productImages);

  return (
    <div className="flex flex-col p-5 min-h-custom md:px-40 md:py-20">
      <div className="flex flex-col sm:flex-row">
        <div className="bg-gray-100 max-w-lg m-auto flex flex-col p-5 sm:p-10 text-white rounded-lg shadow-2xl w-full">
          <h1 className="mb-10 text-sm sm:text-2xl text-blue-900 font-bold">
            {t("Add Product")}
          </h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <select
              className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
              onChange={handleCategoryChange}
            >
              {categoryInfo &&
                categoryInfo.map((item: any) => (
                  <option
                    value={item.categoryName}
                    key={item.productCategoryID}
                  >
                    {v(item.categoryName)}
                  </option>
                ))}
            </select>
            <select
              name=""
              id=""
              className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
              onChange={handleSubMenuChange}
            >
              {subMenu &&
                subMenu.map((item: any) => (
                  <option
                    key={item.productCategoryID}
                    value={item.productCategoryID}
                  >
                    {p(item.categoryName)}
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
      <div className="mt-5 pt-2">
        <h1 className=" text-xl text-blue-950 bold">{t("All Products")}</h1>
        <div>
          <ul className=" p-2">
            {allProducts &&
              allProducts.map((product: any) => (
                <li
                  key={product.productID}
                  className="  border-b-4 border-blue-900 my-2 cursor-pointer flex flex-col"
                  onClick={() => setProductIDValue(product.productID)}
                >
                  <div className="flex flex-row w-full justify-between items-center">
                    <h1 className=" text-xl">{product.name}</h1>{" "}
                    <button
                      onClick={() => {
                        handleDeleteProduct(product.productID);
                      }}
                    >
                      <Image
                        src={"/delete.svg"}
                        alt={"delete"}
                        width={32}
                        height={32}
                      />
                    </button>
                  </div>
                  <form
                    onSubmit={onPhotoSubmit}
                    className="flex flex-row w-full justify-between items-center"
                  >
                    <label className=" flex flex-col w-1/2">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="py-2 text-sm sm:text-lg"
                        onChangeCapture={() =>
                          setProductIDValue(product.productID)
                        }
                      />
                      <input
                        type="submit"
                        value={t("Add")}
                        className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                      />
                    </label>
                    <div
                      className="bg-white w-16 h-16  category-image"
                      style={{
                        backgroundImage: `url(${
                          productImages[product.productID]
                        })`,
                      }}
                    ></div>
                  </form>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
