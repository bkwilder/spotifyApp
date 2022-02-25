//this is where we will render the DOM

import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import store from './store'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ErrorBoundary>
             <Main />
            </ErrorBoundary>
        </Router>
    </Provider>, 
document.getElementById('app'))