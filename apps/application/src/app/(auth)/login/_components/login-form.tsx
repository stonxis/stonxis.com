"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export function LoginForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
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

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-2 mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="você@exemplo.com"
              required
              {...register("email")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" type="submit">
            Enviar link mágico
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

