import React from 'react';
import logo from '../../Resources/mandala2.svg';
import './Login.css';

export default function Login () {
    
    return (
        <div className='login-main'>
            <img className='logo'src={logo} alt ='divya'/>
            <h1>Hello, please login.</h1>
            <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
        </div>
    )
}