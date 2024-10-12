const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className="h-screen">{children}</div>;
};

export default HomeLayout;
