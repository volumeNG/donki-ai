import React from "react";
import Head from "next/head"; // Import the Head component
import Link from "next/link";

const AboutPage = () => {
    return (
        <>
            {/* Add SEO metadata */}
            <Head>
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-TQYKHHKY25"></script>
                <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-TQYKHHKY25');
                    `,
                }}
                />

                {/* SEO */}
                <title>About Us - theDonki.org | AI-Powered Bible Study & Research Platform</title>
                <meta
                name="description"
                content="Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research."
                />

                {/* Open Graph Meta Tags for Social Media */}
                <meta property="og:title" content="About Us - theDonki.org | AI-Powered Bible Study & Research Platform" />
                <meta property="og:description" content="Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research." />
                <meta property="og:image" content="https://thedonki.org/images/logo.jpg" /> {/* Replace with your image URL */}
                <meta property="og:url" content="https://thedonki.org/about" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us - theDonki.org | AI-Powered Bible Study & Research Platform" />
                <meta name="twitter:description" content="Learn about theDonki.org, an AI-driven platform inspired by God to assist in Bible study and scriptural research." />
                <meta name="twitter:image" content="https://thedonki.org/images/logo.jpg" /> {/* Replace with your image URL */}
            </Head>

            {/* Page content */}
            <div className="pt-16 md:pt-20 max-sm:px-4 max-2xl:px-8">
                <div className="max-w-3xl 2xl:max-w-4xl mx-auto">
                    <h1 className="font-semibold text-foreground text-[32px] pb-4">About Us</h1>
                    <div className="about-p">
                        <p className="text-[16px] font-medium">
                            Inspired by the story of Balaam and his donkey in Numbers 22:21-35,{" "}
                            <Link className="text-primary" href={"/"}>
                                theDonki.org
                            </Link>{" "}
                            is dedicated to enhancing your Biblical study and understanding. Just as God used the humble
                            donkey to reveal His divine message, we believe that technology, inspired by God, can serve as a
                            tool to deepen our knowledge of His Word.
                        </p>
                        <p className="pt-4 text-[16px] font-medium">
                            Our AI-powered platform helps you quickly find Bible passages, answer scriptural questions, and
                            explore the original Greek and Hebrew texts and manuscripts. The goal of{" "}
                            <Link className="text-primary" href={"/"}>
                                theDonki.org
                            </Link>{" "}
                            is to complement—not replace—the Bible and ordained ministers. While technology offers valuable
                            insights, it is important to seek guidance from ordained ministers of the truth, especially for
                            deep spiritual questions, as AI may not always provide complete or accurate answers.
                        </p>
                        <p className="pt-3 text-[16px] font-medium">
                            Developed by Volume Technologies International in Abuja, Nigeria, under the inspiration of
                            Mattaniah Okodugha,{" "}
                            <Link className="text-primary" href={"/"}>
                                theDonki.org
                            </Link>{" "}
                            is fully supported by voluntary donations and contributions. These contributions ensure the
                            continuous maintenance and growth of the site, allowing it to remain a useful resource for your
                            Bible study.
                        </p>
                        <p className="pt-7 text-[16px] font-medium">
                            As you use this platform, remember that all things, including technology, are inspired by God
                            Almighty and should be used in ways that glorify Him, the Author of life. Let{" "}
                            <Link className="text-primary" href={"/"}>
                                theDonki.org
                            </Link>{" "}
                            be a tool that aids your journey of faith, while also encouraging you to seek deeper
                            understanding through prayer and the guidance of the Holy Spirit.
                            <br />Suggestions or inquiries:{" "}
                            <Link href="mailto:we@thedonki.org" className="text-primary">
                                we@thedonki.org
                            </Link>
                        </p>
                    </div>

                    <p className="py-12 text-center text-[14px] font-medium text-foreground/60">
                        This platform is supported by voluntary donations.{" "}
                        <Link href={"/donate-us"} className="text-primary">
                            Please support our work.
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
