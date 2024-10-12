import Image from "next/image";

import login from "@/assets/image/login.png";

import SignInForm from "@/components/auth/SignInForm";

const page = () => {
    return (
        <div className="grid md:grid-cols-2">
            <Image src={login} className="h-screen w-full max-lg:hidden" alt="donki image" />
            <div className="flex h-screen items-center justify-center">
                <SignInForm />
            </div>
        </div>
    );
};

export default page;
