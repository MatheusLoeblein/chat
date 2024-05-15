export interface WebSocketServer {
    on(event: string, callback: Function): void
    listen(port: number): void
    close(): void
}