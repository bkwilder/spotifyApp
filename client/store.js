import {createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import { applyMiddleware } from 'redux'
import axios from 'axios'
import 'regenerator-runtime/runtime'

const SET_GENRES = 'SET_GENRES'
const SET_TRACKS = 'SET_TRACKS'
const LOGIN = 'LOGIN'
//ACTION CREATORS

export const loginView = () => {
  return {
    type: LOGIN
  }
}

export const setTracks = (tracks) => {
  return {
    type: SET_TRACKS,
    tracks
  }
}
export const setGenres = (genres =>{
  return {
    type: SET_GENRES, 
    genres,
    }
  }
) 


//THUNK CREATORS
export const getTopTracks = (tokenType, accessToken) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/tracks?tokentype=${tokenType}&accesstoken=${accessToken}`)
    dispatch(setTracks(data))
  }
}

export const getGenres = (tokenType, accessToken, trackIds) => {
  console.log(tokenType, accessToken, trackIds)
  return async (dispatch) => {
    const {data} = await axios.get(`/genres?tokentype=${tokenType}&accesstoken=${accessToken}&trackids=${trackIds}`)
    dispatch(setGenres(data))
  }
}

const initialState = {
  tracks: [],
  genres: [],
  login: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, login: false}

    case SET_GENRES:
      return {...state, genres: action.genres}
      
    case SET_TRACKS:
      return {...state, tracks: action.tracks}

    default:
      return state
  }
    
}

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed:true}))
  );

export default createStore(reducer, middleware);


//can create a folder of reducers and use combined reducers