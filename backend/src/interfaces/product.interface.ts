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

export interface ProductRepository {
    create(payload: CreateProductPayload): Promise<Product>
    list(): Promise<Product[]>
    get(search: string): Promise<Product | undefined>
    getById(id: string): Promise<Product | null>
    update(id: string, payload: UpdateProductPayload): Promise<Product | null>
    delete(id: string): Promise<void>
}

export interface ProductController {
    create(payload: CreateProductPayload): Promise<Product>
    list(): Promise<Product[]>
    getById(id: string): Promise<Product | undefined>
    update(id: string, payload: CreateProductPayload): Promise<Product | null>
    delete(id: string): Promise<void>
    get(search: string): Promise<Product | undefined>
}