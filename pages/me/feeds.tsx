import { AppRouteList } from "../../AppRouteList"
import { MainLayout } from "../../layouts/MainLayout"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useRef, useState } from "react";



const FeedManagerPage = () => {

    const [html, set_html] = useState('')

    return (<MainLayout title={AppRouteList.Me.children.FeedManager.name}>
        <SunEditor
            onImageUploadBefore={(info, core, handler) => {
                console.log({info, core, handler})
                handler({
                    result: [{
                        "url": "https://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg", // (Image url)
                        "name": "84947430634_20190408001343.jpg", // (Image origin name)
                        "size": "561276" // (Byte)
                    }]
                })
            }}
            onChange={set_html}
            setOptions={{
                fontSize: new Array(90).fill(0).map((_, i) => i + 10),
                height: 600,
                imageUploadUrl: 'https://en7h2qtizfhri.x.pipedream.net',

                buttonList: [
                    [
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
                ]
            }}
        />
        <div className="sun-editor-editable" dangerouslySetInnerHTML={{ __html: html }} />
    </MainLayout>
    )
}

export default FeedManagerPage
