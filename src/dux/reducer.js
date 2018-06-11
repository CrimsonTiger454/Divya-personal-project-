import axios from 'axios';

const init_state = {
    user: {},
    calorieGoal: {}
}

const GET_USER = 'GET_USER';
const GET_GOAL_INFO = 'GET_GOAL_INFO';
const FULFILLED = '_FULFILLED';

export function getUser (action) {
    let userData = axios.get('/auth/me').then(res => {
        console.log('userData: ', res.data);
        return res.data;
    });
    return {
        type: GET_USER,
        payload: userData
    }
}

export function getGoalInfo (action) {
    let calGoal = axios.get('/getGoalInfo').then( res => {
        return res.data[0];
    });
    return {
        type: GET_GOAL_INFO,
        payload: calGoal
    }
}





export default function reducer (state = init_state, action) {
    switch(action.type) {
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload})

        case GET_GOAL_INFO + FULFILLED:
            return Object.assign({}, state, {goals: action.payload})

        default : return state;
    }
}