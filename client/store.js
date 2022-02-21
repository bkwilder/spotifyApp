import {createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import { applyMiddleware } from 'redux'


const reducer = (state = {}, action) => {
    return state
}

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed:true}))
  );

export default createStore(reducer, middleware);


//can create a folder of reducers and use combined reducers