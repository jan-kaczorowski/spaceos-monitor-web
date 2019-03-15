/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import {
    Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem,
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
    
class InstanceDetailsMetricTab extends React.Component {

  render() {
      
      if(this.props.instanceModalResource) {
        const instance = this.props.instanceModalResource

        return (
            <div>
                <h1>Modal metric {instance.name}</h1>
            </div>
          );
      } else return('')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsMetricTab)