// libraries
import React from "react";
import { Switch, Route } from "react-router-dom";
// components
import PostsPage from "./components/user/PostsPage";
import Post from "./components/user/Post";
import Login from "./components/user/Login";
import Layout from "./components/shared/Layout";
import Parent from "./components/user/Parent";
import CreatePostForm from "./components/admin/CreatePostForm";

const App = () => {
  return (
      <Layout>
        <Switch>
          <Route path='/news/:id/edit' component={CreatePostForm}/>
          <Route path='/news/:id' component={Post}/>
          <Route path='/login' component={Login}/>
          <Route path='/parent' component={Parent}/>
          <Route path='/create' component={CreatePostForm}/>
          <Route exact path='/' component={PostsPage}/>
          <Route path='*' render={(props) => (
              <h1>Not Found</h1>
          )}/>
        </Switch>
      </Layout>
  );
};

export default App;
