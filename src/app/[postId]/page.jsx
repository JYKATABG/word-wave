import prisma from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import EditActionButtons from "@/components/EditActionsButtons";
import LikeButtons from "@/components/LikeButtons";
import CommentSection from "@/components/CommentSection";

export default async function PostDetails({ params }) {

    const postId = params.postId;
    const user = await currentUser();


    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })


    const timeFromNow = moment(post.createdAt).startOf('hour').fromNow();
    const authorInformation = await clerkClient.users.getUser(post.authorId);

    return (
        <>
            <div className="m-4">
                <Link
                    href={"/"}
                    className="bg-white px-3 py-1 hover:opacity-45 duration-100 text-black rounded-xl"
                >
                    Back
                </Link>
            </div>
            <div className="flex flex-col gap-5 justify-center w-[80%] mx-auto px-4 py-5">
                <div className="flex gap-3 items-center justify-between bg-[#1f2023] h-[100px] p-2 rounded-xl">
                    <div className="flex gap-3 items-center">
                        <Image
                            src={authorInformation.imageUrl}
                            width={50}
                            height={50}
                            alt="author image"
                            className="rounded-[50%]"
                        />
                        <h1 className="text-white">{authorInformation.username}</h1>
                    </div>
                    {post.authorId === user?.id && (
                        <EditActionButtons postId={postId} authorId={post.authorId} />
                    )}
                </div>

                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        width={700}
                        height={700}
                        quality={90}
                        alt={post.title}
                        loading="eager"
                        className="pt-2 object-cover w-full h-[550px] rounded-lg"
                    />
                )}
                <p className="text-gray-300 italic">Published At: <span className="font-bold">{timeFromNow}</span></p>

                <div className="text-white flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">{post.title}</h1>

                    <p className="text-xl text-justify">{post.description}</p>
                </div>

                <LikeButtons user={JSON.parse(JSON.stringify(user))} postId={postId} />

                <hr className="text-white" />

                <CommentSection postId={postId} />
            </div>
        </>
    )
}