import { useRouter } from "next/router"
import React from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useAction, useDeleteAction } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { useServices } from "../../hooks/useServices"
import { Feed } from "../../types"
import { IconButton } from "../common/IconButton"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import firebase from 'firebase'


const EditorButtonList = [
    "undo",
    "redo",
    "fontSize",
    "formatBlock",
    "blockquote",
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "fontColor",
    "hiliteColor",
    "textStyle",
    "removeFormat",
    "outdent",
    "indent",
    "align",
    "list",
    "lineHeight",
    "table",
    "link",
    "image",
    "fullScreen",
    "showBlocks",
    "codeView",
    "preview",
    "lineHeight"
]

type UploadImagesResult = {
    result: Array<{ url: string, name: string, size: string }>
}

async function UploadImages(files: File[]): Promise<UploadImagesResult> {
    const me = firebase.auth().currentUser
    if (!me) return
    const result = await Promise.all(files.map(async file => {
        const [name, ext] = file.name.split('.')
        const ref = firebase.storage().ref(`web-agency-feed-images/${me.uid}-${btoa(name)}.${ext}`)
        const { metadata } = await ref.put(file)
        const rs = {
            url: await ref.getDownloadURL(),
            name: metadata.name,
            size: `${metadata.size}`
        }
        console.log(rs)
        return rs
    }))

    return { result }
}

export type FeedModal = {
    feed?: Feed
    onHide?: Function
}




export const FeedModal = (props: FeedModal) => {

    const domain = useDomain()
    const services = useServices()
    const { locale } = useRouter()

    const form = useForm<Feed>({
        defaultValues: props.feed || {
            language: 'vi'
        }
    })

    const { excute, loading } = useAction(
        `domains/${domain?.id}/feeds${props.feed ? `/${props.feed.id}` : ''}`,
        props.feed ? 'PATCH' : 'POST',
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const { del, deleting } = useDeleteAction(
        props.feed && `domains/${domain?.id}/feeds/${props.feed.id}`,
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    return (
        <Modal show={true} onHide={props.onHide}>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(data => excute(data))}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.feed ? 'Edit feed' : 'Create new feed'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col xs={12}> <Form.Label>Language</Form.Label></Col>
                            <Col xs={12}>
                                <Controller
                                    control={form.control}
                                    name="language"
                                    render={({ onChange, value }) => (
                                        <Form.Control
                                            as="select"
                                            custom
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                        >
                                            <option value="en">English</option>
                                            <option value="vi">Vietnam</option>
                                        </Form.Control>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}> <Form.Label>Content</Form.Label></Col>
                            <Col xs={12}>
                                <Controller
                                    control={form.control}
                                    name="content"
                                    render={({ onChange, value }) => (
                                        <SunEditor
                                            onImageUploadBefore={(info: File[], core, handler: Function) => {
                                                UploadImages(info).then(result => handler(result))
                                            }}
                                            defaultValue={value}
                                            onChange={onChange}
                                            setOptions={{
                                                fontSize: new Array(90).fill(0).map((_, i) => i + 10),
                                                height: 600,
                                                buttonList: [EditorButtonList]
                                            }}
                                        />
                                    )}
                                />

                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        {
                            props.feed && (
                                <IconButton
                                    size="sm"
                                    variant="danger"
                                    type="submit"
                                    onClick={() => del()}
                                    disabled={deleting}
                                    icon={MdDelete}
                                    loading={deleting}
                                >Delete</IconButton>
                            )
                        }
                        <IconButton
                            variant="primary"
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            size="sm"
                            icon={FaCheck}
                        >Submit</IconButton>
                        <Button
                            variant="dark"
                            type="submit"
                            size="sm"
                            onClick={props.onHide as any}
                        >Close</Button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    )
}