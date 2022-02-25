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
        <h1>That project or robot does not exist!</h1>
        <center><Link onClick={this.handleClick} to='/' style={{color:'#5f6062ff'}}>Go Home</Link></center>
        </div>
        )
      }
      return this.props.children;
    }
  }