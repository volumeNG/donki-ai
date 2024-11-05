"use client";

import { useRouter } from "next/navigation";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA, { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import useAppCaptcha from "@/hooks/useAppCaptcha";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import AppFormInput from "../ui/AppFormInput";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
});

const SignInForm = () => {
    const { handleReCaptchaVerify } = useAppCaptcha();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [loginUser, { isLoading }] = useLoginMutation();

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // if (!executeRecaptcha) {
        //     console.log("Execute recaptcha not yet available");
        //     return;
        // }
        const token = await handleReCaptchaVerify();
        console.log({ token }, "dfdfdfd");
        await loginUser({ ...values, token: token })
            .unwrap()
            .then((res) => {
                toast.success(res?.message || "Log in successful ✅.");
                dispatch(userLoggedIn({ accessToken: res.data.accessToken }));
                router.push("/dashboard");
            })
            .catch((res) => {
                console.log(res);
                toast.error(res?.data?.message || res?.error || "something went wrong");
            });
    };

    return (
        <div className="bg-secondary p-7 rounded-xl lg:w-1/2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-background rounded-xl py-8 px-6 grid gap-4">
                    <h1 className="text-2xl font-semibold">Sign In</h1>

                    <AppFormInput
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        label="Email"
                        formControl={form.control}
                    />

                    <AppFormInput
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="********"
                        formControl={form.control}
                    />

                    <Button disabled={isLoading} className="w-full mt-4 p-5" type="submit">
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignInForm;
