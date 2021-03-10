// libraries
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// components
import ChildOne from "./ChildOne";
import ChildTwo from "./ChildTwo";
import {useSelector} from "react-redux";

const Parent = ({ history }) => {
    const userData = useSelector(({ user }) => user) || {};

    useEffect(() => {
        if (!(userData.user && userData.user.email)) {
            history.push('/login');

            return null;
        }
    }, [history, userData]);

    return (
        <Switch>
            <Route exact path='/parent/one' component={ChildOne}/>
            <Route exact path='/parent/two' component={ChildTwo}/>
            <Redirect to="/" />
        </Switch>
    );
};

export default Parent;
