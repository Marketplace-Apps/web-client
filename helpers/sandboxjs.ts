export class SanboxJS {

    static eval(expression, ...args: any[]) {
        console.log({ expression, args })
        const fn =  new Function(`return (${expression})(... arguments)`)
        return fn(... args)
    }
}