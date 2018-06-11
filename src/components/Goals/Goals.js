import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser, getGoalInfo} from '../../dux/reducer';
import './Goals.css';

export class Goals extends Component {
        constructor () {
            super();
            this.state = {
                CalorieEditting: false,
                macroEditting: false,
                calorieInput: '',
                displayCalories: '',
                fat:'',
                protein: '',
                carbs: '',
                displayFat: '',
                displayProtein: '',
                displayCarbs: ''
            }
            this.editOffandSave = this.editOffandSave.bind(this);
            this.editCaloriesOn = this.editCaloriesOn.bind(this);
            this.handleCalorieChange = this.handleCalorieChange.bind(this);
            this.handleCarbChange = this.handleCarbChange.bind(this);
            this.handleFatChange = this.handleFatChange.bind(this);
            this.handleProteinChange = this.handleProteinChange.bind(this);
            this.editMacrosOn = this.editMacrosOn.bind(this);
            this.saveMacros = this.saveMacros.bind(this);
        }

        componentDidMount() {
            let calProps = this.props.getGoalInfo();
            calProps.then((res) => {
                this.setState({displayCalories: res.value.caloriegoal,
                                displayCarbs: res.value.carbgoal,
                                displayFat: res.value.fatgoal,
                                displayProtein: res.value.proteingoal})
            })
        }

        

        handleCalorieChange (event) {
            this.setState({calorieInput: event.target.value})
            this.setState({displayCalories: event.target.value})
        }

        handleFatChange (event) {
            this.setState({fat: event.target.value})
            this.setState({displayFat: event.target.value})
        }

        handleProteinChange (event) {
            this.setState({protein: event.target.value})
            this.setState({displayProtein: event.target.value})
        }

        handleCarbChange (event) {
            this.setState({carbs: event.target.value})
            this.setState({displayCarbs: event.target.value})
        }

        editCaloriesOn () {
            this.setState({CalorieEditting: true})
        }

        editMacrosOn () {
            this.setState({macroEditting: true});
        }

        editOffandSave () {
            const {calorieInput} = this.state;
            if (isNaN(calorieInput) === true || calorieInput === '') {
                alert ('Calories must be a number and cannot be null');
                this.setState({displayCalories: ''});
                this.setState({calorieInput: ''})
            } else {
                 this.setState({CalorieEditting: false})
                    axios.put('/setCalorieGoal', {calorieInput}).then( res => {
                    
                    })
                    this.setState({calorieInput: '' })

            }
        }

        saveMacros () {
            const {fat, carbs, protein} = this.state;
            if(isNaN(fat, carbs, protein) === true) {
                alert('Macros must be a number and cannot be null');
                this.setState({displayFat: '', displayProtein: '', displayCarbs:''});
                this.setState({fat: '', protein: '', carbs: ''})
            }else {
                this.setState({macroEditting: false})
                axios.post('/setMacroGoals', {fat, carbs, protein}).then( res => {
                
                })
                this.setState({fat: '', carbs: '', protein: ''});
            }
        }

    render () {
        const {displayname} = this.props.user;
        
        if (!displayname) {
            return (
                <h2>Looks like that didn't work,<br/> please go back and <a href={process.env.REACT_APP_LOGIN}>try again</a></h2>
            );
        }
        return (
            <div className='goals-main'>
                <h1 className='title'>Goals</h1>

                <div className='calories-goal'>
                    <h1>Daily Calorie goal: <br/> {this.state.displayCalories} </h1>
                        {
                            this.state.CalorieEditting ?
                            <div>
                                <input onChange={this.handleCalorieChange} value={this.state.calorieInput} placeholder='   Calorie goal...' className='cal-input'/>
                                <button onClick={this.editOffandSave} className='save-btn'>Save</button>
                            </div>
                            :
                            <div>
                                <h1>{this.state.calories}</h1>
                                <button onClick={this.editCaloriesOn} className='cal-edit-btn'>edit</button>
                            </div>
                        }
                </div>

                <div className='macros-goal'>
                    <h1>Daily Macro Goals:</h1>
                            {
                                this.state.macroEditting ?
                                <ul className='macros'>
                                    <li>Fat: <input onChange={this.handleFatChange}/> </li>
                                    <li>Protein:  <input onChange={this.handleProteinChange}/></li>
                                    <li>Carbs:  <input onChange={this.handleCarbChange}/></li>
                                    <li><button onClick={this.saveMacros}>Save</button></li>
                                </ul>
                                :
                                <ul className='macros'>
                                    <li>Fat: {this.state.displayFat}</li>
                                    <li>Protein:{this.state.displayProtein}</li>
                                    <li>Carbs: {this.state.displayCarbs}</li>
                                    <li><button className='edit-macros' onClick={this.editMacrosOn}>Edit</button></li>
                                </ul>
                            }

                </div>
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
export default connect(mapStateToProps, {getUser, getGoalInfo})(Goals);