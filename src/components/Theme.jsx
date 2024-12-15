import Link from "next/link";

export default function Theme({ theme }) {
    return (
        <>
            <div key={theme.id} className="bg-[#272727] text-white p-2 px-3
                 rounded-xl flex flex-col gap-1 hover:opacity-20 duration-100">
                <h1 className="font-bold">{theme.title}</h1>
                <p>{theme.description}</p>
            </div>
        </>
    )
}