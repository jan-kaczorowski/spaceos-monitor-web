import React, { Component } from 'react';
import InstanceTableRow from './InstanceTableRow'

class StatusChecker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instances: require('../instances.json').instances,
            dev: null 
        }
        console.log('state',this.state)
        this.updateInstancesHealthStatuses()
    }

    updateInstancesHealthStatuses() {
        //this.checkInstanceHealth(this.state.instances[0],0)
        this.state.instances.map((instance,i) => this.checkInstanceHealth(instance,i) )
    }

    checkInstanceHealth(instance,i) {
        fetch(instance.url+'/status')
            .then(response => response.json())
            .then(data => {
                //this.setState.instancedb.dev = data
                this.setState(state => {
                    state.instances[i].health = data;
                    return state;
                })
                console.log(data);
            });
    }




    render() {
        
        return(
            <div>
                <h1>spaceOS Instances:</h1>
                <span>{this.state.instances[0].health ? this.state.instances[0].health.git_commit_data.committer_name : ''}</span>
                <table>
                    <thead>
                        <tr>
                            <th colspan="4">Common</th>
                            <th colsoam="3">Commit data</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Instance</th>
                            <th>Type</th>
                            <th>Health</th>
                            <th>Commit</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                {
                    this.state.instances.map(function(instance,i){
                        return(
                            <InstanceTableRow key={i} instance={instance}></InstanceTableRow>
                        )
                    })
                }
                    </tbody>
                </table>
                
            </div>

        );
    }
}


export default StatusChecker