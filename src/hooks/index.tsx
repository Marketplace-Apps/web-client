import { firestore } from 'firebase/app'
import { useEffect, useState } from 'react'

export const useCollectionData = <T extends {}>(
	ref: string,
	where: Array<
		[
			fieldPath: string | firestore.FieldPath,
			opStr: firestore.WhereFilterOp,
			value: any,
		]
	> = [],
	direction: 'desc' | 'asc' = 'desc',
) => {
	const LIMIT = 10

	const [data, setData] = useState<Array<T>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(false)

	async function fetchMore() {
		setLoading(true)
		try {
			const query = firestore().collection(ref)
			for (const [fieldPath, opStr, value] of where) {
				query.where(fieldPath, opStr, value)
			}

			query.orderBy('created_at', direction).startAt(data[data.length - 1])
			const dataRef = query.onSnapshot(snapshot => {
				for (const item of snapshot.docChanges()) {
					if (item.type == 'added') {
					}
					if (item.type == 'modified') {
					}
					if (item.type == 'removed') {
					}
				}
			})
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}

	console.log({ data })

	useEffect(() => {
		setData([])
		fetchMore()
	}, [ref])

	return {
		data: data.map(el => el.item),
		loading,
		error,
		fetchMore,
		hasMore,
	}
}
