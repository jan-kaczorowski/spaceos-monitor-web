import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
import GeneralInfo from './components/GeneralInfo'
import SideInfo from './components/SideInfo'
import { Container, Row, Col } from 'reactstrap';

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
            <SideInfo counter='5'/>
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

export default App;
