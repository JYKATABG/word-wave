"use client"
import Image from "next/image";
import { editPost } from "@/actions/actions";

import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup"

const categories = [
    "Technology",
    "Lifestyle",
    "Business",
    "Education",
    "Car Reviews",
    "Car Maintenance",
    "Motorsports",
    "Events",
    "Tips and tricks",
    "Gaming",
    "Entertainment",
    "Personal Finance",
    "News & Current Affairs",
    "Health & Fitness"
]


const validationSchema = Yup.object({
    title: Yup.string().required("Title is required!")
        .min(3, "Title should have at least 3 characters")
        .max(50, "Title max characters are 15"),
    description: Yup.string().required("Description is required")
        .max(1000, "Description max characters are 1000"),
    imageUrl: Yup.string().matches("[\=,\(][\"|\'].[^\=\"]+\.(?i:jpg|gif|png|bmp|webp)[\"|\']", "Invalid image format")
})

export default function EditForm({ postData, ownerId }) {

    async function handleEdit(data) {
        editPost(postData.id, ownerId, data)
        revalidatePath("/", "page")
    }

    const initalValues = {
        title: postData.title,
        description: postData.description,
        imageUrl: postData.imageUrl,
        category: postData.category
    }

    return (
        <>
            <div className="w-[700px] flex-col mx-auto mt-5 items-center bg-[#242527] p-3 rounded-xl">
                <Formik
                    enableReinitialize={true}
                    initialValues={initalValues}
                    onSubmit={handleEdit}
                    validationSchema={validationSchema}>
                    <Form>
                        <div className="flex items-center gap-3 py-2">
                            <Image
                                src={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}
                                width={40}
                                height={40}
                                alt="user-image"
                                className="rounded-[50%]"
                            />
                            <Field
                                type="text"
                                placeholder="What your post will be about?"
                                name="title"
                                className="w-[90%] h-[40px] bg-[#3a3b3d] outline-none px-2 text-white rounded-xl"
                            />
                        </div>
                        <div className="pl-[3.3em] pb-2">
                            <ErrorMessage
                                name="title"
                                component="span"
                                className="text-red-600"
                            />
                        </div>

                        <Field
                            type="text"
                            placeholder="Description..."
                            name="description"
                            className="w-[90%] h-[40px] bg-[#3a3b3d] ml-[3.2em] mb-2 outline-none px-2 text-white rounded-xl"
                        />
                        <div className="pl-[3.3em] pb-2">
                            <ErrorMessage
                                name="description"
                                component="span"
                                className="text-red-600"
                            />
                        </div>
                        <Field
                            type="text"
                            placeholder="Provide an image..."
                            name="imageUrl"
                            className="w-[90%] h-[40px] bg-[#3a3b3d] ml-[3.2em] outline-none px-2 text-white rounded-xl"
                        />
                        <div className="pl-[3.3em] pb-2">
                            <ErrorMessage
                                name="imageUrl"
                                component="span"
                                className="text-red-600"
                            />
                        </div>
                        <hr className="my-4" />
                        <div className="w-full justify-between flex">
                            <Field
                                as="select"
                                name="category"
                                className="text-white bg-blue-500 text-md ml-3 justify-start rounded-xl p-1">
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>

                                ))}
                            </Field>
                            <button
                                type="submit"
                                className="text-white bg-blue-500 px-2 text-md mr-4 rounded-xl p-1 duration-100 hover:opacity-60">
                                Edit post
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div >
        </>
    )
}