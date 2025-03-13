"use client"

import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

type Props = {
    user: Session['user']
}

export function SignOutForm({ user }: Props) {
    if (!user) return

    return (
        <div>
            <div className="">
                <p>Bem vindo</p>
                <span>{user.email}</span>
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