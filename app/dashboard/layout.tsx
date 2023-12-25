import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-screen">
            <div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:ml-60 h-full lg:py-[8px] lg:pr-[8px]">
                <section className="h-full md:border-2 lg:rounded-md bg-color-gray">
                    <Navbar />
                    {children}
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout;