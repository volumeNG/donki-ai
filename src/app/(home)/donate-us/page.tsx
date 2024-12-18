import React from "react";
import Head from "next/head"; // Import the Head component
import Link from "next/link";
import Script from "next/script";

import { Button } from "@/components/ui/button";

const DonatePage = () => {
    return (
        <>
            {/* Structured Data */}
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "DonateAction",
                    "recipient": {
                        "@type": "Organization",
                        "name": "theDonki.org"
                    },
                    "actionStatus": "https://schema.org/ActiveActionStatus",
                    "target": "https://www.paypal.com/donate/?business=thedonki%40gmail.com&item_name=Donation&currency_code=USD",
                    "description": "Support theDonki.org to help us maintain our platform dedicated to Bible study and scriptural research."
                }
                `}
            </script>
            {/* Google Analytics */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TQYKHHKY25" />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-TQYKHHKY25');
                `}
            </Script>

            {/* Page content */}
            <div className="pt-16 md:pt-24 max-sm:px-4 max-2xl:px-8">
                <div className="max-w-3xl 2xl:max-w-4xl mx-auto">
                    <h1 className="font-semibold text-foreground text-[32px] pb-4">
                        How to Donate to{" "}
                        <Link className="text-primary" href={"/"}>
                            theDonki.org
                        </Link>
                    </h1>
                    <div className="donate-p">
                        <p className="text-[16px] font-medium">
                            Our mission is to make biblical knowledge accessible to everyone, empowering you to explore
                            the Scriptures and deepen your understanding through advanced AI technology.
                        </p>
                        <p className="pt-4 text-[16px] font-medium">
                            This platform thrives solely through the generosity of individuals who share our vision.
                            Your support is essential for maintaining the website and ensuring it remains available to
                            those seeking to grow in their faith and understanding of God’s Word.
                        </p>
                        <p className="pt-4 text-[16px] font-medium">
                            If you find{" "}
                            <Link className="text-primary" href={"/"}>
                                theDonki.org
                            </Link>{" "}
                            valuable in your studies or share our vision of spreading knowledge globally, we invite you
                            to consider making a donation. Every contribution, no matter the size, is crucial in keeping
                            this platform operational and expanding its features for all who seek to learn.
                        </p>
                        <p className="pt-4 text-[16px] font-medium">
                            We trust in God’s provision and are genuinely grateful for your willingness to support this
                            mission. Thank you for being part of our community as we strive to make the Word accessible
                            to everyone, everywhere.
                        </p>
                    </div>

                    <div className="pt-6">
                        <h2 className="font-semibold text-[32px]">How to Donate</h2>
                        <p className="pt-2 text-[16px] font-medium">
                            You can make a donation via email (please request our donation information) or through
                            PayPal. Your support enables us to continue this important work!
                        </p>
                        <div className="flex items-center justify-center gap-5 pt-5">
                            <Button size={"sm"}>
                                <Link href="mailto:we@thedonki.org">Send Email</Link>
                            </Button>
                            <Button size={"sm"}>
                                <Link href="#">
                                    Paystack
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <p className="py-12 text-center text-[14px] font-medium text-foreground/60">
                        Your support helps us keep this platform running.{" "}
                        <span className="text-primary">Thank you for your generosity!</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default DonatePage;
