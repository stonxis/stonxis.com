"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function SignOutForm() {

    return (
        <div>
            <div className="">
                <p>Bem vindo</p>
            </div>
            <Button
                variant='outline'
                type="submit"
                className="cursor-pointer"
                onClick={() => signOut()}>
                Sair
            </Button>
        </div>
    )
}