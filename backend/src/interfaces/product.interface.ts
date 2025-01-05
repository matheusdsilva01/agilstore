export type Product = {
    id: string
    name: string
    price: number
    stock: number
    category: string
}

export type CreateProductPayload = {
    name: string
    price: number
    stock: number
    category: string
}

export type UpdateProductPayload = {
    name?: string
    price?: number
    stock?: number
    category?: string
}

export interface ProductUseCase {
    create(payload: CreateProductPayload): Product
    list(): Product[]
    get(search: string): Product | undefined
    getById(id: string): Product | null
    update(id: string, payload: UpdateProductPayload): Product | null
    delete(id: string): void
}

export interface ProductRepository {
    create(payload: CreateProductPayload): Product
    list(): Product[]
    get(search: string): Product | undefined
    getById(id: string): Product | null
    update(id: string, payload: UpdateProductPayload): Product | null
    delete(id: string): void
}

export interface ProductController {
    create(payload: CreateProductPayload): Product
    list(): Product[]
    getById(id: string): Product | undefined
    update(id: string, payload: CreateProductPayload): Product | null
    delete(id: string): void
    get(search: string): Product | undefined
}