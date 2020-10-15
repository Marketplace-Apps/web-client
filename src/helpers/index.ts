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
