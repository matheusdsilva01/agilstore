import { ProductControllerImpl } from 'controller'
import type {  FastifyInstance } from 'fastify'
import { CreateProductPayload, UpdateProductPayload } from 'interfaces'
import { z } from 'zod'

export async function productRoutes(server: FastifyInstance) {
    const productController = new ProductControllerImpl()

    server.post<{ Body: CreateProductPayload }>('/', (req, res) => {
        const { category, name, price, stock } = req.body
        // const categoryController = new CategoryControllerImpl()

        const schema = z.object({
            name: z.string().min(1),
            category: z.string().min(1),
            stock: z.number().nonnegative().min(1),
            price: z.number().nonnegative().min(1)
        })
        const body = schema.safeParse(req.body)

        try {
            if (!body.success) {
                throw new Error('Invalid params')
            }
            const data = productController.create({
                category,
                name,
                price,
                stock
            })
            return res.status(201).send(data)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Something error has occurred' })
        }
    })

    server.get('/', (_req, res) => {
        try {
            const data = productController.list()
            return res.status(200).send(data)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Something error has occurred' })
        }
    })
    
    server.put<{ Body: UpdateProductPayload
        Params: { id: string } }>('/:id', (req, res) => {
        const productId = req.params.id
        const schema = z.object({
            name: z.string().min(1).optional(),
            category: z.string().min(1).optional(),
            stock: z.number().nonnegative().min(1).optional(),
            price: z.number().nonnegative().min(1).optional()
        }).refine(schema => Object.keys(schema).length > 0)

        const body = schema.safeParse(req.body)

        try {
            if (!productId) {
                throw new Error('Invalid ID product')
            }
            const product = productController.getById(productId)

            if (!product) {
                throw new Error(`Product with id: '${productId}', not exists`)
            }
            if (!body.success) {
                throw new Error('Invalid params')
            }
            const data = productController.update(productId, {
                ...product,
                ...body.data
            })
            return res.send(data)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Something error has occurred' })
        }
    })

    server.delete<{ Params: { id: string } }>('/:id', (req, res) => {
        const productId = req.params.id
        try {
            if (!productId) {
                throw new Error('ID product has required')
            }
            const product = productController.getById(productId)
            if (!product) {
                throw new Error(`The product with id: ${productId} not exists`)
            }
            productController.delete(productId)
            return res.send({ message: 'ok' })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).send({ message: error.message })
            }
            return res.status(400).send({ message: 'Something error has occurred' })
        }
    })

    server.get<{ Params: { search: string } }>('/:search', (req, res) => {
        const search = req.params.search
        try {
            if (!search) {
                throw new Error('Search filter has required')
            }
            const data = productController.get(search)
            if (!data) {
                throw new Error('Nothing products found')
            }
            return res.status(200).send(data)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).send({ message: error.message })
            }
            return res.status(400).send({ message: 'Something error has occurred' })
        }
    })
}