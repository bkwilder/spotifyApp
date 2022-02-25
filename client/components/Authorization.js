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
            <div className='welcome'>
                <h1>What are your top listened to genres in Spotify?</h1>
                <button className='login' id='authorization' onClick={this.requestAuthorization}>Click here to find out!</button>
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