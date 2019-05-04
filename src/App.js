import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import AboutPage from './components/AboutPage'
import ClientsList from './components/clients-management/ClientsList'
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import LoginScreen from './components/LoginScreen';
import AuthService from './services/auth-service'
import ApiService from './services/api-service'
import { UnauthRoute, AuthRoute } from 'react-router-auth'
import ProtectedRoute from './components/ProtectedRoute'
import { mapDispatchToProps, mapStateToProps } from './store/reducer_interface'
import './App.css';
import store from './store/store'
class App extends Component {

  constructor() {
    super()
    //setTimeout(()=> store.dispatch({type: 'AUTHORIZE'}) , 4000)
    ApiService.getConfig()
    AuthService.checkAuthentication();
  }

  overlay() {
    return (this.props.isAuthenticated) ? '' : (<div className='overlay'></div>);
  }

  render() {
    if(!this.props.config) return '';
    return (
      <div>
          {this.overlay()}
          <Router >
            
            <Container fluid>

                  {/* <Redirect from="" to="/instances/list"/> */}
                    <AuthRoute path="/instances/list" component={StatusChecker} redirectTo="/" authenticated={this.props.isAuthenticated} /> 
                    <AuthRoute path="/clients/list"   component={ClientsList}   redirectTo="/" authenticated={this.props.isAuthenticated} /> 
                    <AuthRoute path="/about"          component={AboutPage}     redirectTo="/" authenticated={this.props.isAuthenticated} />
                    
                    {/* <UnauthRoute exact path=""  component={LoginScreen} redirectTo="/instances/list" authenticated={this.props.isAuthenticated}  />                                    */}
                    <UnauthRoute exact path="/" component={LoginScreen} redirectTo="/instances/list" authenticated={this.props.isAuthenticated}  />     

                              
                      
            </Container>
          </Router>
      </div>
    );
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(App));
