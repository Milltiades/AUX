// import Header from "@/components/Header";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import Lang from "@/components/Lang";
// import { useLocale } from "next-intl";
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";

// import enMessages from "../../messages/en.json"
// import kaMessages from "../../messages/ka.json"

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AUX",
//   description: "AUX app",
// };

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "ka" }];
// }

// export default async function RootLayout({
//   children,
//   params,
// }: {
//   children: any;
//   params: any;
// }) {
  
//   const locale = useLocale();

//   // Show a 404 error if the user requests an unknown locale
//   if (params.locale !== locale) {
//     notFound();
//   }
//   return (
//     <html lang={locale}>
//       <body className={inter.className}>
//         <NextIntlClientProvider locale={locale} messages={{ en: enMessages, ka: kaMessages }}>
//           <Header />
//           <Navbar />
//           <Lang />
//           {children}
//           <Footer />
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }






import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Lang from "@/components/Lang";
import { useLocale, useMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Test from "@/components/Navbar";

// import enMessages from "../../messages/en.json"
// import kaMessages from "../../messages/ka.json"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ka" }];
}

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
          {/* <Navbar /> */}
          {/* <Lang /> */}
          <Test/>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}