'use client'

import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup"
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { createPost } from "@/actions/actions";
import { toast } from "react-toastify";

const initalValues = {
    title: "",
    description: "",
    imageUrl: "",
}

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required!")
        .min(3, "Title should have at least 3 characters")
        .max(150, "Title max characters are 150"),
    description: Yup.string().required("Description is required")
        .max(500, "Description max characters are 150")
})

export default function CreatePost({ category, themeId }) {

    const notify = () => toast.success("Post successfully created!", {
        position: "top-right"
    })

    async function handleSubmit(data, onSubmitProps) {
        const { title, description, imageUrl } = data;
        createPost(title, description, category, imageUrl, themeId)
        onSubmitProps.resetForm();
        revalidatePath("/", "page")
    }

    return (
        <div className="w-[700px] flex-col items-center bg-[#242527] p-3 rounded-xl">
            <Formik
                initialValues={initalValues}
                onSubmit={handleSubmit}
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
                    <div className="w-full justify-end flex">
                        <button
                            onClick={notify}
                            type="submit"
                            className="text-white bg-blue-500 px-2 text-md mr-4 rounded-xl p-1 duration-100 hover:opacity-60">
                            Create post
                        </button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}