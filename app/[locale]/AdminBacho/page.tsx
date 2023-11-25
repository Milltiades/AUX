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
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

  const [VRFProducts, setVRFProducts] = useState<any>();
  const [chillerProducts, setChillerProducts] = useState<any>();
  const [multiProducts, setMultiProducts] = useState<any>();
  const [lightProducts, setLightProducts] = useState<any>();

  useEffect(() => {
    const FetchAllProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/list/products`
        );
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data);
          const VRFProductsFiltered = data.filter(
            (item: any) =>
              item.productCategoryID == "cda5482f-24e0-4239-abce-cc6e208ebfde"
          );
          setVRFProducts(VRFProductsFiltered);
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

  const handleEditProduct = async (productID: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/update/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
          }),
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");
        alert("Product Edited");
        window.location.reload();
        // You might want to update your list of products here.
      } else {
        console.error("Failed to edit product:", response.statusText);
        // Handle error case here.
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const t = useTranslations("Admin");
  const v = useTranslations("Navbar");
  const p = useTranslations("Navbar Items");

  // console.log("productImages:", productImages);
  // console.log("allProducts: ", allProducts);

  useEffect(() => {
    // console.log("All Products: ", allProducts);

    if (allProducts.length > 0) {
      const VRFProductsFiltered = allProducts.filter(
        (item: any) =>
          item.productCategoryID === "6f4f3fa0-adb9-45f4-80b9-cc3ead6d1ac6" ||
          item.productCategoryID === "6287cc78-c860-41a3-b005-1bcd018a1002" ||
          item.productCategoryID === "f7b4eb76-d7d9-4292-847b-ff843afc7aa3" ||
          item.productCategoryID === "987941c9-1c34-4132-840d-ada6a41c68b1" ||
          item.productCategoryID === "063dcd47-223d-47c9-bcc4-e6f17c089d52" ||
          item.productCategoryID === "468f7f94-279f-4162-b3e5-33965950093c" ||
          item.productCategoryID === "54199b05-3223-44cb-b459-a4ba5b7f23f9" ||
          item.productCategoryID === "50425952-8c69-4d6f-9c79-0549b503019d"
      );
      setVRFProducts(VRFProductsFiltered);
      console.log("Filtered VRF Products: ", VRFProductsFiltered);
      const chillerProductsFiltered = allProducts.filter(
        (item: any) =>
          item.productCategoryID === "4f184db9-6135-42b9-b36d-d488255992b6" ||
          item.productCategoryID === "f6354d9c-8cbc-4dde-a876-a479befa1da0" ||
          item.productCategoryID === "92ff7714-2d2f-4f14-8f9d-72a94256e51f" ||
          item.productCategoryID === "66aa469d-8473-4403-b9d0-6d9bbfb24f81" ||
          item.productCategoryID === "9cff2de3-202d-4d07-ac3e-49f29b15e73e"
      );
      setChillerProducts(chillerProductsFiltered);
      console.log("Filtered Chiller products: ", chillerProductsFiltered);
      const multiProductsFiltered = allProducts.filter(
        (item: any) =>
          item.productCategoryID === "4483e6ba-eeff-4512-8e05-7b30262ab72a" ||
          item.productCategoryID === "c066e61a-2c39-4e28-9ef2-69471c746cff" ||
          item.productCategoryID === "a161fba8-3aa1-49f8-826b-c806edf42156" ||
          item.productCategoryID === "b190f3d1-54cb-4378-b86d-e3fae6a1a1d4" ||
          item.productCategoryID === "03b472c1-b330-4672-b763-0aeb78667d66"
      );
      setMultiProducts(multiProductsFiltered);
      console.log("Filtered Multi-Split products: ", multiProducts);

      const lightProductsFiltered = allProducts.filter(
        (item: any) =>
          item.productCategoryID === "9a22f2fb-246d-4420-8566-37c45b2a8536" ||
          item.productCategoryID === "863db8fe-bc81-40b3-9fdb-af0fcd4010ae" ||
          item.productCategoryID === "242fe2da-d122-4953-aeed-2d3ead926cd8" ||
          item.productCategoryID === "f83df62d-e283-4730-8587-f6a749affd5d"
      );
      setLightProducts(lightProductsFiltered);
      console.log("Filtered Light Commercial products: ", lightProducts);
    }
  }, [allProducts]);

  return (
    <div className="flex flex-col p-5 min-h-custom md:px-40 md:py-20 ">
      <div className="flex flex-col sm:flex-row ">
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
      {/* <div className="mt-5 pt-2 border-t-4 border-blue-900">
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
                    <h1 className=" text-xl w-2/3">{product.name}</h1>{" "}
                    {editStates[product.productID] ? (
                      <form action="" className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Name"
                          className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Description"
                          className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                          type="submit"
                          value="edit"
                          className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                          onClick={() => handleEditProduct(product.productID)}
                        />
                      </form>
                    ) : null}
                    <div className="flex flex-row gap-3">
                      <button
                        onClick={() =>
                          setEditStates((prevState) => ({
                            ...prevState,
                            [product.productID]: !prevState[product.productID],
                          }))
                        }
                      >
                        <Image
                          src={"/edit.svg"}
                          alt={"edit"}
                          width={32}
                          height={32}
                        />
                      </button>
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
      </div> */}
      <div className="sm:flex sm:flex-col lg:flex-row w-full ">
        <div className=" border-2 lg:p-2 border-blue-900 lg:w-1/2 mt-5 pt-2 ">
          <h1 className=" bg-blue-200 border-y-4 border-blue-900 text-2xl text-blue-950 bold">
            VRF Products
          </h1>
          <div>
            <ul className=" p-2">
              {VRFProducts &&
                VRFProducts.map((product: any) => (
                  <li
                    key={product.productID}
                    className="  border-b-4 border-blue-900 my-2 cursor-pointer flex flex-col"
                    onClick={() => setProductIDValue(product.productID)}
                  >
                    <div className="flex flex-row w-full justify-between items-center">
                      <h1 className=" text-xl w-2/3">{product.name}</h1>{" "}
                      {editStates[product.productID] ? (
                        <form action="" className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <input
                            type="submit"
                            value="edit"
                            className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                            onClick={() => handleEditProduct(product.productID)}
                          />
                        </form>
                      ) : null}
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() =>
                            setEditStates((prevState) => ({
                              ...prevState,
                              [product.productID]:
                                !prevState[product.productID],
                            }))
                          }
                        >
                          <Image
                            src={"/edit.svg"}
                            alt={"edit"}
                            width={32}
                            height={32}
                          />
                        </button>
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
                    </div>
                    <form
                      onSubmit={onPhotoSubmit}
                      className="flex flex-row w-full justify-between items-center"
                    >
                      <label className=" flex flex-col w-1/2">
                        Add Main Photo
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

                    <div className=" border-2 border-blue-400 bg-blue-200 p-2">
                      <h4 className=" font-bold text-blue-950 text-base">
                        Add product detail images
                      </h4>
                      <form action="">
                        <label htmlFor="">
                          <input type="file" />
                          <input
                            type="submit"
                            value={"Add detail Photos"}
                            className="rounded-xl px-4 py-2 bg-blue-700 text-white mt-2 cursor-pointer "
                          />
                        </label>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" border-2 lg:p-2 border-blue-900 lg:w-1/2 mt-5 pt-2 ">
          <h1 className="bg-blue-200 border-y-4 border-blue-900 text-2xl text-blue-950 bold">
            Chiller & FCU Products
          </h1>
          <div>
            <ul className=" p-2">
              {chillerProducts &&
                chillerProducts.map((product: any) => (
                  <li
                    key={product.productID}
                    className="  border-b-4 border-blue-900 my-2 cursor-pointer flex flex-col"
                    onClick={() => setProductIDValue(product.productID)}
                  >
                    <div className="flex flex-row w-full justify-between items-center">
                      <h1 className=" text-xl w-2/3">{product.name}</h1>{" "}
                      {editStates[product.productID] ? (
                        <form action="" className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <input
                            type="submit"
                            value="edit"
                            className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                            onClick={() => handleEditProduct(product.productID)}
                          />
                        </form>
                      ) : null}
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() =>
                            setEditStates((prevState) => ({
                              ...prevState,
                              [product.productID]:
                                !prevState[product.productID],
                            }))
                          }
                        >
                          <Image
                            src={"/edit.svg"}
                            alt={"edit"}
                            width={32}
                            height={32}
                          />
                        </button>
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
                    </div>
                    <form
                      onSubmit={onPhotoSubmit}
                      className="flex flex-row w-full justify-between items-center"
                    >
                      <label className=" flex flex-col w-1/2">
                        Add Main Photo
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

                    <div className=" border-2 border-blue-400 bg-blue-200 p-2">
                      <h4 className=" font-bold text-blue-950 text-base">
                        Add product detail images
                      </h4>
                      <form action="">
                        <label htmlFor="">
                          <input type="file" />
                          <input
                            type="submit"
                            value={"Add detail Photos"}
                            className="rounded-xl px-4 py-2 bg-blue-700 text-white mt-2 cursor-pointer "
                          />
                        </label>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" border-2 lg:p-2 border-blue-900 lg:w-1/2 mt-5 pt-2 ">
          <h1 className="bg-blue-200 border-y-4 border-blue-900 text-2xl text-blue-950 bold">
            Multi-Split Products
          </h1>
          <div>
            <ul className=" p-2">
              {multiProducts &&
                multiProducts.map((product: any) => (
                  <li
                    key={product.productID}
                    className="  border-b-4 border-blue-900 my-2 cursor-pointer flex flex-col"
                    onClick={() => setProductIDValue(product.productID)}
                  >
                    <div className="flex flex-row w-full justify-between items-center">
                      <h1 className=" text-xl w-2/3">{product.name}</h1>{" "}
                      {editStates[product.productID] ? (
                        <form action="" className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <input
                            type="submit"
                            value="edit"
                            className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                            onClick={() => handleEditProduct(product.productID)}
                          />
                        </form>
                      ) : null}
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() =>
                            setEditStates((prevState) => ({
                              ...prevState,
                              [product.productID]:
                                !prevState[product.productID],
                            }))
                          }
                        >
                          <Image
                            src={"/edit.svg"}
                            alt={"edit"}
                            width={32}
                            height={32}
                          />
                        </button>
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
                    </div>
                    <form
                      onSubmit={onPhotoSubmit}
                      className="flex flex-row w-full justify-between items-center"
                    >
                      <label className=" flex flex-col w-1/2">
                        Add Main Photo
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

                    <div className=" border-2 border-blue-400 bg-blue-200 p-2">
                      <h4 className=" font-bold text-blue-950 text-base">
                        Add product detail images
                      </h4>
                      <form action="">
                        <label htmlFor="">
                          <input type="file" />
                          <input
                            type="submit"
                            value={"Add detail Photos"}
                            className="rounded-xl px-4 py-2 bg-blue-700 text-white mt-2 cursor-pointer "
                          />
                        </label>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" border-2 lg:p-2 border-blue-900 lg:w-1/2 mt-5 pt-2 ">
          <h1 className="bg-blue-200 border-y-4 border-blue-900 text-2xl text-blue-950 bold">
            Light Commercial Products
          </h1>
          <div>
            <ul className=" p-2">
              {lightProducts &&
                lightProducts.map((product: any) => (
                  <li
                    key={product.productID}
                    className="  border-b-4 border-blue-900 my-2 cursor-pointer flex flex-col"
                    onClick={() => setProductIDValue(product.productID)}
                  >
                    <div className="flex flex-row w-full justify-between items-center">
                      <h1 className=" text-xl w-2/3">{product.name}</h1>{" "}
                      {editStates[product.productID] ? (
                        <form action="" className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            className="h-8 bg-transparent border-b-2 border-blue-900 focus:border-blue-900 text-blue-900 hover:border-blue-900 text-sm sm:text-lg md:text-xl"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <input
                            type="submit"
                            value="edit"
                            className="bg-blue-900 text-white rounded-xl p-2 w-32  md:w-40 hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-lg mb-2 cursor-pointer"
                            onClick={() => handleEditProduct(product.productID)}
                          />
                        </form>
                      ) : null}
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() =>
                            setEditStates((prevState) => ({
                              ...prevState,
                              [product.productID]:
                                !prevState[product.productID],
                            }))
                          }
                        >
                          <Image
                            src={"/edit.svg"}
                            alt={"edit"}
                            width={32}
                            height={32}
                          />
                        </button>
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
                    </div>
                    <form
                      onSubmit={onPhotoSubmit}
                      className="flex flex-row w-full justify-between items-center"
                    >
                      <label className=" flex flex-col w-1/2">
                        Add Main Photo
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

                    <div className=" border-2 border-blue-400 bg-blue-200 p-2">
                      <h4 className=" font-bold text-blue-950 text-base">
                        Add product detail images
                      </h4>
                      <form action="">
                        <label htmlFor="">
                          <input type="file" />
                          <input
                            type="submit"
                            value={"Add detail Photos"}
                            className="rounded-xl px-4 py-2 bg-blue-700 text-white mt-2 cursor-pointer "
                          />
                        </label>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
