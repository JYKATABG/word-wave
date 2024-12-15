import prisma from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: query,
                },
            },
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}