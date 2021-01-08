
function group_array_by_key<T, K extends keyof T>(
    items: T[],
    ...keys: K[]
) {

    const map = new Map()
    for (const item of items) {
        let cursor: Map<string, any> = map

        for (const [index, key_name] of keys.entries()) {
            const key = item[key_name as string]
            if (!cursor.has(key)) cursor.set(key, index + 1 < keys.length ? new Map() : item)
            cursor = cursor.get(key)
        }
    }
    return map
}
export function groupByKey<T>(items: T[], group_key: keyof T) {
    return group_array_by_key(items, group_key) as Map<string, T>
}

export function groupBy2Key<T>(items: T[], group_key: keyof T, id_key: keyof T) {
    return group_array_by_key(items, group_key, id_key) as Map<string, Map<string, T>>
}

export function groupBy3Key<T>(items: T[], group_key1: keyof T, group_key2: keyof T, id_key: keyof T) {
    return group_array_by_key(items, group_key1, group_key2, id_key) as Map<string, Map<string, Map<string, T>>>
}


export function groupByCreatedTime<T extends { id: string, created_at: number }>(items: T[]) {
    const list = items.map(item => ({
        ...item,
        __day: new Date(item.created_at).toLocaleDateString('vi') 
    }))
    const grouped = groupBy2Key(list, '__day', 'id')
    const list_day = [...grouped.keys()].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    return list_day
    .map(day => ({
        day,
        list: [...grouped.get(day).values()].sort((b, a) => b.created_at - a.created_at)
    }))
    .sort((a,b) => b.list[0].created_at - a.list[0].created_at)
}