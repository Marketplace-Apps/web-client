
import { firestore } from 'firebase/app'
import { Children, Component, useEffect, useRef, useState } from 'react'
import { GiConsoleController } from 'react-icons/gi'
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
	pagingBy: K = 'created_at' as any,
	limit: number = 10,
	direction: 'desc' | 'asc' = 'desc'
) => {

	const list = useRef<Array<firestore.QueryDocumentSnapshot<T>>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(false)
	const [listeners] = useState(new ListenerManager())
	const [queue] = useState(new Queue())
	const [_, __] = useState(0)

	function sort(a, b) {
		if (typeof a[pagingBy] == 'number') return (a[pagingBy] - b[pagingBy]) as number
		if (typeof a[pagingBy] == 'string') return (a[pagingBy] as string).localeCompare(b[pagingBy])
	}

	async function sync(docs: firestore.DocumentChange<T>[]) {

		const exists_ids = new Set(list.current.map(d => d.id))
		const removed = new Set(docs.filter(x => x.type == 'removed').map(x => x.doc.id))
		const added = docs.filter(d => !exists_ids.has(d.doc.id)).map(d => d.doc)
		const modified = new Map(docs
			.filter(d => d.type != 'removed' && exists_ids.has(d.doc.id))
			.map(d => [d.doc.id, d.doc])
		)

		console.log({ removed, added, modified })


		const newData = [
			...list.current
				.filter(item => !removed.has(item.id))
				.map(d => modified.has(d.id) ? modified.get(d.id) : d),
			...added
		].sort((a, b) => sort(a.data(), b.data()) * (direction == 'asc' ? 1 : -1))

		list.current = newData
		__(Math.random())

	}

	function queryBuilder(startAfter: firestore.QueryDocumentSnapshot<T>, limit: number = 1) {

		const collection = firestore().collection(ref)
		let query = collection.limit(limit)
		for (const [fieldPath, opStr, value] of where) {
			query = query.where(fieldPath as string, opStr, value)
		}
		query = query.orderBy(pagingBy as any, direction)
		if (startAfter) {
			console.log({ startAfter })
			query = query.startAfter(startAfter)
		}
		return query
	}


	async function fetchMore() {
		setLoading(true)
		setError(null)
		setHasMore(false)

		const startAfter = list.current && list.current[list.current.length - 1]
		const lastDoc = await new Promise<firestore.QueryDocumentSnapshot<T>>(s => {
			const query = queryBuilder(startAfter, limit)
			listeners.push(query.onSnapshot(
				(snapshot: firestore.QuerySnapshot<T>) => {
					const docs = snapshot.docChanges()
					s(docs[docs.length - 1].doc)
					queue.push(() => sync(docs))
				},
				setError as any
			))
		})
		const nextDocuments = await queryBuilder(lastDoc, 1).get()
		setHasMore(!nextDocuments.empty)
		setLoading(false)
	}

	useEffect(() => {
		fetchMore()
		return () => {
			listeners.clear()
			queue.clear()
		}
	}, [ref, JSON.stringify(where), limit, pagingBy, direction])

	return {
		data: list.current.map(d => d.data()),
		loading,
		error,
		fetchMore,
		hasMore,
	}
}

 