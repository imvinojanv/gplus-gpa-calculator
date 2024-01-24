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
        <div className="min-h-screen flex flex-col justify-center">
            <div className="h-full w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;