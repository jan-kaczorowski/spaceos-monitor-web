import React, { Component } from 'react';
import InstanceTableRow from './InstanceTableRow'
import { Table } from 'reactstrap';
class StatusChecker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instances: require('../instances.json').instances,
            timeout: 15 
        }
        console.log('state',this.state)
        this.updateInstancesHealthStatuses()
        this.timerId = setInterval(this.decreaseTimeout.bind(this), 1000);
    }

    decreaseTimeout() {
        //console.log('STATE SS',this.state)
        let newTimeoutVal
        
        if(this.state.timeout === 0) {
            newTimeoutVal = 15
            this.updateInstancesHealthStatuses()
        } else {
            newTimeoutVal = this.state.timeout - 1
        }
        this.setState(state => {
            this.state.timeout = newTimeoutVal
            
            return state;
        }) 
        console.log('TIMEOUT: '+this.state.timeout)  
    }

    updateInstancesHealthStatuses() {
        this.state.instances.map((instance,i) => this.checkInstanceHealth(instance,i) )
    }

    checkInstanceHealth(instance,i) {
        fetch(instance.url+'/status')
            .then(response => response.json())
            .then(data => {
                this.setState(state => {
                    state.instances[i].health = data;
                    state.instances[i].key = i ;
                    return state;
                })
            })
            .catch((errors)=> {
                console.log('ERRORS',errors)
                this.setState(state => {
                    state.instances[i].key = i ;
                    state.instances[i].errors = errors ;
                    return state;
                })
            });
    }

    render() {
        
        return(
            <div>
                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan="4">Common</th>
                            <th colSpan="3">Commit data</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Instance</th>
                            <th>Type</th>
                            <th>Health</th>
                            <th>Commiter</th>
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.instances.map(function(instance,i){
                                return(
                                    <InstanceTableRow key={i} identifier={i} instance={instance}></InstanceTableRow>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default StatusChecker