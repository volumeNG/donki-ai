// app/donate-us/layout.tsx

import React from "react";

export const metadata = {
    title: "How to Donate to theDonki.org",
    description:
        "Support theDonki.org to help us maintain our platform dedicated to Bible study and scriptural research.",
    keywords: ["donate", "Bible study", "AI platform", "support", "theDonki.org", "scriptural research"],
    openGraph: {
        title: "How to Donate to theDonki.org",
        description:
            "Support theDonki.org to help us maintain our platform dedicated to Bible study and scriptural research.",
        url: "https://thedonki.org/donate-us",
        images: [
            {
                url: "https://thedonki.org/images/logo.png",
                alt: "theDonki.org Logo",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Donate to theDonki.org",
        description:
            "Support theDonki.org to help us maintain our platform dedicated to Bible study and scriptural research.",
        images: ["https://thedonki.org/images/logo.png"],
    },
    alternates: {
        canonical: "https://thedonki.org/donate-us",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
