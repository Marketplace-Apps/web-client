import { useRouter } from "next/router"
import { Dropdown } from "react-bootstrap"
import { LanguageList } from '../../LanguageList'

export const ChangeLanguage = () => {

    const router = useRouter()

    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-light" size="sm" id="dropdown-basic">
                {router.locale}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    LanguageList.map(item => (
                        <Dropdown.Item
                            key={item.id}
                            onClick={() => router.push(router.pathname, router.asPath, {
                                locale: item.id
                            })}
                        >{item.name}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}