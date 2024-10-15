import { Inter } from "next/font/google";
import Head from "next/head";

import Providers from "@/components/shared/providers";

import "./globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});
export const metadata = {
    title: "theDonki.org - AI-Powered Bible Study & Research",
    description:
        "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research. Search Bible passages, get answers, and explore Greek and Hebrew texts.",
    openGraph: {
        title: "theDonki.org - AI-Powered Bible Study & Research",
        description:
            "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research.",
        url: "https://thedonki.org/",
        images: [
            {
                url: "https://thedonki.org/images/logo.jpg",
                alt: "theDonki.org Logo",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "theDonki.org - AI-Powered Bible Study & Research",
        description:
            "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research.",
        images: ["https://thedonki.org/images/logo.jpg"],
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased bg-white dark:bg-[#121212]`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
