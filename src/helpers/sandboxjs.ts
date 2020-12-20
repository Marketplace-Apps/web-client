export class SanboxJS {

    static eval(expression, ...args: any[]) {
        const fn = new Function(`return (${expression})(... arguments)`)
        return fn(...args)
    }
}