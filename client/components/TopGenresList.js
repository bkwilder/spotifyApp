import React, { Component } from "react";
import { connect } from "react-redux";
import { getTopArtists, getGenres } from "../store";
import "regenerator-runtime/runtime";
import Example, { Example2 } from "./PieChart";

class TopGenresList extends Component {
  constructor() {
    super();
    this.state = {
      genreCount: [],
      generalGenres: [],
    };
  }

  async componentDidMount() {
    const accessToken = new URLSearchParams(document.location.search).get(
      "accesstoken"
    );
    const tokenType = new URLSearchParams(document.location.search).get(
      "tokentype"
    );
    await this.props.getArtists(tokenType, accessToken);
    await this.props.getGenres(
      tokenType,
      accessToken,
      this.props.artists.join()
    );
    let genreCount = [];
    genreCount = this.props.genres.reduce((a, b) => {
      let idx = a.findIndex((el) => el.name === b);
      if (idx >= 0) {
        a[idx].value++;
        return [...a];
      } else {
        return [...a, { name: b, value: 1 }];
      }
    }, []);
    let generalGenres = [
      { name: "pop", value: 0 },
      { name: "country", value: 0 },
      { name: "folk", value: 0 },
      { name: "classical", value: 0 },
      { name: "rock", value: 0 },
      { name: "indie", value: 0 },
      { name: "house", value: 0 },
      { name: "hip hop", value: 0 },
      { name: "jazz", value: 0 },
      { name: "other", value: 0 },
    ];
    this.props.genres.forEach((genre) => {
      generalGenres.forEach((count) => {
        if (genre.includes(count.name)) {
          count.value++;
          return;
        }
      });

      generalGenres[generalGenres.length - 1].value++;
    });

    this.setState({ genreCount: genreCount, generalGenres: generalGenres });
  }

  render() {
    console.log(this.state.generalGenres);
    return (
      <div className='container'>
        <h1>Your Top Genres!</h1>
        {/* <Example genreCount={this.state.genreCount} /> */}
        <div className='pie-chart'><Example2 generalGenres={this.state.generalGenres} /></div>
        <div className='genre-list'>
            <h3>Detailed Top Genre List:</h3>
        <ul>
          {this.state.genreCount.map((genre, idx) => (
            <li key={idx}>{genre.name}</li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.artists,
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getArtists: (tokenType, accessToken) =>
      dispatch(getTopArtists(tokenType, accessToken)),
    getGenres: (tokenType, accessToken, trackIds) =>
      dispatch(getGenres(tokenType, accessToken, trackIds)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopGenresList);
