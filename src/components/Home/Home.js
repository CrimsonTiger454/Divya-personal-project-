import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../dux/reducer';
import PieChart from './PieChart';
import logo from '../../Resources/mandala2.svg';
import Rejected from '../LoginFailure/LoginFailure';
import './Home.css';


export class Home extends Component {

    // checkUser () {
    //     if (!this.props.user) {
    //         return (
    //             <div>
    //                 <Rejected />
    //             </div>
    //         )
    //     } 
    // }

    componentDidMount() {
        this.props.getUser();
    }

    render () {

        const {displayname} = this.props.user;
        return (
            <div className='home-main'>
                <div className='title'>
                <h1>{displayname}'s Home </h1>

                <img className='logo' src={logo} alt='logo'/>
                </div>
                <section className='calorie-sum'>
                    <div className='cal'>
                        <h1>1400</h1>
                        <h4>Calories remaining</h4>
                    </div>

                    <div className='log'>
                        <ul className='foodlist'>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                            <li>food (500cal, 20p, 10f, 30c)</li>
                        </ul>

                        <ul className='addfood'>
                            <li> <input className='foodinput' placeholder='label'/></li>
                            <li> <input className='foodinput' placeholder='calories'/></li>
                            <li> <input className='foodinput' placeholder='fat'/></li>
                            <li> <input className='foodinput' placeholder='protein'/></li>
                            <li> <input className='foodinput' placeholder='carb'/></li>
                            <li><button>Add Food</button></li>
                        </ul>
                    </div>
                
                </section>

                <section className='macro-sum'>
                    <div className='chart'>
                        <PieChart/>
                    </div>
                        
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
export default connect(mapStateToProps, {getUser})(Home);