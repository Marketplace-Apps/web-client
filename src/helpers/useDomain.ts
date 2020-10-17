import { useState, useEffect } from 'react'

let cached_domain = null


export function useDomain() {
    const [domain, setDomain] = useState(cached_domain)

    useEffect(() => {
        if (cached_domain) return


    })


}


export class CustomHook {

    private static cached_domain = null
    private static loading: null | Promise<any> = null


    static useDomain() {
        const [domain, setDomain] = useState(this.cached_domain)

        useEffect(() => {
            if (this.loading) {
                this.loading.then(setDomain)
                return
            }


        })

        return [domain, setDomain]
    }

}