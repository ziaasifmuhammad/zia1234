import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import orders from './orders'
import Review from './Review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,orders , Review],
}
