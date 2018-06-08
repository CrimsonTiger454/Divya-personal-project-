import axios from 'axios';

const init_state = {
    user: {},
    calorieGoal: {}
}

const GET_USER = 'GET_USER';
const GET_CAL_GOAL = 'GET_CAL_GOAL';
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

export function getCalorieGoal (action) {
    let calGoal = axios.get('/getCalorieGoal').then( res => {
        return res.data[0];
    });
    return {
        type: GET_CAL_GOAL,
        payload: calGoal
    }
}




export default function reducer (state = init_state, action) {
    switch(action.type) {
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload})

        case GET_CAL_GOAL + FULFILLED:
            return Object.assign({}, state, {calorieGoal: action.payload})

        default : return state;
    }
}