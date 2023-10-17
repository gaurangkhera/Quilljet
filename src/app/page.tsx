import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = () => {

  const { getUser } = getKindeServerSession()

  const user = getUser()

  return(
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
    <Link href={'/pricing'}>
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-gray-50 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-grey-300 hover:bg-white/50">
        <p className="animate-intext-sm font-semibold text-gray-700">
          <Button variant={'ghost'} size={'sm'} className="gap-1.5 hover:bg-transparent">Quillbot is now in open beta <ChevronRight className="h-5 w-5 text-zinc-600" /></Button>
        </p>
      </div></Link>
    <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl heading">
      Write better with Quillbot.
    </h1>
    <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
      It's simple. Put in your text, hit the button, and let QuillBot paraphrase it. QuillBot will then paraphrase the content while maintaining the original meaning.
    </p>

    <Link className={buttonVariants({
      size: 'lg',
      className: "mt-5"
    })} href={user ? '/dashboard' : '/sign-up'}>Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
  </MaxWidthWrapper>
  )
}

export default Page;