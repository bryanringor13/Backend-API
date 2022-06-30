'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import httpStatus from 'http-status'

import config from './config'
import { errorHandler } from './middlewares/error'

import { configureServices } from './services'
import { configureControllers } from './controllers'
import { configureRoutes } from './routes'

const app = express()

export default ({ models }) => {
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(xss())
  app.use(mongoSanitize())

  app.use(cors({
    origin: config.origin
  }))

  const Services = configureServices(models)
  const Controllers = configureControllers(Services)
  const { router } = configureRoutes(
    models,
    Controllers
  )

  app.use('', router)

  app.use((req, res, next) => res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' }))

  app.use(errorHandler)

  return app
}
