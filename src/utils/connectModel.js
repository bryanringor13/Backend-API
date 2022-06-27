import mongoose from 'mongoose'

const connectModel = (conn, schema, MODEL_NAME) => {
  if (conn) {
    if (conn.models[MODEL_NAME]) {
      return conn.model(MODEL_NAME)
    }
    return conn.model(MODEL_NAME, schema, MODEL_NAME)
  }
  return mongoose.model(MODEL_NAME, schema, MODEL_NAME)
}

export default connectModel
