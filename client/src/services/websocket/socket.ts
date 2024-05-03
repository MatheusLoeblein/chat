import { io } from 'socket.io-client'

export const socket = io('http://localhost:7454/', {
    autoConnect: false
})