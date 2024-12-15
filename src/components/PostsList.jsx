import Post from '@/components/Post';
import prisma from '@/lib/db';


export default async function PostsList({ postsByTheme }) {

    

    return (
        <div className='flex flex-col gap-10 mt-5'>
            {postsByTheme.map((post) => (
                <Post post={post} />
            ))}
        </div>
    )
}