"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider, useWalletContext } from "@coinbase/waas-sdk-web-react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider
    verbose
      enableHostedBackups={true}
      collectAndReportMetrics
      prod={false}
      projectId={"a6ff9b4c-9586-4920-a38f-6a77bf39a375"}
    >
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </WalletProvider>
  );
}
