import React from 'react'
import {Link} from 'react-router-dom'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          hasError: false,
          error: '',
         };
         this.handleClick= this.handleClick.bind(this)
    }
  
    componentDidCatch(error, info) {
      this.setState({ error: error, hasError: true });
    }

    handleClick() {
        this.setState({error: '', hasError: false});
        
    }

  
    render() {
      if (this.state.hasError) {
        return (
        <div>
        <h1>There was an error! You might need to login to Spotify Again.</h1>
        <center><Link onClick={this.handleClick} to='/' style={{color:'#5f6062ff'}}>Start Over</Link></center>
        </div>
        )
      }
      return this.props.children;
    }
  }