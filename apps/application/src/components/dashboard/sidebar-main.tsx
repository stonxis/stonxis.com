'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Home,
    DollarSign,
    Target,
    CreditCard,
    Trophy,
    Settings,
    HelpCircle,
    Medal,
    BookOpen,
    PiggyBank,
    Wallet
} from 'lucide-react'

export const links = {
    financial: [
        { name: 'Dashboard', href: '/', icon: <Home size={18} /> },
        { name: 'Transactions', href: '/transactions', icon: <DollarSign size={18} /> },
        { name: 'Goals', href: '/goals', icon: <Target size={18} /> },
        { name: 'Accounts', href: '/accounts', icon: <Wallet size={18} /> },
        { name: 'Credit Cards', href: '/credit-cards', icon: <CreditCard size={18} /> },
        { name: 'Budget', href: '/budget', icon: <PiggyBank size={18} /> },
    ],
    knowledge: [
        { name: 'Exercises', href: '/exercises', icon: <BookOpen size={18} /> },
        { name: 'Ranking', href: '/ranking', icon: <Medal size={18} /> },
        { name: 'Leagues', href: '/leagues', icon: <Trophy size={18} /> },
    ],
    footer: [
        { name: 'Settings', href: '/settings', icon: <Settings size={18} /> },
        { name: 'Support', href: '/support', icon: <HelpCircle size={18} /> },
    ]
}

export function SidebarMain() {
    const pathname = usePathname()

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
        <div className="w-56 h-screen fixed top-0 left-0 lg:flex flex-col border-r border-st-border z-10 px-2 hidden">
            <div>
                <h1 className="text-2xl font-semibold p-4 text-white">Stonxis</h1>
            </div>
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
            <div className="pb-6 px-4">
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
        </div>
    )
}
