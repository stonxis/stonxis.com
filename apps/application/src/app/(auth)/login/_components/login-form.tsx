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
import { useState } from "react"

type FormData = {
  email: string
}

type LoadingState = "email" | "google" | "facebook" | null

export function LoginForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>()
  const [loadingState, setLoadingState] = useState<LoadingState>(null)
  const email = watch("email")

  const onSubmitGoogle = async () => {
    try {
      setLoadingState("google")
      await signIn("google")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoadingState(null)
    }
  }

  const onSubmitFacebook = async () => {
    try {
      setLoadingState("facebook")
      await signIn("facebook")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoadingState(null)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoadingState("email")
      await signIn("email", {
        email: data.email,
        redirect: false,
      })

      toast.success("Email enviado, verifique a caixa de entrada do seu email")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoadingState(null)
    }
  }

  const clearEmail = () => {
    setValue("email", "")
  }

  const isLoading = loadingState !== null

  return (
    <div className="space-y-12 p-4 rounded-md lg:border lg:p-12 max-w-2xl">
      <div className="text-center font-bold text-3xl">
        Entrar
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Magic link</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Insira seu email"
            required
            {...register("email")}
            className="w-full p-2 rounded-md pr-8"
            disabled={isLoading}
          />
          {email && (
            <button
              type="button"
              onClick={clearEmail}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-current/50 transition-colors"
            >
              <IoMdClose size={18} className="cursor-pointer" />
            </button>
          )}
        </div>

        <button 
          className="w-full cursor-pointer bg-teal-500 hover:bg-teal-400 text-black hover: p-2 rounded-md transition-colors font-semibold flex items-center justify-center" 
          type="submit" 
          disabled={isLoading}
        >
          {loadingState === "email" ? <Loader className="animate-spin"/> : "Enviar link"}
        </button>
      </form>
      <Separator className="mx-auto"/>
      <div className="flex flex-col space-y-4">
        <Button 
          className="w-full cursor-pointer text-current/70 hover:text-current transition-colors" 
          variant='outline' 
          onClick={handleSubmit(onSubmitGoogle)} 
          disabled={isLoading}
        >
          {loadingState === "google" ? <Loader className="animate-spin"/> : (
            <>
              <FcGoogle />
              Entrar com o Google
            </>
          )}
        </Button>
        <Button 
          className="w-full cursor-pointer text-current/70 hover:text-current transition-colors" 
          variant='outline' 
          onClick={handleSubmit(onSubmitFacebook)} 
          disabled={isLoading}
        >
          {loadingState === "facebook" ? <Loader className="animate-spin"/> : (
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
