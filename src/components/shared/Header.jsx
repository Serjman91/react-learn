import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// static
import logo from "../../static/images/logo.svg"

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>
                <img src={logo} className="App-logo" alt="logo" />
                </Link>
            </div>
            <ul className="menu">
                <li className="menu-item">
                    <NavLink exact to="/">News</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/sign-up">Sign up</NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
