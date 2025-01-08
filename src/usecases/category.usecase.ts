import { Category, CategoryRepository, CategoryUseCase } from 'interfaces'

export class CategoryUseCaseImpl implements CategoryUseCase {
    private categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    getById(id: string): Category | null {
        return this.categoryRepository.getById(id)
    }

    getByName(name: string): Category | null {
        return this.categoryRepository.getByName(name)
    }
}