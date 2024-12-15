import CreatePost from "@/components/CreatePost";
import PostsList from "@/components/PostsList";
import prisma from "@/lib/db";

export default async function ThemeName({ params }) {

    const themeName = decodeURIComponent(params.themeName);
    const category = decodeURIComponent(params.category).toLowerCase();

    const currentTheme = await prisma.theme.findMany({
        where: {
            title: themeName
        }
    })

    const postsByTheme = await prisma.post.findMany({
        where: { themeId: currentTheme[0].id },
    });


    return (
        <>
            <div className="w-[80%] mx-auto flex flex-col items-center">
                <h1 className="text-black text-center text-xl bg-white w-[45%] mx-auto my-4 rounded-xl">{themeName}</h1>
                <CreatePost category={category} themeId={currentTheme[0].id} />

                <PostsList postsByTheme={postsByTheme} />
            </div>
        </>
    )
}