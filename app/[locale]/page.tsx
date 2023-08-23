

import Consultation from "@/components/Consultation";
import Lang from "@/components/Lang";

import { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

export default function Home() {

 
  return (
   
    <main className="flex flex-col min-h-custom bg-white lg:px-40 md:px-5 " >
     <Lang/>
      <Consultation />
      
     
    </main>
    
  );
}
