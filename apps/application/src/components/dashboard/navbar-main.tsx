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
import { MenuIcon, MessageSquare } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { links } from "./sidebar-main";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsOriginUI from "../notification-originui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

type Props = {
    user: Session['user']
}

export function NavbarMain({ user }: Props) {
    const pathname = usePathname()
    if (!user) return null

    const getActiveClasses = (href: string) => {
        const isActive = pathname === href
        return isActive
            ? {
                indicator: 'bg-st-text-active transition-all focus:outline-none',
                link: 'bg-gradient-one text-st-text-active transition-all focus:outline-none rounded-r-sm'
            }
            : {
                indicator: 'bg-transparent transition-all focus:outline-none',
                link: 'text-st-text hover:text-white transition-all focus:outline-none duration-200 hover:rounded-sm'
            }
    }

    return (
        <div className="border-b border-st-border px-4 py-4 flex justify-between items-center fixed top-0 left-0 right-0 bg-background z-40">
            <div className="flex items-center lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] p-0">
                        <SheetHeader>
                            <SheetTitle>Stonxis</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-4 space-y-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xs font-semibold uppercase">Financial</h2>
                                        <ul className="flex flex-col gap-1">
                                            {links.financial.map((link, index) => {
                                                const classes = getActiveClasses(link.href)
                                                return (
                                                    <li key={index} className="flex items-center group">
                                                        <div className={`h-9 w-1 ${classes.indicator}`}></div>
                                                        <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link}`}>
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
                                                        <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link}`}>
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
                            <div className="p-4">
                                <ul className="flex flex-col gap-1">
                                    {links.footer.map((link, index) => {
                                        const classes = getActiveClasses(link.href)
                                        return (
                                            <li key={index} className="flex items-center group">
                                                <div className={`h-9 w-1 ${classes.indicator}`}></div>
                                                <Link href={link.href} className={`flex items-center py-2 pl-2 w-full ${classes.link}`}>
                                                    <div className="mr-2">{link.icon}</div>
                                                    <span className="text-sm">{link.name}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <h1 className="hidden lg:block font-bold text-2xl text-white">STONXIS</h1>
            <SearchOriginUI />

            <div className="flex gap-3 items-center">
                <NotificationsOriginUI />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 rounded-full">
                            <Avatar>
                                <AvatarImage src={user.image || ''} alt="User avatar" />
                                <AvatarFallback>{user.email ? user.email[0].toUpperCase() : '?'}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
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
                        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="fixed bottom-7 right-8 px-3 py-5 rounded-full hover:bg-teal-50 border-teal-600 hover:border-teal-500 text-teal-600 hover:text-teal-500 z-50"
                    >
                        <MessageSquare className="h-7 w-7" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chat AI Agent</DialogTitle>
                        <DialogDescription>
                            Chat with our AI assistant to get help with your questions and tasks.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}