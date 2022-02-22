import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { setCode } from '../store';
class Authorization extends Component{

    requestAuthorization(){

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