'use client'

import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import clsx from "clsx";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function SearchBar() {

    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");


    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(debounce);
    }, [query])


    const { data, error, isLoading } = useSWR(
        debouncedQuery ? `/api/search?query=${encodeURIComponent(query)}` : null, fetcher
    );


    return (
        <form
            className="flex relative items-center justify-between px-2 py-1 mr-[25em] bg-white w-[500px]">
            <input
                type="search"
                className="bg-transparent outline-none w-full"
                placeholder="Search specific post..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Search input"
            />
            <IoIosSearch className="text-2xl" />

            <div
                className={clsx("position absolute top-[100%] max-h-[200px] overflow-auto bg-white w-full m-0 left-0 right-0 z-[200] p-2",
                    {
                        'block': isFocused === true,
                        'hidden': isFocused === false
                    })}>

                {isLoading && (
                    <p className="w-full flex justify-center">Loading...</p>
                )}
                {error && (
                    <p className="w-full flex justify-center">{error}</p>
                )}
                {!isLoading && data?.length === 0 && query.length > 0 && (
                    <p className="w-full flex justify-center">No results found.</p>
                )}

                <ul className="flex flex-col h-full overflow-auto">
                    {data?.map((post) => (
                        <Link key={post.id} href={`/${post.id}`}>
                            <li
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                }}
                                onClick={() => setIsFocused(false)}
                                className="border-t-gray-400 hover:opacity-45 cursor-pointer border-t p-1 flex-1">{post.title}</li>
                        </Link>
                    ))}
                </ul>

            </div>
        </form>
    )
}