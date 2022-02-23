import React, {Component} from 'react'
import { connect } from "react-redux";
import {getTopTracks,getGenres} from '../store'
import 'regenerator-runtime/runtime'


class TopTrackList extends Component {

    async componentDidMount() {
        const accessToken = new URLSearchParams(document.location.search).get('accesstoken')
        const tokenType = new URLSearchParams(document.location.search).get('tokentype')
        await this.props.getTracks(tokenType, accessToken)
        await this.props.getGenres(tokenType, accessToken, this.props.tracks.join())
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Your Top Tracks!</h1>
                <ul>
                     {this.props.tracks.map(track => <li key={track}>{track}</li>)} 
                 </ul>

                {/* <h1>Your Top Genres!</h1>
                <ul>
                     {this.props.genres.map(genre => <li key={genre}>{genre}</li>)} 
                 </ul> */}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
      tracks: state.tracks,
      genres: state.genres
    };
  }
  
  function mapDispatchToProps(dispatch) {
        return {
            getTracks: (tokenType, accessToken) => dispatch(getTopTracks(tokenType, accessToken)),
            getGenres: (tokenType, accessToken, trackIds) => dispatch(getGenres(tokenType, accessToken, trackIds))
        }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TopTrackList);

