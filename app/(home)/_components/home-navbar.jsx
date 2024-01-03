import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HomeNavbar = async () => {
    const isSignedIn = await currentUser();

    return (
        <nav className="container-padding py-8 bg-transparent flex items-center justify-between">
            <Image
                src='/logo.svg'
                alt="logo"
                width={100}
                height={100}
            />

            {isSignedIn ? (
                <div className="rounded-full" style={{ border: "3px solid #fff" }}>
                    <UserButton afterSignOutUrl="/" />
                </div>
            ): (
                <div className="flex items-center justify-center gap-4">
                    <Link href='sign-in'>
                        <Button variant="transparent" className="bg-transparent text-color-gray hover:text-color-black transition-all text-md font-medium login">
                            Log in
                        </Button>
                    </Link>
                    <Link href='sign-up'>
                        <Button size="blank" variant='white' className="text-md font-medium px-16 py-3 signup">
                            Sign up
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default HomeNavbar