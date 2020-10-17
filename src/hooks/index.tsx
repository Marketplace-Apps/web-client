import { firestore } from 'firebase/app'
import { useEffect, useRef, useState } from 'react'
import ListTransactionsItem from '../domain/transaction/ListTransactionsItem'

class Queue {

	private queue = []
	private running = false

	push(fn: () => Promise<any>) {
		this.queue.push(fn)
		if (this.running) return
		this.excute()
	}

	private async excute() {
		this.running = true
		while (this.queue.length > 0) {
			const fn = this.queue.shift()
			try {
				await fn()
			} catch (e) {
				console.error({ e })
			}
		}
		this.running = false
	}

	clear() {
		this.queue = []
	}
}


class ListenerManager {
	private fns: Function[] = []

	constructor() { }

	push(fn: Function) {
		this.fns.push(fn)
	}

	clear() {
		this.fns.map(fn => fn())
	}
}

export const useCollectionData = <T extends {}, K extends keyof T = keyof T>(
	ref: string,
	where: Array<
		[
			fieldPath: K,
			opStr: firestore.WhereFilterOp,
			value: string | number | boolean
		]
	> = [],
	limit: number = 10,
	pagingBy: K = 'created_at' as any,
	direction: 'desc' | 'asc' = 'desc'
) => {


	const list = useRef<Array<{ item: T, id: string }>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(false)
	const [listeners] = useState(new ListenerManager())
	const [queue] = useState(new Queue())
	const [endDoc, setEndDoc] = useState<T>(null)
	const [index, setIndex] = useState(0)

	async function sync(snapshot: firebase.firestore.QuerySnapshot<T>) {
		const docs = snapshot.docChanges()
		const exists_ids = new Set(list.current.map(d => d.id))
		const removed = new Set(docs.filter(x => x.type == 'removed').map(x => x.doc.id))
		const added = docs.filter(x => !exists_ids.has(x.doc.id))
		const modified = new Map(docs
			.filter(d => d.type != 'removed' && exists_ids.has(d.doc.id))
			.map(d => [d.doc.id, d.doc.data()])
		)

		console.log(`Sync data realtime `, { removed, added, modified })

		const newData = [
			...list.current
				.filter(item => !removed.has(item.id))
				.map(d => modified.has(d.id) ? { id: d.id, item: modified.get(d.id) } : d),
			...added.map(item => ({ id: item.doc.id, item: item.doc.data() }))
		]
		list.current = newData
		setEndDoc(newData[newData.length - 1].item)
		setIndex(Math.random())

	}

	function queryBuilder(startAfter, queryLimit = limit) {

		const collection = firestore().collection(ref)
		let query = collection.limit(queryLimit)
		for (const [fieldPath, opStr, value] of where) {
			query = query.where(fieldPath as string, opStr, value)
		}

		if (startAfter) {
			query = query.orderBy(pagingBy as any, direction)
			query = query.startAfter(startAfter)
		}
		return query
	}


	async function fetchMore() {
		!loading && setLoading(true)

		const lastDoc = await new Promise<firestore.QueryDocumentSnapshot<T>>(s => {
			const query = queryBuilder(endDoc)
			listeners.push(query.onSnapshot(
				(snapshot: firestore.QuerySnapshot<T>) => {
					const docs = snapshot.docs
					s(docs[docs.length - 1])
					queue.push(() => sync(snapshot as any))
				},
				setError as any
			))
		})

		const queryNextDocument = await queryBuilder(lastDoc, 1).get()
		setHasMore(!queryNextDocument.empty)
		loading && setLoading(false)
		lastDoc.data() && setEndDoc(lastDoc.data())
	}

	useEffect(() => {
		 
		endDoc && setEndDoc(null)
		error && setError(null)
		hasMore && setHasMore(false)

		fetchMore()

		return () => {
			listeners.clear()
			queue.clear()
		}
	}, [ref, JSON.stringify(where), limit, pagingBy, direction])

	return {
		data: list.current.map(x => x.item),
		loading,
		error,
		fetchMore,
		hasMore,
	}
}
