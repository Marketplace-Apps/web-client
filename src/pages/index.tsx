import CenteredSpinner from 'components/CenteredSpinner'
import {auth, firestore} from 'firebase'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {DomainDocument} from 'types/firebase'

const SelectDomainPage = () => {
	const router = useRouter()

	const [domains, loading, error] = useCollectionData<DomainDocument>(
		firestore().collection('domains').where("owner", "==", auth().currentUser.email)
	)

	const [isDisplayDomainSelection, setIsDisplayDomainSelection] = useState<boolean>(false)


	useEffect(() => {
		const fn = async () => {
			if (!domains) return
			if (domains.length === 1) router.push(
				'/domain/[domainId]',
				`/domain/${domains[0].id}`
			)
			else setIsDisplayDomainSelection(true)
		}
		fn()
	}, [domains])

	return (
		<>
			{
				loading || !isDisplayDomainSelection && <CenteredSpinner />
			}
			{
				domains && isDisplayDomainSelection && (
					<Form>
						<Form.Group>
							<Form.Label>Custom select</Form.Label>
							<Form.Control as="select" custom>
								{
									domains.map(domain => (
										<option
											value={domain.id}
										>
											{
												domain.domain_name
											}
										</option>
									))
								}
							</Form.Control>
						</Form.Group>
					</Form>
				)
			}
			{
				!domains && !loading && !error && <Error statusCode={400} title="Bạn chưa có domain nào" />
			}
		</>
	)
}

export default SelectDomainPage