export const classifyDataByTag = <T extends {tag: string}> (
	source: T[],
): Array<{
	tag: string
	data: T[]
}> => {
	const store = new Map<string, T[]>()
	for (const data of source)
	{
		if (store.has(data.tag))
			store.set(data.tag, [...store.get(data.tag), data])
		else
		{
			store.set(data.tag, [data])
		}
	}
	const tags = [...store.keys()]
	return tags.map(tag => ({
		tag,
		data: store.get(tag),
	}))
}
