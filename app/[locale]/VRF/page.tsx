// import { NavItems } from "@/constants";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React from "react";

// export default function page() {
//   const t = useTranslations("VRF");

//   const desiredTitle = "VRF";
//   const filteredProducts = NavItems.filter(
//     (item) => item.title === desiredTitle
//   );

//   console.log(filteredProducts[0].menu);

//   return (
//     <div className=" md:px-40 pt-8 pb-16 flex flex-col px-5 min-h-custom">
//       <div className=" text-xl text-gray-500">
//         <Link className=" mr-1" href="/">
//           {t("Home")}
//         </Link>
//         /
//         <Link className=" mx-1" href="/VRF">
//           {t("Title")}
//         </Link>
//       </div>
//       <div className=" mt-8">
//         <nav>
//           {/* <ul className="flex justify-start gap-2">
//             <li className="li-vrf"> {t("Modular ODU")} </li>
//             <li className="li-vrf"> {t("Mini ODU")} </li>
//             <li className="li-vrf">{t("Cassette")}</li>
//             <li className="li-vrf">{t("Duct")}</li>
//             <li className="li-vrf">{t("Ceiling & Floor")}</li>
//             <li className="li-vrf">{t("Wall-mounted")}</li>
//             <li className="li-vrf">{t("Heat Recovery Ventilator")}</li>
//             <li className="li-vrf">{t("AHU - Kit")}</li>
//           </ul> */}
//           <ul className="flex justify-start gap-2">
//             {filteredProducts[0].menu.map((menuItem) => (
//               <li className="li-vrf" key={menuItem.option}>
//                 {t(menuItem.option)}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <h1 className="product-h1">VRF</h1>

//       <div>
//       <ul className="flex justify-start gap-2">
//             {filteredProducts[0].menu.map((menuItem) => (
//               <li className="li-vrf" key={menuItem.option}>
//                 {t(menuItem.option)}
//               </li>
//             ))}
//           </ul>
//       </div>
//     </div>
//   );
// }


// import { NavItems } from "@/constants";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";




// export default function VRFPage() {
//   const t = useTranslations("VRF");

//   // Find the "VRF" category in NavItems
//   const vrfCategory = NavItems.find(item => item.title === "VRF");

//   return (
//     <div className=" md:px-40 pt-8 pb-16 flex flex-col px-5 min-h-custom">
//       <div className=" text-xl text-gray-500">
//         <Link href="/">
//           {t("Home")}
//         </Link>
//         /
//         <Link href={vrfCategory.link}>
//           {t("Title")}
//         </Link>
//       </div>
//       <div className="mt-8">
//         <nav>
//           <ul className="flex justify-start gap-2">
//             {vrfCategory.menu.map(menuItem => (
//               <li className="li-vrf" key={menuItem.option}>
//                 {t(menuItem.option)}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <h1 className="product-h1">{t("Title")}</h1>
//       <div>
//         {/* Render product names */}
//         {vrfCategory.menu.map(menuItem => (
//           <div key={menuItem.option}>
//             {menuItem.product.map(productItem => (
//               <div key={productItem.name}>
//                 {t(productItem.name)}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { NavItems } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function VRFPage() {
  const t = useTranslations("VRF");

  // Find the "VRF" category in NavItems
  const vrfCategory = NavItems.find(item => item.title === "VRF");

  if (!vrfCategory) {
    return null; // Return early or render a loading/error component
  }

  return (
    <div className=" md:px-40 pt-8 pb-16 flex flex-col px-5 min-h-custom">
      <div className=" text-xl text-gray-500">
        <Link href="/" passHref>
          {t("Home")}
        </Link>
        /
        <Link href={vrfCategory.link} passHref>
          {t("Title")}
        </Link>
      </div>
      <div className="mt-8">
        <nav>
          <ul className="flex justify-start gap-2">
            {vrfCategory.menu.map(menuItem => (
              <li className="li-vrf" key={menuItem.option}>
                {t(menuItem.option)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <h1 className="product-h1">{t("Title")}</h1>
      <div>
        {/* Render product names */}
        {vrfCategory.menu.map((menuItem : any) => (
          <div key={menuItem.option}>
            {menuItem.product && menuItem.product.map((productItem : any) => (
              <div key={productItem.name} >
                <h1 className=" text-red-600">
                {t(productItem.name)}
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
