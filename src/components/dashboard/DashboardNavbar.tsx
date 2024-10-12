import Logo from "../shared/Logo";
import ThemeSwitcher from "../shared/ThemeSwitcher";
import { DonkiLogo } from "../ui/donki-logo";

const DashboardNavbar = () => {
    return (
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-7">
            <Logo />
            <div className="flex items-center gap-2 md:gap-5">
                <ThemeSwitcher />
                <div className="flex items-center gap-1 md:gap-2">
                    <DonkiLogo />

                    <div className="">
                        <h3 className="max-sm:text-xs font-medium">Bridget S.</h3>
                        <p className="text-xs md:text-sm text-foreground/50">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
