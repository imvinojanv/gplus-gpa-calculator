import type { Metadata } from 'next'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Auth - G Plus: Academic Performance Tracker'
}

const AuthLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center md:items-start">
            <Link
                href="/"
                className="flex items-center text-md font-medium opacity-75 hover:opacity-100 transition -mt-6 mb-6 pl-0 md:pl-20"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to home
            </Link>
            <div className="h-full w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;