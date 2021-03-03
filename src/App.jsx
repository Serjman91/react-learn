// libraries
import React from "react";
import { Switch, Route } from "react-router-dom";
// components
import PostsPage from "./components/user/PostsPage";
import Post from "./components/user/Post";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import Layout from "./components/shared/Layout";

const App = () => {
  return (
      <Layout>
        <Switch>
          <Route exact path='/' component={PostsPage}/>
          <Route path='/news/:id' component={Post}/>
          <Route path='/login' component={Login}/>
          <Route path='/sign-up' component={SignUp}/>
        </Switch>
      </Layout>
  );
};

export default App;
