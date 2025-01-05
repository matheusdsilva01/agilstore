import { randomUUID } from 'crypto'
import { db } from 'database/db'
import { CreateProductPayload, Product, ProductRepository } from 'interfaces'

export class ProductRepositoryDB implements ProductRepository {

    get(search: string): Product | undefined {
        return db.products.find(product => product.id === search || product.name.toLowerCase().includes(search.toLowerCase()))       
    }

    create(payload: CreateProductPayload): Product {
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

    getById(id: string): Product | null {
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

    update(id: string, payload: CreateProductPayload): Product | null {
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

    delete(id: string): void {
        const productIndex = db.products.findIndex(product => product.id === id)
        if (productIndex !== -1) {
            db.products.splice(productIndex, 1)
        }
    }

    list(): Product[] {
        const category = db.category
        return db.products.map(product => ({
            ...product,
            category: category.find(cat => cat.id === product.category)!.name
        }))
    }
}