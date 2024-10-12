import TextAnimation from "@/components/shared/TextAnimation";
import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <TextAnimation className="text-5xl font-bold" text="404" />
      <h1 className="text-lg">Page not found</h1>
      <h2 className="text-foreground">
        The page you are looking for does not exist.
      </h2>
      <Link href={"/"}>
        <Button>Home page</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
