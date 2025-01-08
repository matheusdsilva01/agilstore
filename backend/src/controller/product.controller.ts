import { CategoryUseCase, CreateProductPayload, ListFilters, Product, ProductController, ProductUseCase, UpdateProductPayload } from 'interfaces'
import { CategoryRepositoryDB, ProductRepositoryDB } from 'repositories'
import { CategoryUseCaseImpl, ProductUseCaseImpl } from 'usecases'

export class ProductControllerImpl implements ProductController {
    private productUseCase: ProductUseCase

    private categoryUseCase: CategoryUseCase

    constructor() {
        this.productUseCase = new ProductUseCaseImpl(new ProductRepositoryDB())
        this.categoryUseCase = new CategoryUseCaseImpl(new CategoryRepositoryDB())
    }

    create(payload: CreateProductPayload) {
        const category = payload.category
        const categoryExist = this.categoryUseCase.getByName(category)

        if (!categoryExist) {
            throw new Error('A categoria informada não existe.')
        }
        
        return this.productUseCase.create(payload)
    }
    
    list(filters: ListFilters): Product[] {
        const category = filters.category
        if (category) {
            const categoryExist = this.categoryUseCase.getByName(category)
            
            if (!categoryExist) {
                throw new Error('A categoria informada não existe.')
            }
        }
        return this.productUseCase.list(filters)
    }
    
    getById(id: string): Product | undefined {
        return this.productUseCase.get(id)
    }
    
    update(id: string, payload: UpdateProductPayload): Product | null {
        const category = payload.category
        if (category) {
            const categoryExist = this.categoryUseCase.getByName(category)
        
            if (!categoryExist) {
                throw new Error('A categoria informada não existe.')
            }
        }
        return this.productUseCase.update(id, payload)
    }

    delete(id: string): void {
        return this.productUseCase.delete(id)
    }

    get(search: string): Product | undefined {
        return this.productUseCase.get(search)
    } 
}