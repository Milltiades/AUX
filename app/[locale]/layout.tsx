

import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono  } from "next/font/google";

import Footer from "@/components/Footer";
// import Lang from "@/components/Lang";
import { useLocale, useMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Head from "next/head";




const inter = Inter({ subsets: ["latin"] });

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// })


 
// const roboto_mono = Roboto_Mono({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto-mono',
// })


export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "ka" }];
// }

export default function RootLayout({


  children,
  params,
}: {
  children: any;
  params: any;
}) {
  
  const messages = useMessages()
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }



  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
