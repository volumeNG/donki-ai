import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import PrivateLayout from "@/components/shared/PrivetLayout";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <PrivateLayout>
            <DashboardNavbar />
            {children}
        </PrivateLayout>
    );
};

export default DashboardLayout;
