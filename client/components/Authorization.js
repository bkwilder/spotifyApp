import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { setCode } from '../store';
class Authorization extends Component{

    requestAuthorization(){
        const redirect_uri = 'http://localhost:8080/'
        let AUTHORIZE = 'https://accounts.spotify.com/authorize'
        const client_id = '39d080c98d2b4bf18eaa09e9423e8f92';
        const client_secret = '6a45b669152b478e93f4793e7b7f2e29';
        localStorage.setItem("client_id", client_id);
        localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user
        
        let url = AUTHORIZE;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
        window.location.href = url
    }

    render() {
        return (
            <div>
                <button id='authorization' onClick={this.requestAuthorization}>Request Authorization</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      code: state.code
    }
   }

   
   export default connect(mapStateToProps, null)(Authorization)