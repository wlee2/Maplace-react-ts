import React from 'react';
import Home from './components/home/Home';
import { Route } from 'react-router-dom';
import User from './components/user/User';
import Layout from './components/layout/layout';

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
      </Layout>
    </div>
  );
}

export default App;
