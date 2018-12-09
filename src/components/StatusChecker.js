import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import flame from '../icons/flame.svg';
import Moment from 'react-moment';
import 'moment-timezone';

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

    hashToLink(instance) {
        const hash = instance.health.git_commit_data.commit_hash
        const link = `https://github.com/SpaceOSLtd/core-wms/commit/${hash}`
        return <a className="instance-link" href="{hash}">{link}</a>      
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
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>
                                    <a className="instance-link" href="{instance.url}">{instance.url}</a>      
                                </td>
                                <td>
                                    {instance.isProd ? 'PROD' : 'NON-PROD' } 
                                </td>
                                <td>
                                    { instance.health ? (<img src={logo} className="icon icon-react" alt="icon-react" />) : (<img src={flame} className="icon icon-flame" alt="icon-flame" />)}
                                </td>

                                <td>
                                    { instance.health && instance.health.git_commit_data ? instance.health.git_commit_data.committer_name : ''  }
                                </td>
                                
                                <td>
                                    { instance.health && instance.health.git_commit_data ? instance.health.git_commit_data.commit_subject : ''  }
                                </td>

                                <td>
                                    { instance.health && instance.health.git_commit_data ? <Moment date={new Date(instance.health.git_commit_data.timestamp)} format="D MMM YYYY" /> : ''  }
                                </td>

                                <td>
                                    { instance.health && instance.health.git_commit_data ? this.hashToLink(instance) : ''  }
                                </td>
                            </tr>
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