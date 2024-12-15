"use server"

import prisma from "@/lib/db"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createPost(title, description, category, imageUrl, themeId) {
    const user = await currentUser();
    if (user) {
        await prisma.post.create({
            data: {
                title,
                description,
                category,
                imageUrl,
                authorId: user.id,
                themeId: themeId
            }
        });

        revalidatePath("/", "page")
    }
}

export async function deletePost(id, ownerId) {
    const user = await currentUser();
    if (user && user.id === ownerId) {
        await prisma.post.delete({
            where: {
                id: id
            }
        })
    }
    redirect("/");
}

export async function editPost(id, ownerId, postData) {
    const user = await currentUser();
    if (user && user.id === ownerId) {
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: postData.title,
                description: postData.description,
                imageUrl: postData.imageUrl,
                category: postData.category,
            }
        })
    }
    redirect(`/${id}`);
}

export async function createTheme(themeName, description, currentTheme) {
    const user = await currentUser();

    if (user) {
        await prisma.theme.create({
            data: {
                title: themeName,
                description,
                category: currentTheme,
                authorId: user.id
            }
        });
    }
    revalidatePath(`/themes/${currentTheme}`, "page")
}

export async function createComment(content, postId, userId) {
    const user = await currentUser();

    if (user) {
        await prisma.comment.create({
            data: {
                content,
                postId,
                userId
            }
        })
    }
    revalidatePath(`/${postId}`);
}

export async function createLike(postId, userId) {
    const user = await currentUser();

    if (user) {
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
    }
    revalidatePath(`/${postId}`);
}

export async function deleteLike(postId, userId) {
    const user = await currentUser();

    if (user) {
        await prisma.like.deleteMany({
            where: {
                postId,
                userId
            }
        })
    }
    revalidatePath(`/${postId}`);
}

export async function fetchLikes(postId) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                likes: true
            }
        })

        if (!post) {
            throw new Error("Post not found");
        }

        return JSON.parse(JSON.stringify(post));

    } catch (error) {
        console.error("Error fetching likes ", error);
        throw new Error("Failed to fetch likes");
    }
}