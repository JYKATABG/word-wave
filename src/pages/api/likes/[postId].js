import prisma from "@/lib/db";

export default async function handler(req, res) {
    const { postId } = req.query;

    console.log("PostId: ", postId);

    if (req.method === "GET") {
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
                return res.status(404).json({ error: "Post not found" });
            }

            return res.status(200).json({ likes: post.likes })
        } catch (error) {
            console.error("Error fetching likes ", error);
            return res.status(500).json({ error: "Failed to fetch likes" });
        }
    }

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}