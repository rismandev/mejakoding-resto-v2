import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from '../_reducers'

export default createStore(
  reducers,
  applyMiddleware(
    logger,
    promiseMiddleware
  )
)
