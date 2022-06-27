'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import httpStatus from 'http-status'

import config from './config'
import { errorHandler } from './middlewares/error'
import ApiError from './utils/ApiError'

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
    {},
    Controllers
  )

  app.use('/api', router)

  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
  })

  app.use(errorHandler)

  return app
}
