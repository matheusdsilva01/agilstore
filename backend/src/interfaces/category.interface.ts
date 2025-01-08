export type Category = {
    id: string
    name: string
}

export interface CategoryUseCase {
    getById(id: string): Category | null
    getByName(name: string): Category | null
}

export interface CategoryRepository {
    getById(id: string): Category | null
    getByName(name: string): Category | null
}

export interface CategoryController {
    getByName(name: string): Category | null
}