import {createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import { applyMiddleware } from 'redux'

const SET_CODE = 'SET_CODE'

export const setCode = (code) =>{
  return {
    type: SET_CODE, 
    code,
  }
}

const initialState = {code: ''}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CODE:
      return {...state, code: action.code}
  
    default:
      return state
  }
    
}

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed:true}))
  );

export default createStore(reducer, middleware);


//can create a folder of reducers and use combined reducers