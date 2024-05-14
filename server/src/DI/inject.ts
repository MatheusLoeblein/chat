import Registry from "./registry"

export function inject(name: string) {
    return function (obj: any, propertyKey: string) {
        obj[propertyKey] = new Proxy({}, {
            get(target: any, propertyKey: string) {
                const dependency = Registry.getInstance().inject(name);
                return dependency[propertyKey];
            }
        });
    }

}