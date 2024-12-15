import Theme from "@/components/Theme";
import CreateThemeModal from "@/components/UI/CreateThemeModal";

import prisma from "@/lib/db";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function Category({ params }) {

    const user = await currentUser();

    const decodedCategory = decodeURIComponent(params.category);

    const specificPosts = await prisma.theme.findMany({
        where: {
            category: {
                equals: decodedCategory.toLowerCase(),
            }
        }
    })

    return (
        <>
            <div className="w-[80%] mx-auto my-4">
                <div className="flex justify-between items-end gap-5 w-[70%] m-auto">
                    <h1 className="bg-blue-500 text-white w-[60%] mt-4 p-1.5 text-center font-bold text-lg rounded-xl">{decodedCategory}</h1>
                    {user && (
                        <CreateThemeModal theme={decodedCategory} />
                    )}
                </div>

                <div className="w-[70%] mx-auto border border-white my-4 rounded-xl"></div>

                <div className='flex flex-col gap-10 items-center justify-center py-[3em] w-[70%] m-auto'>
                    {specificPosts.map((theme) => {

                        const sanitizedTheme = theme.title
                            .replace(/[\s&]]/g, '') // Remove special characters
                            .trim(); // Remove extra spaces

                        return (
                            <Link href={`/category/${decodedCategory}/${sanitizedTheme}`} className="w-full">
                                <Theme theme={{ ...theme, title: sanitizedTheme }} />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}