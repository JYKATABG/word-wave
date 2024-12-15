import { clerkClient } from "@clerk/nextjs/server";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default async function Post({ post }) {

    const user = await clerkClient.users.getUser(post.authorId);

    const timeFromNow = moment(post.createdAt).startOf('hour').fromNow();


    return (
        <Link href={`/${post.id}`}>
            <div key={post.id} className="w-[700px] h-[250px] hover:opacity-35 hover:scale-105 hover:rotate-1 duration-150 overflow-auto flex flex-col gap-4 bg-[#242527] p-2 text-white rounded-xl">
                <div className="flex items-center justify-between py-2 px-1">
                    <div className="flex items-center gap-2">
                        <Image
                            src={user.imageUrl}
                            width={40}
                            height={40}
                            alt="user-image"
                            className="rounded-[50%]"
                        />
                        <h2 className="font-bold">{user.username}</h2>
                    </div>
                    <h3 className="px-3 py-2 font-bold">{timeFromNow}</h3>
                </div>
                <h1 className="py-2 text-lg px-1">{post.title}</h1>
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        width={700}
                        height={300}
                        alt={post.title}
                        layout="intrinsic"
                        className="object-cover"
                    />
                )}
                <p className="px-1 text-lg">{post.description}</p>
            </div>
        </Link>
    )
}