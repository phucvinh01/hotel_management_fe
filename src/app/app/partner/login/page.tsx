import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Logo from "@/components/shared/Logo"
import image from '../../../../../public/images/log-in.png'
import { LoginFormPartnert } from "./login-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo/>
          </div>
          <div className="relative z-20 mt-auto">
            <Image src={image} alt="image" width={800} height={800} className="w-full" />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <LoginFormPartnert />
            <p className="px-8 text-center text-sm text-muted-foreground">
             Bằng cách nhấp vào tiếp tục, bạn đồng ý với chúng tôi{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
               Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
              Chính sách bảo mật
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}