import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducer)

export default store;