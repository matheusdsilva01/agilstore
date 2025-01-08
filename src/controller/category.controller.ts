import { Category, CategoryController, CategoryUseCase } from 'interfaces'
import { CategoryRepositoryDB } from 'repositories'
import { CategoryUseCaseImpl } from 'usecases'


export class CategoryControllerImpl implements CategoryController {
    private categoryUseCase: CategoryUseCase

    constructor() {
        this.categoryUseCase = new CategoryUseCaseImpl(new CategoryRepositoryDB())
    }

    getByName(name: string): Category | null {
        return this.categoryUseCase.getByName(name)
    }
}