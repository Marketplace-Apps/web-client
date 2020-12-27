import { FormItem, ServiceProviderFormItem } from "../../../types"
import { ButtonSelect } from "./ButtonSelect"
import { FacebookProfilePage } from "./FacebookProfilePage"
import { FacebookVideo } from "./FacebookVideo"
import { TextInput } from "./TextInput"
import { Textarea } from "./Textarea"

export const GenericInput = (props: FormItem<any>) => {
    if (props.input_mask == 'text') return <TextInput {...props} />
    if (props.input_mask == 'textarea') return <Textarea {...props} />
    if (props.input_mask == 'facebook-video') return <FacebookVideo {...props} />
    if (props.input_mask == 'button-select') return <ButtonSelect {...props} />
    if (props.input_mask == 'facebook-profile-page') return <FacebookProfilePage {...props} />
}