/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
  import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
  
  import InstanceDetailsBackendTab from './instance-details-backend-tab';
  import InstanceDetailsFrontendTab from './instance-details-frontend-tab'
  import InstanceDetailsClientTab from './instance-details-client-tab'
  import InstanceDetailsMetricTab from './instance-details-metric-tab'
  

  
  class InstanceDetailsModal extends React.Component {
    constructor(props) {
      super(props);
      this.close = this.close.bind(this);
      this.state = { activeTab: 'backend'}
      this.changeActiveTab.bind(this)
      this.tabs = {
        backend: InstanceDetailsBackendTab,
        frontend: InstanceDetailsFrontendTab,
        client: InstanceDetailsClientTab,
        metric: InstanceDetailsMetricTab
      }
    }
    
    close() {
      this.props.toggleInstanceModal(null)
    }
    
    changeActiveTab(caption) {
      //let newState = {...this.state}
      //newState.activeTab = caption
      this.setState({activeTab: caption})
      
    }
    
    showTabContent() {
      //const activeTabComponent = 
      const ActiveTabComponent = this.tabs[this.state.activeTab]
      //console.log(activeTabComponent) 
      return <ActiveTabComponent instance={this.props.instanceModalResource}  /> 
      
      //return React.createElement(ActiveTabComponent, {});

    }
    
    buttonSection(instance) {
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <NavLink onClick={() => this.changeActiveTab('frontend')}>Frontend</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeActiveTab('backend')}>Backend</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeActiveTab('client')}>Client</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeActiveTab('metric')}>Metric</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </React.Fragment>
        )
      }
      
      
      render() {
        
        if(this.props.instanceModalResource) {
          const instance = this.props.instanceModalResource
          
          return (
            <div>
            <Modal isOpen={this.props.instanceModalShow} className={this.props.className}>
            <ModalHeader toggle={this.close}>{instance.name}</ModalHeader>
            <ModalBody>
              {this.buttonSection(instance)}
          
              {this.showTabContent()}
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={this.close}>Cancel</Button>
            </ModalFooter>
            </Modal>
            </div>
            );
          } else return('')
        }
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsModal)