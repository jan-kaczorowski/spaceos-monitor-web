import React, { Component } from 'react';
import InstanceTableRow from './instance-table/InstanceTableRow'
import { Table, Progress, Badge } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import InstanceDetailsModal from './instance-details/InstanceDetailsModal'
import ApiService from '../services/api-service'
class StatusChecker extends Component {
    
    constructor(props) {
        super(props)
        this.instance_source_data = [] //
        this.state = {
            instances: [], //this.instanceFeed(props.instanceTypeFilter, props.instanceNameFilter)
        }
        this.apiService = ApiService
        this.updateInstancesHealthStatuses()
        this.timerId = setInterval(this.decreaseTimeout.bind(this), 1000);
        this.audioFile = new Audio('sounds/bamboo.mp3')
    }

    instanceFeed(instanceType, nameStr) {
        let instance_data = this.instance_source_data
        // if(instanceType !== null) {
        //     instance_data = instance_data.filter( elem => elem.type === instanceType)
        // }
        // if(nameStr !== null) {
        //     instance_data = instance_data.filter( elem => {
        //         return elem.client.toLowerCase().includes(nameStr.toLowerCase()) ||
        //             elem.name.toLowerCase().includes(nameStr.toLowerCase())
        //     } )
        // }
        // return instance_data.map((el, i) => {
        //     el.errors = null
        //     return el
        // }).sort((a, b) => a.client.localeCompare(b.client)) 
    }

 

    decreaseTimeout() {
        this.props.decrementGlobalTimer()
        
        if(this.props.globalTimer === 0) {
            if(localStorage.getItem('AUDIO_ENABLED')) {
                this.audioFile.play()
            }
            //this.updateInstancesHealthStatuses()
        } 
    }



    updateInstancesHealthStatuses() {
        //console.log('updateInstancesHealthStatuses',this.state.instances.length)
        //this.state.instances.map((instance, i) => this.checkInstanceHealth(instance, i) )
        let apiRootPath = 'http://localhost:4000/api'

        //this.apiService.getInstances().then((json)=> console.log("API SAYS:"+JSON.stringify(json)));

        // let auth_string = 'Basic ' + new Buffer("spaceos:J@kbyCoToJ3st3m").toString('base64')
        // sessionStorage.setItem('AUTH_STRING',auth_string)
   
        let instance_source_data = this.apiService.getInstances()
                .then((json_response) => {
                    localStorage.setItem("instances",JSON.stringify(json_response.data)) //just for monitoring
                    this.setState((state,props) => {
                        state.instances = json_response.data
                        return state;
                    })
                })
        

    }

    componentDidUpdate(prevProps) {
        const instanceListUpdatedCallback = () => {
            this.updateInstancesHealthStatuses()
        }
        //filtering criteria changed
        if ( (this.props.instanceTypeFilter !== prevProps.instanceTypeFilter) || 
            (this.props.instanceNameFilter !== prevProps.instanceNameFilter) ) {

            console.log('FILTERING BY TYPE: '+this.props.instanceNameFilter)
            console.log('FILTERING BY NAME: '+this.props.instanceTypeFilter)

            this.setState((state, props) => {
            state.instances = this.instanceFeed(props.instanceTypeFilter, props.instanceNameFilter)
            return state; 
            }, instanceListUpdatedCallback)
        }

    }

    checkInstanceHealth(instance,i) {
        fetch(instance.url+'/status')
            .then(response => response.json())
            .then(data => {
                instance.coreHealth = data.git_commit_data;
                instance.errors = null ;
                this.setState(state => { state.instances[i] = instance; return state;  }, () => {
                    localStorage.setItem(instance.url, JSON.stringify(instance))
                })
                
            })
            .catch((errors)=> {
                instance.coreHealth = null;
                instance.coreErrors = {"error": errors} ;

                this.setState(state => { state.instances[i] = instance; return state;  }, () => {
                    localStorage.setItem(instance.url, JSON.stringify(instance))
                })
            });

        fetch(instance.url+'/commit_info.json')
            .then(response => response.json())
            .then(data => {
                instance.webHealth = data
                instance.webErrors = null

                this.setState(state => {state.instances[i] = instance; return state;}, () => {
                    localStorage.setItem(instance.url, JSON.stringify(instance))
                })
            }) 
            .catch((errors)=> {
                instance.webHealth = null;
                instance.webErrors = {"error": errors} ;
                this.setState(state => { state.instances[i] = instance; return state;  }, () => {
                    localStorage.setItem(instance.url, JSON.stringify(instance))
                })
            });
        

    }

    render() {
        return(
            <div>
                <div className="text-center">
                    <small>Time to next refresh:</small> <Badge color="info">{this.props.globalTimer }s</Badge>
                </div>
                <Progress striped color="info" value={this.props.globalTimer * 100 / 30 } />
                
                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan="5">Common info</th>
                            <th colSpan="4" className="left-border">Backend status</th>
                            <th colSpan="4" className="left-border">Frontend status</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Instance</th>
                            <th>Type</th>
                            <th>Health</th>
                            <th className="left-border">Committer</th>
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
                            <th className="left-border">Committer</th>
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.instances
                                .map(function(instance, i){
                                return(
                                    <InstanceTableRow 
                                        identifier={i} 
                                        key={instance.id} 
                                        instance={instance}/>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <InstanceDetailsModal />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker)