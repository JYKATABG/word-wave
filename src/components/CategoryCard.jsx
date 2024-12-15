import Image from "next/image";

export default function CategoryCard({ title, imageUrl }) {
    return (
        <div className="container">
            <Image
                src={imageUrl}
                width={500}
                height={500}
                quality={90}
                alt={title}
                className="category-card-image"
            />
            <h1 className="title">{title}</h1>
        </div>
    )
}