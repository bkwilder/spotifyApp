import React, {Component} from 'react'
import Authorization from './Authorization'
import { setCode } from '../store';
import { connect } from 'react-redux'


class Main extends Component{


    componentDidMount(){
        if(window.location.search.length > 0) {
            this.getCode();
        }
    }

    getCode(){
        const queryString = window.location.search;
        if ( queryString.length > 0 ){
            const urlParams = new URLSearchParams(queryString);
            let code = urlParams.get('code')
            this.props.setCode(code);
        }

    }
    render(){
        return (
            <div>
                <h1>Start Here!</h1>
                <Authorization/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      code: state.code
    }
   }

function mapDispatchToProps(dispatch) {
    return {
        setCode: (code) => {dispatch(setCode(code))}
    }
}
   
   
   export default connect(mapStateToProps, mapDispatchToProps)(Main)