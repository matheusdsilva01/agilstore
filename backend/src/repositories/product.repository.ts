import { randomUUID } from 'node:crypto'
import { CreateProductPayload, ListFilters, Product, ProductRepository } from 'interfaces'
import { getDatabaseData, writeJsonDB } from 'utils'

export class ProductRepositoryDB implements ProductRepository {
    get(search: string): Product | undefined {
        const database = getDatabaseData()
        const products = database.products
        return products.find(product => product.id === search || product.name.toLowerCase().includes(search.toLowerCase()))       
    }

    create(payload: CreateProductPayload): Product {
        const database = getDatabaseData()
        const products = database.products

        const newProduct: Product = {
            id: randomUUID(),
            name: payload.name,
            price: payload.price,
            category: payload.category,
            stock: payload.stock,
            created_at: new Date().toISOString()
        }
        products.push(newProduct)
        writeJsonDB({
            ...database,
            products
        })
        return newProduct
    }
    
    getById(id: string): Product | null {
        const database = getDatabaseData()
        const products = database.products

        const product = products.find(product => product.id === id)
        if (!product) {
            return null
        }
        return product
    }

    update(id: string, payload: CreateProductPayload): Product | null {
        const database = getDatabaseData()
        const products = database.products

        const productIndex = products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            return null
        }

        const updatedProduct: Product = {
            id,
            name: payload.name,
            price: payload.price,
            category: payload.category,
            stock: payload.stock,
            created_at: products[productIndex].created_at
        }
        products[productIndex] = updatedProduct

        writeJsonDB({
            ...database,
            products
        })
        
        return updatedProduct
    }

    delete(id: string): void {
        const database = getDatabaseData()
        const products = database.products

        const productIndex = products.findIndex(product => product.id === id)
        if (productIndex !== -1) {
            products.splice(productIndex, 1)
        }
        writeJsonDB({
            ...database,
            products
        })
    }

    list(filters: ListFilters): Product[] {
        const products = getDatabaseData().products

        switch (filters.orderBy) {
            case 'name':
                products.sort((a, b) => {
                    if (filters.sort === 'asc') {
                        return a.name.localeCompare(b.name)
                    }
                    return b.name.localeCompare(a.name)
                })
                break
            case 'stock':
                products.sort((a, b) => {
                    if (filters.sort === 'asc') {
                        return a.stock - b.stock
                    }
                    return b.stock - a.stock
                })
                break
            case 'price':
                products.sort((a, b) => {
                    if (filters.sort === 'asc') {
                        return a.price - b.price
                    }
                    return b.price - a.price
                })
                break
            default:
                products.sort((a, b) => {
                    if (filters.sort === 'asc') {
                        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                    }
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                })
        }
        if (filters.category) {
            return products.filter(product => product.category === filters.category)
        }
        return products
    }
}