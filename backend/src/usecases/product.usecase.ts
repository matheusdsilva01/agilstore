import { CreateProductPayload, Product, ProductRepository, ProductUseCase, UpdateProductPayload } from 'interfaces'

export class ProductUseCaseImpl implements ProductUseCase {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    create(payload: CreateProductPayload): Product {
        return this.productRepository.create(payload)
    }

    list(): Product[] {
        return this.productRepository.list()
    }
    
    getById(id: string): Product | null {
        return this.productRepository.getById(id)
    }

    get(search: string): Product | undefined {
        return this.productRepository.get(search)
    }

    update(id: string, payload: UpdateProductPayload): Product | null {
        return this.productRepository.update(id, payload)
    }

    delete(id: string): void {
        return this.productRepository.delete(id)
    }
}