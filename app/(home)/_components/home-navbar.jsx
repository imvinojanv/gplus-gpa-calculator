import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HomeNavbar = async () => {
    const isSignedIn = await currentUser();

    return (
        <nav className="container-padding py-6 bg-transparent flex items-center justify-between">
            <Image
                src='/logo.svg'
                alt="logo"
                width={100}
                height={100}
            />

            {isSignedIn ? (
                <div className="border-4 rounded-full">
                    <UserButton afterSignOutUrl="/" />
                </div>
            ): (
                <div className="flex items-center justify-center gap-4">
                    <Link href='sign-in'>
                        <Button variant='transparent' className="text-md font-medium">
                            Log in
                        </Button>
                    </Link>
                    <Link href='sign-up'>
                        <Button size="blank" variant='white' className="text-md font-medium px-16 py-3">
                            Sign up
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default HomeNavbar