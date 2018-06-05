import axios from 'axios';

const init_state = {
    user: {},
    calorieGoal: {}
}

const GET_USER = 'GET_USER';
const SET_CAL_GOAL = 'SET_CAL_GOAL';
const FULFILLED = '_FULFILLED';

export function getUser (action) {
    let userData = axios.get('/auth/me').then(res => {
        console.log(res.data);
    })
    return {
        type: GET_USER,
        payload: userData
    }
}


export function setCalories (action) {
    
}

export default function reducer (state = init_state, action) {
    switch(action.type) {
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload})

        case SET_CAL_GOAL:
            return Object.assign({}, state, {calorieGoal: action.payload})

        default : return state;
    }
}