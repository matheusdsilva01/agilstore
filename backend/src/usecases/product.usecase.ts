import { CreateProductPayload, Product, ProductRepository, UpdateProductPayload } from 'interfaces'

export class ProductUseCase {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async create(payload: CreateProductPayload): Promise<Product> {
        return this.productRepository.create(payload)
    }

    async list(): Promise<Product[]> {
        return this.productRepository.list()
    }
    
    async getById(id: string): Promise<Product | null> {
        return this.productRepository.getById(id)
    }

    async get(search: string): Promise<Product | undefined> {
        return this.productRepository.get(search)
    }

    async update(id: string, payload: UpdateProductPayload): Promise<Product | null> {
        return this.productRepository.update(id, payload)
    }

    async delete(id: string): Promise<void> {
        return this.productRepository.delete(id)
    }
}