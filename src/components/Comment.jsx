import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import moment from "moment";

export default async function Comment({ commentData }) {

    const user = await clerkClient.users.getUser(commentData.userId);

    const timeFromNow = moment(commentData.createdAt).startOf('hour').fromNow();

    return (
        <>
            <div key={commentData.id} className="w-[70%] h-auto bg-[#272727] text-white p-2 rounded-xl">
                <div className="flex items-center gap-2 p-2 mb-2">
                    <Image
                        src={user.imageUrl}
                        width={40}
                        height={40}
                        alt="user-image"
                        className="rounded-[50%]"
                    />
                    <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
                </div>
                <p className="text-gray-400 pl-3">Before: {timeFromNow}</p>

                <p className="p-3">{commentData.content}</p>
            </div>
        </>
    )
}