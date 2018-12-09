import React, { Component } from 'react';
import { Jumbotron, Badge } from 'reactstrap';
class GeneralInfo extends Component {
    render() {
        return(
            <Jumbotron>
                <h2 >SpaceOS Instances</h2>
                <p className="lead">Simple status checker for all our instances</p>
                <hr className="my-2" />
                <p>It uses our <Badge color="secondary">GET /status</Badge> endpoint as a data source.</p>
          </Jumbotron>
        )
    }
}

export default GeneralInfo

















