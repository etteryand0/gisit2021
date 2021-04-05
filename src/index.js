import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Details from './components/Details';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/react-hooks';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/details" component={Details} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);