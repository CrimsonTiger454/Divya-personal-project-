import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';
import {Link} from 'react-router-dom';
import rejected from '../LoginFailure/LoginFailure';
import './Medium.css';

class Medium extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render () {
        let {displayname, userIMG, user_id} = this.props.user;
        return (
            <div>
                {
                    displayname?
                    <div className='welcome'>
                        <h1>Welcome, {displayname}!</h1>
                        <br />
                        <Link to='/home'><button className='continue'>Continue to Home Page</button></Link>
                    </div>
                    :
                    <h2>Looks like that didn't work,<br/> please go back and <a href={process.env.REACT_APP_LOGIN}>try again</a></h2>
                }
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    return {
        user: reduxState.user
    }
}
export default connect(mapStateToProps, {getUser})(Medium);