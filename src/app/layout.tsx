import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Navbar from "@/shared/components/Navbar/Navbar";
import Footer from "@/shared/components/Footer/Footer";

const brSonoma = localFont({
  src: [
    {
      path: "../../public/fonts/BRSonoma-Regular-BF654c45266c042.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Medium-BF654c45266edd1.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-SemiBold-BF654c45268c340.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/BRSonoma-Bold-BF654c4526823f5.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-br-sonoma",
});

export const metadata: Metadata = {
  title: "Seguro Salud Flexible",
  description: "Cotiza tu seguro de salud de manera fácil y rápida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={brSonoma.variable}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Navbar />
        <main
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
