import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import NavBar from './components/NavBar'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'

import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <NavBar/>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusChecker></StatusChecker>
          </Col>
        </Row>
      </Container>
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
