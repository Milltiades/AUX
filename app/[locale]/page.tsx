

import Consultation from "@/components/Consultation";
import Lang from "@/components/Lang";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";




export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

export default function Home() {

 
  return (
   
    <main className="flex-grow px-0 min-h-custom sm:px-5 lg:px-48 xl:px-56 2xl:px-60 py-8 md:py-12 lg:py-16 " >
     <Lang/>
      <Consultation />
      <Link href="/Admin">Admin Panel</Link>
      
     
    </main>
    
  );
}
