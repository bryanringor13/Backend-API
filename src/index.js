import logger from './config/logger'
import config from './config'
import { initDB } from './db'
import initApp from './app'

var server;

initDB().then(({ models }) => {
  const app = initApp({ models })
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = error => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
