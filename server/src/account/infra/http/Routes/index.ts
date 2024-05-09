import { Router } from "./inteface"

class RountersManager {
    routers: Router[]

    constructor() {
        this.routers = []
    }

    registerRouter(router: Router) {
        this.routers.push(router)
    }

    async startRouters() {
        this.routers.forEach(async router => {
            await router.init()
        })
    }
}

export const Routers = new RountersManager()

