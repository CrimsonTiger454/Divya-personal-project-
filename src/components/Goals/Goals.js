import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';
import './Goals.css';

export class Goals extends Component {
    render () {
        console.log(this.props.user);
        return (
            <div className='goals-main'>
            <h1>Goals</h1>

            
            </div>
        )
    }
}
function mapStateToProps (reduxState) {
    return {
        user: reduxState.user
    }
}
export default connect(mapStateToProps, {getUser})(Goals);