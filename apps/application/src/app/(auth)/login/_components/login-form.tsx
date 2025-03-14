"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { Loader } from "lucide-react"

type FormData = {
  email: string
}

export function LoginForm() {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<FormData>()
  const email = watch("email")

  const onSubmitGoogle = async () => {
    try {
      await signIn("google")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const onSubmitFacebook = async () => {
    try {
      await signIn("facebook")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      await signIn("email", {
        email: data.email,
        redirect: false,
      })

      toast.success("Email enviado, verifique a caixa de entrada do seu email")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const clearEmail = () => {
    setValue("email", "")
  }

  return (
    <div className="space-y-12 p-4 rounded-md lg:border lg:p-12">
      <div className="text-center font-bold text-3xl text-white">
        Entrar
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email" className="text-white">Magic link</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Insira seu email"
            required
            {...register("email")}
            className="w-full p-2 rounded-md pr-8"
            disabled={isSubmitting}
          />
          {email && (
            <button
              type="button"
              onClick={clearEmail}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={18} className="cursor-pointer" />
            </button>
          )}
        </div>

        <button className="w-full cursor-pointer bg-st-button-main p-2 rounded-md text-black font-semibold flex items-center justify-center" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin"/> : "Enviar link"}
        </button>
      </form>
      <Separator className="mx-auto"/>
      <div className="flex flex-col space-y-4">
        <Button 
          className="w-full cursor-pointer text-white" 
          variant='outline' 
          onClick={handleSubmit(onSubmitGoogle)} 
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader className="animate-spin"/> : (
            <>
              <FcGoogle />
              Entrar com o Google
            </>
          )}
        </Button>
        <Button 
          className="w-full cursor-pointer text-white" 
          variant='outline' 
          onClick={handleSubmit(onSubmitFacebook)} 
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader className="animate-spin"/> : (
            <>
              <FaFacebook className="text-blue-600 bg-white rounded-full" />
              Entrar com o Facebook
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
