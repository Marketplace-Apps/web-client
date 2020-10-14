import vm from 'vm-browserify'

export const classifyDataByTag = <T extends { tag: string }>(
	source: T[],
): Array<{
	tag: string
	data: T[]
}> => {
	const store = new Map<string, T[]>()
	for (const data of source) {
		if (store.has(data.tag)) store.set(data.tag, [...store.get(data.tag), data])
		else {
			store.set(data.tag, [data])
		}
	}
	const tags = [...store.keys()]
	return tags.map(tag => ({
		tag,
		data: store.get(tag),
	}))
}

export const omit = <T extends {}>(source: T, keys: string[]) =>
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
