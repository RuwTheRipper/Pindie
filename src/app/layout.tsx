import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Footer from "@/app/components/include/footer/Footer";
import Header from "@/app/components/include/header/Header";

export const metadata: Metadata = {
  title: 'Pindie',
  description: 'Портал инди-игр от студентов Яндекс Практикума',
};

export default function RootLayout({children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="ru">
    <body>
      <Header />

      {children}

      <Footer />

    </body>
    </html>
  );
}
