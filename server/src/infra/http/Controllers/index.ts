import { Controller } from "./inteface"

export class ControllerManager {
    controllers: Controller[]
    static instance: ControllerManager

    constructor() {
        this.controllers = []
    }

    registerRouter(controller: Controller) {
        this.controllers.push(controller)
    }

    async startRouters() {
        this.controllers.forEach(async controller => {
            await controller.init()
        })
    }

    static getInstance(){
        if(!ControllerManager.instance){
            ControllerManager.instance = new ControllerManager()
        }
        return ControllerManager.instance
    }
}


