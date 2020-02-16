import React from 'react';
import {ListingView} from './VendorView.js';
import {RegisterView} from './Register.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  render() {
    if (this.state.authenticated) {
      return <ListingView />;
    } else {
      return <RegisterView />;
    }
  }
}

export default App;
