'use client'

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {

    const pathName = usePathname();

    const NAV_LINKS = [
        { href: "/", label: "Home" },
        { href: "/category", label: "Category" },
        { href: "/contacts", label: "Contacts" },
    ]

    return (
        <div className='flex justify-between px-5 bg-blue-500 py-2 items-center'>
            <button className="text-white md:hidden">☰</button>

            <nav className="hidden w-full md:flex md:w-auto items-center gap-5">
                <Image
                    src={"/logo.png"}
                    width={50}
                    height={50}
                    alt='site-logo'
                />
                <ul className="flex flex-col gap-5 md:flex-row text-white">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={pathName === href ? "font bold bg-black p-1 px-2 rounded-xl" : ""}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <SearchBar />
            <div className='flex items-center text-white'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}