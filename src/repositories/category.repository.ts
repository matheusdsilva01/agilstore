import { getDatabaseData } from 'utils'
import { Category, CategoryRepository } from 'interfaces'

export class CategoryRepositoryDB implements CategoryRepository {
    getById(id: string): Category | null {
        const database = getDatabaseData()
        const categories = database.category
        const category = categories.find(cat => cat.id === id)
        if (!category) {
            return null
        }
        return category
    }

    getByName(name: string): Category | null {
        const database = getDatabaseData()
        const categories = database.category
        const category = categories.find(cat => cat.name === name)
        if (!category) {
            return null
        }
        return category
    }
}