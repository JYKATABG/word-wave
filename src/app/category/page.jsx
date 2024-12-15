import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Link from "next/link"

export default function Categories() {

    const categories = [
        { title: "Technology", imageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg" },
        { title: "Lifestyle", imageUrl: "https://assets.gqindia.com/photos/6685371e3b1e57a1f8a3c6bd/master/pass/Live-longer_001.jpg" },
        { title: "Business", imageUrl: "https://imageio.forbes.com/specials-images/imageserve/5fca87f3ce4ca55e8985a10a/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" },
        { title: "Education", imageUrl: "https://www.drury.edu/wp-content/uploads/2021/09/elementary-school-program.jpg" },
        { title: "Car Reviews", imageUrl: "https://www.mynrma.com.au/-/media/car-servicing/mobile-banner-car-reviews.jpg?h=360&w=640&hash=C1BB907EA0C658261F44D64F38143182" },
        { title: "Car Maintenance", imageUrl: "https://repairsmith-prod-wordpress.s3.amazonaws.com/2022/11/mechanic-working-on-engine.jpg" },
        { title: "Motorsports", imageUrl: "https://files.porsche.com/filestore/image/multimedia/none/motorsport-intro-05/normal/04950a12-7e0d-11ee-810c-005056bbdc38/porsche-normal.jpg" },
        { title: "Gaming", imageUrl: "https://www.bluent.com/images/wher-are-we-going.webp" },
        { title: "Events", imageUrl: "https://media.licdn.com/dms/image/v2/C561BAQE-51J-8KkMZg/company-background_10000/company-background_10000/0/1584559866970/eventscom_cover?e=2147483647&v=beta&t=3bktbE7ts5aNwH8XEUM5rW0G2aMbuQ1b2dHBVQgZqmA" },
        { title: "Tips and tricks", imageUrl: "https://st.depositphotos.com/1034557/2887/i/450/depositphotos_28874629-stock-photo-tips-and-tricks-chalk-illustration.jpg" },
        { title: "Entertainment", imageUrl: "https://www.hindustantimes.com/ht-img/img/2024/09/30/550x309/Entertainment_2_1727681509458_1727681610187.jpg" },
        { title: "Personal Finance", imageUrl: "https://www.maxprog.com/pictures/blog/top_benefits_of_using_personal_finance_software_1024x576.png" },
        { title: "News & Current Affairs", imageUrl: "https://www.bestpodcasts.co.uk/wp-content/uploads/2022/07/current-affairs-podcasts.png" },
    ]

    const sanitizeCategory = (category) => {
        return category.title
            .toLowerCase()                  // Convert to lowercase
            .replace(/[\s&]+/g, '-')        // Replace spaces and "&" with "-"
            .replace(/[^\w-]+/g, '');       // Remove special characters except "-"
    };

    return (
        <>
            <div className="flex flex-wrap justify-center items-center w-full mt-[2em] gap-3 my-4">
                {categories.map((category, index) => (
                    <Link key={index} href={`/category/${sanitizeCategory(category)}`}>
                        <CategoryCard title={category.title} imageUrl={category.imageUrl} />
                    </Link>
                ))}
            </div>
            <Footer />
        </>
    )
}