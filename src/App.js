import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = 
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/' />
      </Switch>;

    if (this.props.isAuthenticated) {
      routes = 
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/' />
        </Switch>;
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
