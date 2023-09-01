import Link from "next-intl/link";
import React from "react";

export default function Lang() {
  return (
    <div className=" flex justify-end items-end right-5 mt-2 absolute text-white">
      <Link href="/" locale="en">
        EN
      </Link>{" "}
      |{" "}
      <Link href="/" locale="ka">
        GE
      </Link>
    </div>
  );
}
