import vm from 'vm-browserify'

export const classifyDataByField = <TKey, TElement extends { key: TKey }>(
	source: TElement[],
): Array<{
	key: TKey
	data: Array<TElement>
}> => {
	const store = new Map<TKey, TElement[]>()
	for (const data of source) {
		if (store.has(data.key)) store.set(data.key, [...store.get(data.key), data])
		else {
			store.set(data.key, [data])
		}
	}
	return [...store.keys()].map(key => ({
		key,
		data: store.get(key),
	}))
}

export const classifyDataByDay = <T extends { created_at: number }>(
	source: T[],
): Array<{
	day: string
	data: T[]
}> => {
	const store = new Map<string, T[]>()
	for (const data of source) {
		const day = new Date(data.created_at).toLocaleDateString('vi')
		if (store.has(day)) store.set(day, [...store.get(day), data])
		else {
			store.set(day, [data])
		}
	}
	return [...store.keys()].map(day => ({
		day,
		data: store.get(day),
	}))
}

export const omit = <T>(source: T, keys: string[]) =>
	Object.keys(source)
		.filter(k => !keys.includes(k))
		.reduce((acc, key) => ((acc[key] = source[key]), acc), {})

export const compileJavascriptCode = (code: string, context: object) => {
	try {
		const result = vm.runInNewContext(code, context)
		return result
	} catch (error) {
		console.error({ error })
		return code
	}
}

export const isScrollToBottom = () => {
	const windowHeight =
		'innerHeight' in window
			? window.innerHeight
			: document.documentElement.offsetHeight
	const body = document.body
	const html = document.documentElement
	const docHeight = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight,
	)
	const windowBottom = windowHeight + window.pageYOffset
	if (windowBottom >= docHeight) return true
	return false
}
