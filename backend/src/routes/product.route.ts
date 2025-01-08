import { ProductControllerImpl } from 'controller'
import { AppError } from 'errors'
import type { FastifyInstance } from 'fastify'
import { CreateProductPayload, ListFilters, UpdateProductPayload } from 'interfaces'
import { z } from 'zod'

export async function productRoutes(server: FastifyInstance) {
    const productController = new ProductControllerImpl()

    server.post<{ Body: CreateProductPayload }>('/', (req, res) => {
        const { category, name, price, stock } = req.body

        const schema = z.object({
            name: z.string().min(1),
            category: z.string().min(1),
            stock: z.number().nonnegative().min(1),
            price: z.number().nonnegative().min(1)
        })
        const body = schema.safeParse(req.body)

        try {
            if (!body.success) {
                throw new AppError('Parâmetros inválidos', 400)
            }
            const data = productController.create({
                category,
                name,
                price,
                stock
            })
            return res.status(201).send(data)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Ocorreu um erro desconhecido' })
        }
    })

    server.get('/', (req, res) => {
        const queryParams = req.query as ListFilters

        const schema = z.object({
            category: z.string().min(1).optional(),
            orderBy: z.union([z.literal('name'), z.literal('stock'), z.literal('price')]).optional(),
            sort: z.union([z.literal('asc'), z.literal('desc')]).optional()
        }).strict()

        const params = schema.safeParse(queryParams)
        
        try {
            if (!params.success) {
                throw new AppError('Parâmetros inválidos', 400)
            }
            const data = productController.list(params.data)
            return res.status(200).send(data)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Ocorreu um erro desconhecido' })
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
                throw new AppError('ID do produto é obrigatório', 400)
            }
            const product = productController.getById(productId)

            if (!product) {
                throw new Error(`Produto com id: '${productId}', não existe`)
            }
            if (!body.success) {
                throw new Error('Parâmetros inválidos')
            }
            const data = productController.update(productId, {
                ...product,
                ...body.data
            })
            return res.send(data)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Ocorreu um erro desconhecido' })
        }
    })

    server.delete<{ Params: { id: string } }>('/:id', (req, res) => {
        const productId = req.params.id

        try {
            if (!productId) {
                throw new Error('Id do produto é obrigatório')
            }
            const product = productController.getById(productId)
            if (!product) {
                throw new Error(`Produto com id: ${productId} não existe`)
            }
            productController.delete(productId)
            return res.send({ message: 'ok' })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                return res.status(404).send({ message: error.message })
            }
            return res.status(500).send({ message: 'Ocorreu um erro desconhecido' })
        }
    })

    server.get<{ Params: { search: string } }>('/:search', (req, res) => {
        const search = req.params.search

        try {
            if (!search) {
                throw new AppError('Filtro de busca obrigatório', 400)
            }
            const data = productController.get(search)
            if (!data) {
                throw new AppError('Nenhum produto foi encontrado', 404)
            }
            return res.status(200).send(data)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                return res.status(404).send({ message: error.message })
            }
            return res.status(400).send({ message: 'Ocorreu um erro desconhecido' })
        }
    })
}