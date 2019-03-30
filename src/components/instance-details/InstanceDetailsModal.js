/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { Nav, NavItem, NavLink } from 'reactstrap';

import InstanceDetailsMetricTab from './instance-details-metric-tab'
import InstanceDetailsInformationTab from './instance-details-information-tab'

  class InstanceDetailsModal extends React.Component {
    constructor(props) {
      super(props);
      this.close = this.close.bind(this);
      this.state = { activeTab: 'metric'}
      this.changeActiveTab.bind(this)
      this.tabs = {
        //features: InstanceDetailsFeaturesTab, 2 rzut
        //config: InstanceDetailsConfigTab,
        information: InstanceDetailsInformationTab,
        metric: InstanceDetailsMetricTab
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
      let buttonsCollection = Object.keys(this.tabs).map((key,ind) => {
        const caption = key.charAt(0).toUpperCase() + key.slice(1)
        return(
          <NavItem key={ind+1}>
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
