import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';
import './Profile.css';

export class Profile extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render () {
        const {displayname, userimg} = this.props.user;
        if (!displayname) {
            return (
                <h2>Looks like that didn't work,<br/> please go back and <a href={process.env.REACT_APP_LOGIN}>try again</a></h2>
            );
        }
        var splitname = displayname.split(' ');
        return (
            <div className='profile-main'>
                <h1 className='username' >{splitname[0]}'s Profile </h1>
                <img src={userimg} alt='profile-photo' className='userimg' />
                <section className='userquote'>
                
                </section>
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