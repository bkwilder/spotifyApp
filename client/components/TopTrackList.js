import React, {Component} from 'react'
import { connect } from "react-redux";
import {getTopTracks,getGenres} from '../store'
import 'regenerator-runtime/runtime'
import Example from './PieChart'


class TopTrackList extends Component {
    constructor() {
        super();
        this.state = {
            genreCount: []
        }
    }


    async componentDidMount() {
        const accessToken = new URLSearchParams(document.location.search).get('accesstoken')
        const tokenType = new URLSearchParams(document.location.search).get('tokentype')
        await this.props.getTracks(tokenType, accessToken)
        await this.props.getGenres(tokenType, accessToken, this.props.tracks.join())
        let genreCount = [];
        genreCount = this.props.genres.reduce((a,b) => {
            let idx = a.findIndex((el) => el.name === b)
            if(idx>=0){
                a[idx].value++
                return [...a]
            }
            else {
                return [...a, {name: b, value: 1}]
                
            }
        },[])
        this.setState({genreCount: genreCount})
    }

    render(){
        console.log(this.state.genreCount)
        return(
            <div>
                <h1>Your Top Genres!</h1>
                {/* <ul>
                     {this.state.genreCount.map((genre,idx) => <li key={idx}>{genre.name }</li>)} 
                 </ul> */}
                 <Example genreCount={this.state.genreCount}/>
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

