import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OutfitProvider } from "./components/SavedContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outfit Builder",
  description: "WYSIWYG clothing editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <OutfitProvider>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
            />
          </OutfitProvider>
        </CartProvider>
      </body>
    </html>
  );
}
