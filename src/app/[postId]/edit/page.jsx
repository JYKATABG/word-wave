import EditForm from "@/components/Forms/EditForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";


export default async function EditPage({ params }) {

    const postId = params.postId;

    const user = await currentUser();
    if (!user) {
        redirect(`/${postId}`);
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    const postData = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    return (
        <>
            <EditForm postData={postData} ownerId={post.authorId} />
        </>
    )
}