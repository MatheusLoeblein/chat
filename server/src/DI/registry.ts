export default class Registry {
    private dependecies: { [name: string]: any }
    static instance: Registry

    private constructor() {
        this.dependecies = {}
    }

    provide(name: string, dependency: any) {
        this.dependecies[name] = dependency
    }

    inject(name: string) {
        return this.dependecies[name]
    }

    static getInstance() {
        if (!Registry.instance) {
            Registry.instance = new Registry()
        }
        return Registry.instance
    }
}