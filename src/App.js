import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import NavBar from './components/NavBar'
import AboutPage from './components/AboutPage'
import ClientsList from './components/clients-management/ClientsList'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <Container fluid>
        <Row>
          <Col>
            <NavBar/>
          </Col>
        </Row>
        <Row>
          <Col>
                <Route exact path="/" component={StatusChecker} />
                <Route path="/about" component={AboutPage} />                   
                <Route path="/clients/list" component={ClientsList} />                   
          </Col>
        </Row>
      </Container>
      </Router>
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
