import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';

export class Profile extends Component {

    render () {
        // console.log(this.props.user)
        // const {displayname} = this.props.user;
        // var first = displayname.split(' ');
        // console.log(first);
        return (
            <div className='profile-main'>
                <h1> Profile</h1>
            </div>
        )
    }
}
function mapStateToProps (reduxState) {
    return {
        user: reduxState.user
    }
}
export default connect(mapStateToProps, {getUser})(Profile);