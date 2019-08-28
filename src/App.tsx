import React from 'react';
import Home from './components/home/Home';
import { Route, Switch } from 'react-router-dom';
import User from './components/user/User';
import Layout from './components/layout/layout';
import PageNotFound from './components/page-not-found/PageNotFound';
import Auth from './components/auth/Auth';
import MySnackBar from './components/snack-bar/MySnackBar';
import WriteReview from './components/writeReview/WriteReview';
import Search from './components/search/Search';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={User} />
          <Route path="/write" component={WriteReview} />
          <Route path="/search" component={Search} />
          <Route component={PageNotFound} />
        </Switch>
        <Route path='/auth/:token' component={Auth} />
      </Layout>
      <MySnackBar />
    </>
  );
}

export default App;
