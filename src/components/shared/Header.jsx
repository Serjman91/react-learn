import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// static
import logo from "../../static/images/logo.svg"
import {useDispatch, useSelector} from "react-redux";
import { deleteUser } from '../../actions/user';

const Header = () => {
    const userData = useSelector(({ user }) => user) || {};
    const dispatch = useDispatch();

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
                {userData.user && userData.user.email ? (
                    <>
                        <li className="menu-item">
                            <span>Hi {userData.user && userData.user.email}!</span>
                        </li>
                        <li className="menu-item">
                            <span onClick={() => dispatch(deleteUser())}>Logout</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="menu-item">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
