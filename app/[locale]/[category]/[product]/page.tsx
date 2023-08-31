// "use client";

// import { useTranslations } from "next-intl";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// export default function Page() {
//   const params = useParams();
//   const [categoryInfo, setCategoryInfo] = useState<any>([]);
//   const [currentPath, setCurrentPath] = useState<string>("");
//   const [productImage, setProductImage] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProductImage = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/products/getFile/1693836473206modular.png`
//         );
//         const blob = await response.blob();
//         const objectUrl = URL.createObjectURL(blob);
//         setProductImage(objectUrl);
//       } catch (error) {
//         console.error("Error Fetching Image", error);
//       }
//     };
//     fetchProductImage();
//   }, []);

//   useEffect(() => {
//     const fetchCategoryInfo = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/products/${params.product}`
//         );
//         const data = await response.json();
//         setCategoryInfo(data);
//       } catch (error) {
//         console.error("Error fetching category info:", error);
//       }
//     };
//     fetchCategoryInfo();
//     // Get the current URL path
//     const path = window.location.pathname;
//     setCurrentPath(path);
//   }, []);

//   console.log("categoryInfo:", categoryInfo);
//   // console.log("params:", params);
//   // console.log("currentpath:", currentPath);

//   const t = useTranslations<any>(params.category);
//   // console.log("language:", t);

//   return (
//     <div className="  pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
//       {/* <div className=" text-xs sm:text-sm   text-gray-500">
//         <Link href="/" passHref>
//           {t(params.category)}
//         </Link>
//         /
//         <Link href={`${currentPath}/${params.category}`} passHref>
//           {t(params.category)}
//         </Link>
//       </div> */}

//       {/* <div className="mt-8">
//         <nav>
//           <ul className="flex justify-start gap-2">
//             {categoryInfo.map((menuItem: any) => (
//               <li className="li-vrf" key={menuItem.option}>
//                 {t(menuItem.option)}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div> */}

//       <div className=" w-full flex  flex-wrap">
//         {!categoryInfo && <div>Loading...</div>}
//         <ul className=" w-full flex flex-row">
//           {categoryInfo.map((item: any) => (
//             <li
//               key={item.productID}
//               className="  p-2 flex flex-col w-1/2 sm:w-1/3 md:w-1/4"
//             >
//               <Link href={`${currentPath}/${item.productID}`}>
//                 <div
//                   className="bg-white w-full h-40 sm:h-60  rounded-lg category-image"
//                   style={{ backgroundImage: `url(${productImage})` }}
//                 ></div>
//                 <h1 className="mt-2"> {t(item.name)}</h1>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>

//     // <div>{categoryInfo}</div>
//   );
// }

"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [categoryInfo, setCategoryInfo] = useState<any>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [productImages, setProductImages] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const images: { [key: string]: string } = {};
        for (const item of categoryInfo) {
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
  }, [categoryInfo]);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${params.product}`
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

  console.log("categoryInfo:", categoryInfo);
  // console.log("params:", params);
  // console.log("currentpath:", currentPath);

  const t = useTranslations<any>(params.category);
  // console.log("language:", t);

  return (
    <div className="  pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <div className=" w-full flex  flex-wrap">
        {!categoryInfo && <div>Loading...</div>}
        <ul className=" w-full flex flex-row">
          {categoryInfo.map((item: any) => (
            <li
              key={item.productID}
              className="  p-2 flex flex-col w-1/2 sm:w-1/3 md:w-1/4"
            >
              <Link href={`${currentPath}/${item.productID}`}>
                <div
                  className="bg-white w-full h-40 sm:h-60  rounded-lg category-image"
                  style={{
                    backgroundImage: `url(${productImages[item.productID]})`,
                  }}
                ></div>
                <h1 className="mt-2"> {t(item.name)}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
