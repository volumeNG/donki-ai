import { Inter } from "next/font/google";

import Providers from "@/components/shared/providers";
import Head from "next/head";

import "./globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                {/* Optionally, add fallback or default meta tags if a page does not specify them */}
            </Head>
            <body className={`${inter.className} antialiased bg-white dark:bg-[#121212]`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
                    <Providers>{children}</Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
