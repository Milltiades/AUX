"use client";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const t = useTranslations("Test");
  const notify = toast(`🛠️ ${t("message")}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  useEffect(() => {
    const foo = () => {
      notify;
    };
    foo();
  }, []);

  return <div></div>;
}
