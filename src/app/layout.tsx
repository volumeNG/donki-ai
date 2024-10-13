import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/components/shared/providers";

import "./globals.css";

import Head from "next/head";

import { ThemeProvider } from "@/components/shared/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
    title: "theDonki.org - AI-Powered Bible Study & Scriptural Research",
    description: `Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research. Search Bible passages, get answers, and explore Greek and Hebrew texts. Powered by technology to enhance your understanding of God’s Word.`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            </Head>
            <body className={`${inter.className} antialiased bg-white dark:bg-[#121212]`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
