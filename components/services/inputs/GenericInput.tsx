import { ButtonSelect } from "./ButtonSelect"
import { FacebookProfilePage } from "./FacebookProfilePage"
import { FacebookVideo } from "./FacebookVideo"
import { TextInput } from "./TextInput"
import { Textarea } from "./Textarea"
import { ServiceProviderActionFormItem } from "../../../types"
import { NumberInput } from "./NumberInput"
import { PriceInput } from "./PriceInput"
import { IconSelect } from "./IconSelect"

export const GenericInput = (props: ServiceProviderActionFormItem) => {

    if (props.input_mask == 'text') return <TextInput {...props} />
    if (props.input_mask == 'textarea') return <Textarea {...props} />
    if (props.input_mask == 'facebook-video') return <FacebookVideo {...props} />
    if (props.input_mask == 'button-select') return <ButtonSelect {...props} />
    if (props.input_mask == 'icon-select') return <IconSelect {...props} />

    if (props.input_mask == 'facebook-profile-page') return <FacebookProfilePage {...props} />
    if (props.input_mask == 'number') return <NumberInput {...props} />
    if (props.input_mask as any == 'price') return <PriceInput {...props} />

    return null
}