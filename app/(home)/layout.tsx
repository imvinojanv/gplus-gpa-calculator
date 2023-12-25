const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className="min-h-screen w-full overflow-auto hero-elements">
                <div className="mx-auto max-w-screen-xl">
                    {children}
                </div>
            </main>
        </>
    )
}

export default HomeLayout;