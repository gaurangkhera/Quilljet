import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, Feather, LucideFeather } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserAccountNav from "./UserAccountNav";

const Navbar = () => {

    const { getUser }= getKindeServerSession()

    const user = getUser(   )

    return (
        <nav className="sticky -14  inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14  items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold"><span className="text-2xl ">QuillGPT</span></Link>

                    <div className="hidden items-center space-x-4 sm:flex">
                    
                       { !user ? (
                         <>
                         <LoginLink className={buttonVariants({
                             variant: 'ghost',
                         })}>Sign in</LoginLink>
                         <RegisterLink className={buttonVariants({
                         })}>Get Started <ArrowRight className="ml-1.5 w-5 h-5" /></RegisterLink>
                     </>
                       ) : (
                        <>
                        <Link href="/dashboard" className={buttonVariants({
                            variant: "ghost",
                        })}>Dashboard</Link>
                        <UserAccountNav name={!user.given_name || !user.family_name ? "Account" : `${user.given_name} ${user.family_name}`} email={user.email || ''} imageUrl={user.picture || ''} />
                    </>
                       )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar;