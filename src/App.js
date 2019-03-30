import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import AboutPage from './components/AboutPage'
import ClientsList from './components/clients-management/ClientsList'
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginScreen from './components/LoginScreen';
import AuthService from './services/auth-service'
import { UnauthRoute, AuthRoute } from 'react-router-auth'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css';

class App extends Component {
  overlay() {
    return (AuthService.isLoggedIn()) ? '' : (<div className='overlay'></div>);
  }

  render() {
    return (
      <div>
          {this.overlay()}
          <Router>
            <Container fluid>
                    <UnauthRoute exact path="/" component={LoginScreen} redirectTo="/instances/list" authenticated={AuthService.isLoggedIn()}  />                                   
                    
                    <AuthRoute path="/instances/list" component={StatusChecker} redirectTo="/" authenticated={AuthService.isLoggedIn()} /> 
                    <AuthRoute path="/clients/list"   component={ClientsList}   redirectTo="/" authenticated={AuthService.isLoggedIn()} /> 
                    {/* <AuthRoute path="/about" component={AboutPage} redirectTo="/" authenticated={AuthService.isLoggedIn()} />  */}
            </Container>
          </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalTimer: state.globalTimer,
    instanceTypeFilter: state.instanceTypeFilter,
    instanceNameFilter: state.instanceNameFilter
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      decrementGlobalTimer: () => dispatch({type: 'DECREMENT_GLOBAL_TIMER'}),
      setInstanceNameFilter: (str) => dispatch({type: 'APPLY_INSTANCE_NAME_FILTER', instanceNameFilter: str }),
      setInstanceTypeFilter: (instType) => dispatch({type: 'APPLY_INSTANCE_TYPE_FILTER', instanceTypeFilter: instType }) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
