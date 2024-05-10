import { config } from "dotenv";
import { randomUUID } from 'crypto'

config()

const randomName = randomUUID().slice(0, 4)

export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.NODE_ENV === 'test' ? `${randomName}-test` : process.env.DB_NAME
export const DB_PORT = process.env.DB_PORT
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const JWT_SERCRET = process.env.JWT_SECRET
