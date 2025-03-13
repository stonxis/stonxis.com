'use client'

import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import SearchOriginUI from "../search-originui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut
} from "../ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
    user: Session['user']
}

export function NavbarMain({ user }: Props) {
    if (!user) return
    return (
        <div className="border-b border-st-border px-8 py-4 flex justify-between items-center">
            <div>
                <SearchOriginUI />
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={user.image || ''} alt={'User avatar'} />
                                <AvatarFallback>{user.email ? user.email[0].toUpperCase() : '?'}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="flex flex-col space-x-1 text-xs text-st-text-secondary gap-1">
                                    <p className="text-md">Plan</p>
                                    <span className="px-2 bg-green-500/10 rounded-full text-st-text-active text-xs">Free</span>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Keyboard shortcuts
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => signOut()}>
                                Log out
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}