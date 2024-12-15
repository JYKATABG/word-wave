"use client"

import { createComment } from "@/actions/actions";
import { useState } from "react"

export default function CommentForm({ userId, postId }) {

    const [comment, setComment] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        if (!comment.trim()) setIsFocused(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        createComment(comment, postId, userId)
        setComment("");
        setIsFocused(false);
    }

    return (
        <>

            <form
                className="w-[70%] mx-auto mb-4 border border-gray-200 rounded-xl"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="px-4 py-2 bg-[#272727] h-auto rounded-xl">
                    <textarea
                        id="comment"
                        rows="4"
                        className="w-full overflow-visible h-auto outline-none px-0 text-md bg-[#272727] text-white border-0 focus:ring-0 dark:text-whit" placeholder="Write a comment..." required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    ></textarea>
                </div>
                {isFocused && (
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            disabled={!comment.trim()}
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                )}
            </form>

        </>
    )
}