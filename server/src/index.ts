import Fastify from 'fastify'
import cors from '@fastify/cors'
import { RPCHandler } from '@orpc/server/fetch'
import { OpenAPIGenerator } from '@orpc/openapi'
import { router } from './router.js'

const app = Fastify()

await app.register(cors)

const rpcHandler = new RPCHandler(router)

app.all('/rpc/*', async (request, reply) => {
  const url = `http://${request.headers.host}${request.url}`
  const fetchRequest = new Request(url, {
    method: request.method,
    headers: request.headers as HeadersInit,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : JSON.stringify(request.body),
  })

  const { matched, response } = await rpcHandler.handle(fetchRequest, { prefix: '/rpc' })

  if (matched) {
    reply.status(response.status)
    for (const [key, value] of response.headers.entries()) {
      reply.header(key, value)
    }
    return reply.send(await response.text())
  }

  return reply.status(404).send({ error: 'Not found' })
})

app.get('/openapi.json', async () => {
  const generator = new OpenAPIGenerator()
  return generator.generate(router, {
    info: { title: 'Cortex API', version: '1.0.0' },
  })
})

app.get('/health', async () => ({ status: 'ok' }))

await app.listen({
  port: parseInt(process.env.PORT ?? '3000'),
  host: '0.0.0.0',
})
