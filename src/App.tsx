import React from 'react';
import Home from './components/home/Home';
import { Route, Switch } from 'react-router-dom';
import User from './components/user/User';
import Layout from './components/layout/layout';
import PageNotFound from './components/page-not-found/PageNotFound';


const App: React.FC = () => {
  return (
    <>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/user" component={User} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
    </>
  );
}

export default App;
