import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
class SideInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {counter: props.counter}
    }
    render() {
        return(
          <Jumbotron>
                <h2 > {this.state.counter }s</h2>
          </Jumbotron>
        )
    }
}

export default SideInfo
