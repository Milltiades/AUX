import Consultation from "@/components/Consultation";
import Cover from "@/components/Cover";
import Lang from "@/components/Lang";
import OurWork from "@/components/OurWork";
import Toast from "@/components/Toast";

import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

export default function Home() {
  return (
    <main className="flex-grow min-h-custom ">
      <Lang />
      <Cover />

      <Consultation />
      <OurWork />
      <Toast />
    </main>
  );
}
