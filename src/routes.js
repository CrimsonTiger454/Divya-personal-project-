import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Foods from './components/Foods/Foods';
import Goals from './components/Goals/Goals';
import Pinboard from './components/Pinboard/Pinboard';
import Profile from './components/Profile/Profile';
import rejected from './components/LoginFailure/LoginFailure';
import Medium from './components/Medium/Medium';
import Login from './components/Login/Login';

export default (

        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/foods' component={Foods}/>
            <Route path='/goals' component={Goals}/>
            <Route path='/pinboard' component={Pinboard}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/loginfailure' component={rejected}/>
            <Route path='/medium' component={Medium}/>
        </Switch>
    
)