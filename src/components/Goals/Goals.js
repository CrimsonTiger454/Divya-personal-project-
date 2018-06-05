import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';
import './Goals.css';

export class Goals extends Component {
        constructor () {
            super();
            this.state = {
                editting: false,
            }
            this.handleChange = this.handleChange.bind( this );
            this.edit = this.edit.bind( this );
        }

        toggleEditOn () {
            this.setState({editting: true})
        }

        toggleEditOff () {
            this.setState({editting: false})
        }

    render () {
        console.log(this.props.user);
        return (
            <div className='goals-main'>
                <h1 className='title'>Goals</h1>

                <div className='calories-goal'>
                    <h1>Daily Calorie goal:</h1>
                        
                        <button className='edit-calories'>Edit</button>
                </div>

                <div className='macros-goal'>
                    <h1>Daily Macro Goals:</h1>
                        <ul className='macros'>
                            <li>Fat: </li>
                            <li>Protein: </li>
                            <li>Carbs: </li>
                        </ul>
                        <button className='edit-macros'>Edit</button>
                </div>
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