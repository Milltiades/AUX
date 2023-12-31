"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Gallery");

  return (
    <div className="pt-8 pb-16 flex flex-col px-5 sm:px-5 lg:px-48 xl:px-56 2xl:px-60 min-h-custom">
      <h1 className="mb-2">{t("Works")} </h1>

      <div className="flex flex-row w-full gap-5">
        <div>
          <LightGallery speed={500} plugins={[lgThumbnail]}>
            <Link href="/assets/mindeli/mindeli.jpg">
              <Image
                alt="mindeli"
                src="/assets/mindeli/mindeli.jpg"
                width={150}
                height={150}
              />
            </Link>
            {/* <Link href="/assets/mindeli/mind1[1376].jpg" className=" hidden">
              <img alt="Mindeli1" src="/assets/mindeli/mind1[1376].jpg" />
            </Link>
            <Link href="/assets/mindeli/mind2[1372].jpg" className=" hidden">
              <img alt="Mindeli2" src="/assets/mindeli/mind2[1372].jpg" />
            </Link>
            <Link href="/assets/mindeli/mind3[1373].jpg" className=" hidden">
              <img alt="Mindeli3" src="/assets/mindeli/mind3[1373].jpg" />
            </Link>
            <Link href="/assets/mindeli/mind4[1375].jpg" className=" hidden">
              <img alt="Mindeli4" src="/assets/mindeli/mind4[1375].jpg" />
            </Link>
            <Link href="/assets/mindeli/mind5[1374].jpg" className=" hidden">
              <img alt="Mindeli5" src="/assets/mindeli/mind5[1374].jpg" />
            </Link> */}

            <Link href="/assets/mindeli/mind1[1376].jpg" className=" hidden">
              <Image
                alt="Mindeli1"
                src="/assets/mindeli/mind1[1376].jpg"
                width={150}
                height={150}
              />
            </Link>
            <Link href="/assets/mindeli/mind2[1372].jpg" className=" hidden">
              <Image
                alt="Mindeli2"
                src="/assets/mindeli/mind2[1372].jpg"
                width={150}
                height={150}
              />
            </Link>
            <Link href="/assets/mindeli/mind3[1373].jpg" className=" hidden">
              <Image
                alt="Mindeli3"
                src="/assets/mindeli/mind3[1373].jpg"
                width={150}
                height={150}
              />
            </Link>
            <Link href="/assets/mindeli/mind4[1375].jpg" className=" hidden">
              <Image
                alt="Mindeli4"
                src="/assets/mindeli/mind4[1375].jpg"
                width={150}
                height={150}
              />
            </Link>
            <Link href="/assets/mindeli/mind5[1374].jpg" className=" hidden">
              <Image
                alt="Mindeli5"
                src="/assets/mindeli/mind5[1374].jpg"
                width={150}
                height={150}
              />
            </Link>
          </LightGallery>
        </div>
      </div>
    </div>
  );
}
