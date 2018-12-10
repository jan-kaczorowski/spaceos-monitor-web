import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux'
class SideInfo extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {counter: props.counter}
    // }
    render() {
        return(
          <Jumbotron>
                <h2 >Time to refresh data: {this.props.globalTimer }s</h2>
          </Jumbotron>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      globalTimer: state.globalTimer
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        decrementGlobalTimer: ()=> dispatch({type: 'DECREMENT_GLOBAL_TIMER'})
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);