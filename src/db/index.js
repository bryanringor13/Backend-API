import mongoose from 'mongoose'
import config from '../config'
import initModels from './models'

const getMaskedDbUrl = dbUrl => {
  const indexOfAt = dbUrl.indexOf('@')
  const substringOfDBServers = dbUrl.substring(indexOfAt)
  const substringOfProtocolAndCreds = dbUrl.substring(0, indexOfAt)
  const lastIndexOfColon = substringOfProtocolAndCreds.lastIndexOf(':')
  if (lastIndexOfColon > -1) {
    const protocolAndUser = substringOfProtocolAndCreds.substring(
      0,
      lastIndexOfColon
    )
    return `${protocolAndUser}:d|masked|b${substringOfDBServers}`
  }
  return substringOfDBServers
}

export const init = async ({ dbClient, dbUrl, options }) => {
  console.log(`connecting to  '${getMaskedDbUrl(dbUrl)}' as ${options.user}...`)
  return new Promise((resolve, reject) => {
    dbClient.createConnection(dbUrl, options, (err, conn) => {
      if (!err) {
        console.log('connection to db has been established.')
        const models = initModels(conn)
        const Types = dbClient.Types
        resolve({
          mongo: conn,
          models,
          Types
        })
      } else {
        console.log(
          `error connecting to '${getMaskedDbUrl(dbUrl)}'. Caused by: ${err}.`
        )
        reject(err)
      }
    })
  })
}

export const initDB = async () => {
  return await init({
    dbClient: mongoose,
    dbUrl: config.mongo.url,
    options: config.mongo.options
  })
}
