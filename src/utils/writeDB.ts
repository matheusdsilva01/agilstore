import { AppError } from 'errors'
import { readFileSync, writeFileSync } from 'fs'
import { Database } from 'interfaces'

export function writeJsonDB(data: unknown): void {
    try {
        return writeFileSync('database/database.json', JSON.stringify(data), 'utf-8')
    } catch (err) {
        console.error(err)
        throw new AppError('Erro ao acessar a base de dados', 500)
    }
}

export function getDatabaseData(): Database {
    try {
        const data = readFileSync('database/database.json', 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
        throw new AppError('Erro ao acessar a base de dados', 500)
    }
}