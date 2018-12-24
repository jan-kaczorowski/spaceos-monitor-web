import React, { Component } from 'react';
import { Jumbotron, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { connect } from 'react-redux'
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
              <input addon type="text" 
                           value={this.props.instanceNameFilter} 
                           onChange={evt => this.handleChangeNameFilter(evt)} 
                           aria-label="Checkbox for following text input" />
            </div>
      </Jumbotron>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    globalTimer: state.globalTimer,
    instanceTypeFilter: state.instanceTypeFilter,
    instanceNameFilter: state.instanceNameFilter
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      decrementGlobalTimer: () => dispatch({type: 'DECREMENT_GLOBAL_TIMER'}),
      setInstanceNameFilter: (str) => dispatch({type: 'APPLY_INSTANCE_NAME_FILTER', instanceNameFilter: str }),
      setInstanceTypeFilter: (instType) => dispatch({type: 'APPLY_INSTANCE_TYPE_FILTER', instanceTypeFilter: instType }) 
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);