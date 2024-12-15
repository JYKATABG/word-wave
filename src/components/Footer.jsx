import Image from "next/image";
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {

    const socialLinks = [
        { link: "https://www.instagram.com/j.marinov7/", icon: <FaInstagram /> },
        { link: "https://github.com/JYKATABG", icon: <FaGithub /> },
        { link: "https://discord.gg/vW6UARaXQW", icon: <FaDiscord /> },
    ]

    return (
        <div className="bg-black h-[70px] mt-auto flex justify-between items-center px-4">
            <Image
                src={"/logo.png"}
                width={70}
                height={70}
                alt="logo"
            />

            <h1 className="text-white">@Copyright WordWave 2024 | All rights reserved</h1>

            <div className="flex gap-3 text-white text-xl">
                {socialLinks.map((social) => (
                    <Link href={social.link} className="hover:opacity-35 duration-150">
                        {social.icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}