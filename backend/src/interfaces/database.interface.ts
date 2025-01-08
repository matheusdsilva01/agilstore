import { Category } from './category.interface'
import { Product } from './product.interface'

export interface Database {
    products: Product[]
    category: Category[]
}