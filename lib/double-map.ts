export default class DoubleMap<T, S> {
    mapOne = new Map<T, S>()
    mapTwo = new Map<S, T>()

    set(k: T, v: S) {
        this.mapOne.set(k, v)
        this.mapTwo.set(v, k)
    }

    getOne(k: T) {
        return this.mapOne.get(k)
    }

    getTwo(v: S) {
        return this.mapTwo.get(v)
    }
}
