import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import { connect } from 'react-redux'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      instanceTypes: [
        {caption: 'Production', slug: 'production'},
        {caption: 'Developer', slug: 'staging'},
        {caption: 'Demo', slug: 'demo'},
        {caption: 'Feature', slug: 'feature'},
        {caption: 'All', slug: null}
      ]
    };
    this.props.refreshClients()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderButtonsForInstanceTypes() {
    return this.state.instanceTypes.map((elem) => {
        return (
            <NavItem key={elem.slug}> 
                <Button color={this.props.instanceTypeFilter === elem.slug ? 'primary' : 'secondary'}
                        onClick={() => this.props.setInstanceTypeFilter(elem.slug)} 
                >{elem.caption}</Button>{'   '}
            </NavItem>
        );
    });
  }

  renderDropdownsForClients() {
    return this.props.clients.map( elem => {
        return (
          <DropdownItem key={elem.id} onClick={() => this.props.setInstanceNameFilter(elem.name)} >{elem.name}</DropdownItem>
        )
    })
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

  instancesListMenu() {
    return (
      <Nav className="ml-auto" navbar>
        <NavbarBrand>Filters:</NavbarBrand>
          {this.renderButtonsForInstanceTypes()}
        <NavItem>
          <Input addon type="text"
              placeholder="Seach instances.." 
              value={this.props.instanceNameFilter} 
              onChange={evt => this.handleChangeNameFilter(evt)}/>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
              Clients
          </DropdownToggle>
          <DropdownMenu right>
            {this.renderDropdownsForClients()}
            <DropdownItem divider />
            <DropdownItem onClick={() => this.props.setInstanceNameFilter('')}>Clear name filter</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }

  secondaryMenu() {
    switch(window.location.pathname) {
      case '/instances/list': 
        return this.instancesListMenu()
      case '/':
        return this.instancesListMenu()  

      default: return '';
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/instances/list">SpaceOS Instances</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav>
                <NavItem className="internal-link">
                    <Link to="/">Home</Link>
                </NavItem>
                <NavItem className="internal-link">
                    <Link to="/instances/list">Instances List</Link>
                </NavItem>
                <NavItem className="internal-link">
                    <Link to="/clients/list">Clients List</Link>
                </NavItem>
            </Nav>

            {this.secondaryMenu()}

          </Collapse>

        </Navbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);