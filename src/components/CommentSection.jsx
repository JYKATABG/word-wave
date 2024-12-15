import { currentUser } from "@clerk/nextjs/server";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import prisma from "@/lib/db";
import { Suspense } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

export default async function CommentSection({ postId }) {
    const user = JSON.parse(JSON.stringify(await currentUser()));

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true
        }
    })


    return (
        <>
            <div>
                <h1 className="text-white text-xl">Comments: {post.comments.length}</h1>
                {user && (
                    <div>
                        <CommentForm userId={user.id} postId={postId} />
                    </div>
                )}

                <div className="w-full mx-auto mt-5 flex flex-col items-center gap-5">
                    {post.comments.map((commentData) => (
                        <Suspense fallback={<LoadingSpinner />}>
                            <Comment commentData={commentData} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </>
    )
}