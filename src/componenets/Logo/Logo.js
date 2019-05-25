import React from 'react';
import bugerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props)=>(
    <div className = {classes.Logo} style = {{height:props.height}}>
        <img src={bugerLogo} alt = "MyBurger"/> 
    </div>
);
export default logo;
