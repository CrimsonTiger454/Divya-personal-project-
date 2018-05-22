import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Foods from './components/Foods/Foods';
import Goals from './components/Goals/Goals';
import Pinboard from './components/Pinboard/Pinboard';
import Profile from './components/Profile/Profile';

export default (

        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/foods' component={Foods}/>
            <Route path='/goals' component={Goals}/>
            <Route path='/pinboard' component={Pinboard}/>
            <Route path='/profile' component={Profile}/>
        </Switch>
    
)