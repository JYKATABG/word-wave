"use client"

import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { deletePost } from "@/actions/actions";
import Link from "next/link";
import { toast } from "react-toastify";

import { FaTrash } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";


export default function EditActionButtons({ postId, authorId }) {

    const [isOpen, setIsOpen] = useState(false);

    const notify = () => toast.success("Post successfully deleted!", {
        position: "top-right"
    })

    return (
        <>
            <div className="text-white flex gap-3 w-full justify-end">
                <Link href={`/${postId}/edit`}>
                    <Button
                        variant="warning"
                        size="md"
                    >
                        <MdModeEditOutline className="text-2xl" />
                    </Button>
                </Link>
                <Button
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                >
                    <FaTrash className="text-xl" />
                </Button>
            </div >

            {/* Delete Modal */}
            <Modal show={isOpen} onHide={() => setIsOpen(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confimration!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-bold">Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        deletePost(postId, authorId)
                        notify();
                    }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}