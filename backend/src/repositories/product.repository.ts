import { randomUUID } from 'crypto'
import { db } from 'database/db'
import { CreateProductPayload, Product, ProductRepository } from 'interfaces'

export class ProductRepositoryDB implements ProductRepository {

    async get(search: string): Promise<Product | undefined> {
        return db.products.find(product => product.id === search || product.name.toLowerCase().includes(search.toLowerCase()))       
    }

    async create(payload: CreateProductPayload): Promise<Product> {
        const newProduct: Product = {
            id: randomUUID(),
            name: payload.name,
            price: payload.price,
            category: payload.category,
            stock: payload.stock
        }
        db.products.push(newProduct)
        return newProduct
    }

    async getById(id: string): Promise<Product | null> {
        const category = db.category
        const product = db.products.find(product => product.id === id)
        if (!product) {
            return null
        }
        return {
            ...product,
            category: category.find(cat => cat.id === product.category)!.name as string
        }
    }

    async update(id: string, payload: CreateProductPayload): Promise<Product | null> {
        const productIndex = db.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            return null
        }

        const updatedProduct: Product = {
            id,
            name: payload.name,
            price: payload.price,
            category: payload.category,
            stock: payload.stock
        }
        db.products[productIndex] = updatedProduct

        return updatedProduct
    }

    async delete(id: string): Promise<void> {
        const productIndex = db.products.findIndex(product => product.id === id)
        if (productIndex !== -1) {
            db.products.splice(productIndex, 1)
        }
    }

    async list(): Promise<Product[]> {
        const category = db.category
        return db.products.map(product => ({
            ...product,
            category: category.find(cat => cat.id === product.category)!.name
        }))
    }
}