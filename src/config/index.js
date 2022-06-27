import dotenv from 'dotenv'
import path, { dirname } from 'path'
import Joi from 'joi'
import { fileURLToPath } from 'url';

import { mongoUrl } from './mongo'

if (process.env.NODE_ENV === 'development') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  dotenv.config({ path: path.join(__dirname, '../../.env.dev')})
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development')
      .required(),
    PORT: Joi.number().default(5001),
    ADMIN_DB_NAME: Joi.string().description('admin db name'),
    DB_NAME: Joi.string().description('db name'),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string()
      .description('db password')
      .default('test'),
    DB_SERVERS: Joi.string(),
    CORS_ORIGIN: Joi.string(),
    TOKEN_KEY: Joi.string(),
    TOKEN_XPRY: Joi.string()
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
.prefs({ errors: { label: 'key' } })
.validate(process.env)

if (error) throw new Error(`Environment Configuration validation error: ${error.message}`)

const corsOrigin = envVars.CORS_ORIGIN ? envVars.CORS_ORIGIN.split(' ') : ['localhost:3000']

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongo: {
      url: mongoUrl(
        envVars.DB_SERVERS,
        envVars.ADMIN_DB_NAME,
        envVars.DB_REPLICA_SET
      ),
      options: {
        user: envVars.DB_USER,
        pass: envVars.DB_PASSWORD,
        dbName: envVars.DB_NAME,
        useUnifiedTopology: true,
      }
    },
    origin: corsOrigin,
    tokenKey: envVars.TOKEN_KEY,
    tokenXpry: envVars.TOKEN_XPRY
  }
  
