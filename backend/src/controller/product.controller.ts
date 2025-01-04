import { CreateProductPayload, Product, ProductController, UpdateProductPayload } from 'interfaces'
import { ProductRepositoryDB } from 'repositories/product.repository'
import { ProductUseCase } from 'usecases'

export class ProductControllerImpl implements ProductController {
    private productUseCase: ProductUseCase

    constructor() {
        this.productUseCase = new ProductUseCase(new ProductRepositoryDB())
    }

    async create(payload: CreateProductPayload): Promise<Product> {
        return this.productUseCase.create(payload)
    }

    async list(): Promise<Product[]> {
        return this.productUseCase.list()
    }

    async getById(id: string): Promise<Product | undefined> {
        return this.productUseCase.get(id)
    }

    async update(id: string, payload: UpdateProductPayload): Promise<Product | null> {
        return this.productUseCase.update(id, payload)
    }

    async delete(id: string): Promise<void> {
        return this.productUseCase.delete(id)
    }

    async get(search: string): Promise<Product | undefined> {
        return this.productUseCase.get(search)
    } 
}