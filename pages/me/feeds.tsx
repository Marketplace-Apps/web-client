import { AppRouteList } from "../../AppRouteList"
import { MainLayout } from "../../layouts/MainLayout"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';



const FeedManagerPage = () => (
    <MainLayout title={AppRouteList.Me.children.FeedManager.name}>
        <SunEditor
            setOptions={{
                fontSize: new Array(90).fill(0).map((_, i) => i + 10),
                height: 600, 
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
                        "preview"
                    ]
                ]
            }}
        />
    </MainLayout>
)

export default FeedManagerPage