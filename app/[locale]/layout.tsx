import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

import Footer from "@/components/Footer";

import { useLocale, useMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Toast from "@/components/Toast";

// const inter = Inter({ subsets: ["latin"] });

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "AUX",
  description: "AUX app",
};

export default function RootLayout({
  children,
  params,
}: {
  children: any;
  params: any;
}) {
  const messages = useMessages();
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.web-fonts.ge/fonts/alk-sanet/css/alk-sanet.min.css"
        />
      </Head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <Navbar />
          {children}
          <Footer />
          <Toast />
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
