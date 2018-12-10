import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import GeneralInfo from './components/GeneralInfo'
import SideInfo from './components/SideInfo'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'


import './App.css';

class App extends Component {
  render() {
    
    return (
      <Container fluid>

        <Row>
          <Col>
            <GeneralInfo/>
          </Col>
          <Col>
            <SideInfo/>
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
    globalTimer: state.globalTimer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      decrementGlobalTimer: ()=> dispatch({type: 'DECREMENT_GLOBAL_TIMER'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
