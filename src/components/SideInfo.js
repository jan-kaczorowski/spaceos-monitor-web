import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import AuthService from '../../services/auth-service'
class SideInfo extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { dropdownOpen: false}
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
  
  render(){
    // if(!this.props.isAuthenticated) {
    //   return(<Redirect path="/login"/>)
    // }
    return(
      <Jumbotron>
            <h2 >Time to refresh data: {this.props.globalTimer }s</h2>
            <div>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                {this.activeInstanceTypeFilter()}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('dev')} >DEV</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('prod')} >PROD</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('demo')} >DEMO</DropdownItem>
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter('feature')} >FEATURE</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.props.setInstanceTypeFilter(null)}>All types</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <Input addon type="text" 
                     value={this.props.instanceNameFilter} 
                     onChange={evt => this.handleChangeNameFilter(evt)}  />
            </div>
      </Jumbotron>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);