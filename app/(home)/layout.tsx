const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full overflow-auto">
            <div className="mx-auto max-w-screen-xl">
                {children}
            </div>
        </main>
    )
}

export default HomeLayout;