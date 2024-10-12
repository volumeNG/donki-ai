import Link from "next/link";

const page = () => {
    return (
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
                        understanding through prayer and the guidance of Holy Spirit.
                    </p>
                </div>

                <p className="py-12 text-center text-[14px] font-medium text-foreground/60">
                    This platform is supported by voluntary donations.{" "}
                    <Link href={"/donate-us"} className="text-primary">
                        Please support our work.
                    </Link>
                    <br />
                    <br />
                    Reach out to us via email {" "}
                    <Link href="mailto:we@thedonki.org" className="text-primary">
                        we@thedonki.org
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default page;
