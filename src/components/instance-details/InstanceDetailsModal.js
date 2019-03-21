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
  
  import InstanceDetailsFeaturesTab from './instance-details-features-tab';
  import InstanceDetailsFrontendTab from './instance-details-frontend-tab'
  import InstanceDetailsClientTab from './instance-details-client-tab'
  import InstanceDetailsMetricTab from './instance-details-metric-tab'
  import InstanceDetailsConfigTab from './instance-details-metric-tab'
  import InstanceDetailsInformationTab from './instance-details-information-tab'
    

  
  class InstanceDetailsModal extends React.Component {
    constructor(props) {
      super(props);
      this.close = this.close.bind(this);
      this.state = { activeTab: 'metric'}
      this.changeActiveTab.bind(this)
      this.tabs = {
        features: InstanceDetailsFeaturesTab,
        frontend: InstanceDetailsFrontendTab,
        client: InstanceDetailsClientTab,
        metric: InstanceDetailsMetricTab,
        config: InstanceDetailsConfigTab,
        information: InstanceDetailsInformationTab 
      }
    }
    
    close() {
      this.props.toggleInstanceModal(null)
    }
    
    changeActiveTab(caption) {
      let newState = {...this.state}
      newState.activeTab = caption
      //this.setState({activeTab: caption})
      this.setState(newState)
      
    }

    getCaption() {
      return this.state.activeTab.charAt(0).toUpperCase() + this.state.activeTab.slice(1)
    }
    
    showTabContent() {
      const ActiveTabComponent = this.tabs[this.state.activeTab]
      return <ActiveTabComponent instance={this.props.instanceModalResource}  /> 
    }
    
    buttonSection(instance) {
      let buttonsCollection = Object.keys(this.tabs).map((key) => {
        const caption = key.charAt(0).toUpperCase() + key.slice(1)
        return(
          <NavItem>
          <NavLink onClick={() => this.changeActiveTab(key)}>{caption}</NavLink>
          </NavItem>
        )
      })
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Nav tabs>
                {buttonsCollection}
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

                  <Row>
                    <Col>
                      <h2>{this.getCaption()}</h2>
                    </Col>
                  </Row>
              
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
