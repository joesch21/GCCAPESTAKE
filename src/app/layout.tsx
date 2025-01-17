import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import { ThirdwebProvider } from "@/app/thirdweb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BNB-GCC Staking",
  description: "Stake your BNB-GCC tokens and earn rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className}`}>
        <ThirdwebProvider>
          <div className="app-container">{children}</div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
