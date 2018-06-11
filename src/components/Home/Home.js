import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, getGoalInfo} from '../../dux/reducer';
import PieChart from './PieChart';
import logo from '../../Resources/mandala2.svg';
import cancel from '../../Resources/cancel.svg';
import './Home.css';
import axios from 'axios';


export class Home extends Component {
    constructor() {
        super();
        this.state = {
            label: '',
            calories: '',
            fats: '',
            carbs: '',
            protein: '',
            displayCalories:'',
            staticCalories: '',
            totalCarbs: '',
            totalFats: '',
            totalProtein:'',
            foodLog: []
        }
        this.handleLabelInput = this.handleLabelInput.bind(this);
        this.handleCaloriesInput = this.handleCaloriesInput.bind(this);
        this.handleFatInput = this.handleFatInput.bind(this);
        this.handleCarbInput = this.handleCarbInput.bind(this);
        this.handleProteinInput = this.handleProteinInput.bind(this);
        this.saveFood = this.saveFood.bind(this);
        this.getLoggedFood = this.getLoggedFood.bind(this);
        this.removeFoodItem = this.removeFoodItem.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        let goalInfo = this.props.getGoalInfo();
        goalInfo.then( (res) => {
        
            this.setState({staticCalories: res.value.caloriegoal})
            this.getLoggedFood();
        })

    }

    getLoggedFood() {
        axios.get('/getLoggedFood?foodtime=today').then( res => {
        
            this.setState({foodLog: res.data});
            this.calculateTotals();
        })

    }

    calculateTotals () {
        let totals = {
            calories: 0,
            fats: 0,
            protein: 0,
            carbs: 0
        }
        this.state.foodLog.forEach((el, i) => {
            totals.calories += el.calories;
            totals.fats += el.fat;
            totals.protein += el.protein;
            totals.carbs += el.carb;
        });
        let newRemainingCalories = this.state.staticCalories - totals.calories;
        this.setState({displayCalories: newRemainingCalories, totalCarbs: totals.carbs, totalFats: totals.fats, totalProtein: totals.protein})
    }

    removeFoodItem (id) {
        axios.delete(`/removeFood/${id}`).then((res) => {
        
            this.getLoggedFood();
        })
    }

    handleLabelInput (event) {
        this.setState({ label: event.target.value})
    }

        handleCaloriesInput (event) {
        this.setState({ calories: event.target.value})
    }

    handleFatInput (event) {
        this.setState({ fats :event.target.value})
    }

    handleCarbInput (event) {
        this.setState({ carbs :event.target.value})
    }

    handleProteinInput (event) {
        this.setState({ protein :event.target.value})
    }

    saveFood () {
        const {label, fats, carbs, protein, calories} = this.state;
        if (isNaN(fats, carbs, protein, calories) === true) {
            alert('Must be a number');
            this.setState({label: '', fats: '', carbs: '', protein: '', calories: ''})
        } else {
            axios.put('/addNewFood', {label, fats, carbs, protein, calories}).then(res => {
            
                axios.get('/getLoggedFood?foodtime=today').then( res => {
                
                    this.setState({foodLog: res.data});
                    this.calculateTotals();
                })
            })
            this.setState({label: '', fats: '', carbs: '', protein: '', calories:''})
        }   
        this.render();
    }

    render () {
        const {displayname} = this.props.user;
        if (!displayname) {
            return (
                <h2>Looks like that didn't work,<br/> please go back and <a href={process.env.REACT_APP_LOGIN}>try again</a></h2>
            );
        }

        let food = this.state.foodLog.map((el, i) => {
            return (
                <li key={i} className='food-item' >{el.label}:  {el.calories}cal / {el.fat}f / {el.protein}p / {el.carb}c
                <button className='cncl-btn' onClick={() => {this.removeFoodItem(el.id)}}><img src={cancel} alt='' /></button>
                </li>
            )
        })
        return (
            <div className='home-main'>
                <div className='title'>
                <h1>{displayname}'s Home </h1>

                <img className='logo' src={logo} alt='logo'/>
                </div>
                <section className='calorie-sum'>
                    <div className='cal'>
                        <h1>{this.state.displayCalories}</h1>
                        <h4>Calories remaining</h4>
                    </div>

                    <div className='log'>
                        <ul className='foodlist'>
                            {food}
                        </ul>

                        <ul className='addfood'>
                            <li> <input className='foodinput' placeholder='label' onChange={this.handleLabelInput} value={this.state.label}/></li>
                            <li> <input className='foodinput' placeholder='calories'onChange={this.handleCaloriesInput}  value={this.state.calories}/></li>
                            <li> <input className='foodinput' placeholder='fat'onChange={this.handleFatInput} value={this.state.fats}/></li>
                            <li> <input className='foodinput' placeholder='protein'onChange={this.handleProteinInput} value={this.state.protein}/></li>
                            <li> <input className='foodinput' placeholder='carb'onChange={this.handleCarbInput} value={this.state.carbs}/></li>
                            <li><button onClick={this.saveFood} >Add Food</button></li>
                        </ul>
                    </div>
                
                </section>

                <section className='macro-sum'>
                    <div className='chart'>
                        <PieChart fats={this.state.totalFats} carbs={this.state.totalCarbs} protein={this.state.totalProtein}/>
                    </div>
                        
                </section>
            </div>
        )
    }
}
function mapStateToProps (reduxState) {
    return {
        user: reduxState.user,
        userGoals: reduxState.goals
    }
}
export default connect(mapStateToProps, {getUser, getGoalInfo})(Home);