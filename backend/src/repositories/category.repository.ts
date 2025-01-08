import { db } from 'database/db'
import { Category, CategoryRepository } from 'interfaces'

export class CategoryRepositoryDB implements CategoryRepository {
    getById(id: string): Category | null {
        const categories = db.category
        const category = categories.find(cat => cat.id === id)
        if (!category) {
            return null
        }
        return category
    }

    getByName(name: string): Category | null {
        const categories = db.category
        const category = categories.find(cat => cat.name === name)
        if (!category) {
            return null
        }
        return category
    }
}