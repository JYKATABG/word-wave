import Post from '@/components/Post';
import prisma from '@/lib/db';


export default async function LastPosts() {

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <>
            <h1 className='text-xl font-bold text-white'>Latest Posts</h1>
            <div className='flex flex-wrap w-[80%] justify-between gap-10'>
                {posts.map((post) => (
                    <Post post={post} />
                ))}
            </div>
        </>
    )
}