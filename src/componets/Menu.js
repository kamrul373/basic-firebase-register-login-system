import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Menu.css";

const Menu = () => {
    return (
        <div className='menu text-center'>
            <NavLink className='nav-item  text-white' to="/register">Register</NavLink>
            <NavLink className='nav-item  text-white' to="/login">Login</NavLink>
        </div>
    );
};

export default Menu;