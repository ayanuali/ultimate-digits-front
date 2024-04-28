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
      projectId={"0f9bcc25-9ab2-42b5-90d2-122588e83383"}
    >
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </WalletProvider>
  );
}
