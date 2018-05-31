import React from 'react';
import logo from '../../Resources/mandala2.svg';
import './Login.css';

export default function Login () {
    
    return (
        <div className='login-main'>
            <img className='logo'src={logo} alt ='divya'/>
            <h1>Hello, please login.</h1>
            <a href='http://localhost:3333/login'><button>Login</button></a>
        </div>
    )
}