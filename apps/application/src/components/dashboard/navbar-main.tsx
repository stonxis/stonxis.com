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
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { links } from "./sidebar-main";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    user: Session['user']
}

export function NavbarMain({ user }: Props) {
    const pathname = usePathname()
    if (!user) return

    const getActiveClasses = (href: string) => {
        const isActive = pathname === href
        return isActive
            ? {
                indicator: 'bg-st-text-active transition-all focus:outline-none',
                link: 'bg-gradient-one text-st-text-active transition-all focus:outline-none rounded-r-sm'
            }
            : {
                indicator: 'bg-transparent transition-all focus:outline-none ',
                link: 'text-st-text hover:text-white transition-all focus:outline-none duration-200 hover:rounded-sm'
            }
    }
    return (
        <div className="border-b border-st-border px-4 py-4 flex justify-between items-center">
            <div className="flex items-center lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-9 h-9">
                            <MenuIcon className="w-12 h-12" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle></SheetTitle>
                        <div className="flex-1">
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-xs font-semibold uppercase">Financial</h2>
                                    <ul className="flex flex-col gap-1">
                                        {links.financial.map((link, index) => {
                                            const classes = getActiveClasses(link.href)
                                            return (
                                                <li key={index} className="flex items-center group">
                                                    <div className={`h-9 w-1 ${classes.indicator} `}></div>
                                                    <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link} transition-all duration-200 `}>
                                                        <div className="mr-2">{link.icon}</div>
                                                        <span className="text-sm">{link.name}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xs font-semibold uppercase">Knowledge</h2>
                                    <ul className="flex flex-col gap-1">
                                        {links.knowledge.map((link, index) => {
                                            const classes = getActiveClasses(link.href)
                                            return (
                                                <li key={index} className="flex items-center group">
                                                    <div className={`h-9 w-1 ${classes.indicator}`}></div>
                                                    <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link} rounded-r transition-all duration-200`}>
                                                        <div className="mr-2">{link.icon}</div>
                                                        <span className="text-sm">{link.name}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="py-4 px-4">
                            <ul className="flex flex-col gap-1">
                                {links.footer.map((link, index) => {
                                    const classes = getActiveClasses(link.href)
                                    return (
                                        <li key={index} className="flex items-center group">
                                            <div className={`h-9 w-1 ${classes.indicator}`}></div>
                                            <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link} rounded-r transition-all duration-200`}>
                                                <div className="mr-2">{link.icon}</div>
                                                <span className="text-sm">{link.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <SearchOriginUI />
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={user.image || ''} alt={'User avatar'} />
                                <AvatarFallback>{user.email ? user.email[0].toUpperCase() : '?'}</AvatarFallback>
                            </Avatar>
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
                            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
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