import { CreateProductPayload, Product, ProductController, UpdateProductPayload } from 'interfaces'
import { ProductRepositoryDB } from 'repositories/product.repository'
import { ProductUseCaseImpl } from 'usecases'

export class ProductControllerImpl implements ProductController {
    private productUseCase: ProductUseCaseImpl

    constructor() {
        this.productUseCase = new ProductUseCaseImpl(new ProductRepositoryDB())
    }

    create(payload: CreateProductPayload) {
        return this.productUseCase.create(payload)
    }

    list(): Product[] {
        return this.productUseCase.list()
    }

    getById(id: string): Product | undefined {
        return this.productUseCase.get(id)
    }

    update(id: string, payload: UpdateProductPayload): Product | null {
        return this.productUseCase.update(id, payload)
    }

    delete(id: string): void {
        return this.productUseCase.delete(id)
    }

    get(search: string): Product | undefined {
        return this.productUseCase.get(search)
    } 
}