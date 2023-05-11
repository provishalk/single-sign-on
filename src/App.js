import React from 'react';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Protected from './components/Protected';

const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};

const AppWithRouterAccess = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouterAccess;