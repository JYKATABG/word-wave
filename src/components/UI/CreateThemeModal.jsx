'use client'

import { useState } from "react"

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createTheme } from "@/actions/actions";
import { toast } from "react-toastify";

export default function CreateThemeModal({ theme }) {

    const [isOpen, setIsOpen] = useState(false);
    const [themeName, setThemeName] = useState("");
    const [description, setDescription] = useState("");



    const notify = () => toast.success("Theme successfully created!", {
        position: "top-right"
    })

    const handleSubmit = () => {
        createTheme(themeName, description, theme)
        setIsOpen(false);
        setThemeName("");
        setDescription("");
        notify();
    }

    return (
        <>

            <Button variant="primary" onClick={() => setIsOpen(true)}>
                + Add Theme
            </Button>

            <Modal show={isOpen} onHide={() => setIsOpen(false)} backdrop="static">
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Theme name</Form.Label>
                            <Form.Control
                                onChange={(e) => setThemeName(e.target.value)}
                                value={themeName}
                                type="text"
                                placeholder="Enter theme..."
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create Theme
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}