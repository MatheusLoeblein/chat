export default interface HttpServer {
    on(method: string, url: string, callback: Function, privateRoute: boolean): void;
    listen(port: number): void;
    close(): void
}
