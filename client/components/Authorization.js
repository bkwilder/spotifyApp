import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setTracks, loginView} from '../store'

class Authorization extends Component{
    constructor() {
        super();
        this.requestAuthorization = this.requestAuthorization.bind(this)
    }

    requestAuthorization(){
        window.location.href = 'http://localhost:8080/login'
        this.props.changeLogin();
    }

    render() {
        return (
            <div>
                <button id='authorization' onClick={this.requestAuthorization}>Click here to login to Spotify!</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        setTracks: () => dispatch(setTracks()),
        changeLogin: () => dispatch(loginView())
    }
}

   
   export default connect(null, mapDispatchToProps)(Authorization)