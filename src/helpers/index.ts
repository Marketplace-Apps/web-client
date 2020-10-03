import Velocity from 'velocityjs'

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

export const omit = <T extends {}> (source: T, keys: string[]) => Object.keys(source)
	.filter(k => !keys.includes(k))
	.reduce((acc, key) => ((acc[key] = source[key]), acc), {})

export const compileVtlString = (input: string, data: Object) => {
	const vm = input.includes("#set") ? input : `
		#set ($result = ${input})
		$result
	`
	try
	{
		const result = JSON.parse(Velocity.render(
			vm,
			{
				...data,
				moreThan: (firstNumber: number, secondNumber: number, resultOne: any, resultTwo?: any) => firstNumber > secondNumber ? resultOne : (resultTwo ?? false),
				moreThanOrEqual: (firstNumber: number, secondNumber: number, resultOne: any, resultTwo?: any) => firstNumber >= secondNumber ? resultOne : (resultTwo ?? false),
				lessThan: (firstNumber: number, secondNumber: number, resultOne: any, resultTwo?: any) => firstNumber < secondNumber ? resultOne : (resultTwo ?? false),
				lessThanOrEqual: (firstNumber: number, secondNumber: number, resultOne: any, resultTwo?: any) => firstNumber <= secondNumber ? resultOne : (resultTwo ?? false),
				equal: (firstNumber: number, secondNumber: number) => firstNumber === secondNumber,
				notEqual: (firstNumber: number, secondNumber: number) => firstNumber !== secondNumber,
				includes: (source: string | Array<any>, target: any) => source.includes(target),
				between: (target: number, min: number, max: number) => min <= target && target <= max,
				notBetween: (target: number, min: number, max: number) => target < min && target > max,
				if: (condition: boolean, trueResult: any, falseResult: any) => condition ? trueResult : falseResult,
				max: (...args: any[]) => Math.max(...args),
				min: (...args: any[]) => Math.min(...args),
				switch: (...args: any[]) => args.filter(x => x)[0]
			}
		).trim())
		return result
	} catch (error)
	{
		return 0
	}
}

