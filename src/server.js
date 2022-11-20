import * as http from 'node:http'
import router from './router.js'
import defaultHandler from './defaultHandler.js'
import helpers from './helpers.js'

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `https://${req.headers.host}`)
  const routeModule = router.get(url.pathname) ?? {}
  const handler = routeModule[req?.method] ?? defaultHandler

  handler(req, Object.assign(res, helpers), url)
})
server.on('clientError', (err, socket) => {
  if (err) console.log(err)
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen(parseInt(process.env.PORT) || 8000)

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
  })
})
