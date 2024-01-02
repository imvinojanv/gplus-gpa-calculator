import { Button } from "@/components/ui/button";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full w-full">
            <div className='bg-grid'/>
            <div className="z-10">
                {children} 
            </div>
        </main>
    )
}

export default HomeLayout;