import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Badge,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Progress } from 'reactstrap';
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      instanceTypes: [
        {caption: 'Production', slug: 'prod'},
        {caption: 'Developer', slug: 'dev'},
        {caption: 'Demo', slug: 'demo'},
        {caption: 'Feature', slug: 'feature'},
        {caption: 'All', slug: null}
      ]
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  buttonsForInstanceTypes() {
    return this.state.instanceTypes.map((elem) => {
        return (
            <NavItem>
                <Button color={this.props.instanceTypeFilter === elem.slug ? 'primary' : 'default'}
                        onClick={() => this.props.setInstanceTypeFilter(elem.slug)} 
                >{elem.caption}</Button>{'   '}
            </NavItem>
        );
    });
  }

  activeInstanceTypeFilter() {
    if(this.props.instanceTypeFilter === null) {
      return 'All types'
    } else {
      return this.props.instanceTypeFilter
    }
  }

  handleChangeNameFilter = (e) => {
    this.props.setInstanceNameFilter(e.target.value)
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">SpaceOS Instances</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavbarBrand>Filters:</NavbarBrand>
                {this.buttonsForInstanceTypes()}
              <NavItem>
                <Input addon type="text"
                     placeholder="Seach instances.." 
                     value={this.props.instanceNameFilter} 
                     onChange={evt => this.handleChangeNameFilter(evt)}/>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {this.activeInstanceTypeFilter()}
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem onClick={() => this.props.setInstanceTypeFilter('dev')} >DEV</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('prod')} >PROD</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('demo')} >DEMO</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('feature')} >FEATURE</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter(null)}>All types</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
        <div className="text-center">
            Time to next refresh: <Badge color="info">{this.props.globalTimer }s</Badge>
        </div>
        <Progress striped color="info" value={this.props.globalTimer * 100 / 30 } />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);