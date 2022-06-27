const getDate = () => {
  return new Date();
}

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.log(err);
      return next(err);
    })
}

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key]
      }
      return obj
    }, {})
  }

export { 
    catchAsync,
    pick,
    getDate
}