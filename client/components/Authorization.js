import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setTracks, loginView} from '../store'

export default class Authorization extends Component{
    constructor() {
        super();
        this.requestAuthorization = this.requestAuthorization.bind(this)
    }

    requestAuthorization(){
        window.location.href = 'http://localhost:8080/login'
    }

    render() {
        return (
            <div className='welcome'>
                <h1 className='heading'>What are your top listened to genres in Spotify?</h1>
                <button className='login' id='authorization' onClick={this.requestAuthorization}>Click here to find out!</button>
            </div>
        )
    }
}

