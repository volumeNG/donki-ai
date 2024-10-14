// app/about-us/layout.tsx

import React from "react";

export const metadata = {
    title: "About Us - theDonki.org | AI-Powered Bible Study & Research Platform",
    description:
        "Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research.",
    keywords: ["about us", "theDonki.org", "Bible study", "AI platform", "scriptural research", "technology", "faith"],
    openGraph: {
        title: "About Us - theDonki.org | AI-Powered Bible Study & Research Platform",
        description:
            "Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research.",
        url: "https://thedonki.org/about-us",
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
        title: "About Us - theDonki.org | AI-Powered Bible Study & Research Platform",
        description:
            "Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research.",
        images: ["https://thedonki.org/images/logo.jpg"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
