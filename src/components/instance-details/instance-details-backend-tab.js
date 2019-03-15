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
      
class InstanceDetailsBackendTab extends React.Component {

  render() {
    return (
        <div>
            <h1>Modal part backend</h1>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsBackendTab)