import React, { Component } from 'react';
import InstanceTableRow from './InstanceTableRow'
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
class StatusChecker extends Component {
    
    constructor(props) {
        super(props)
        this.instance_source_data = require('../instances.json').instances
        this.state = {
            instances: this.instanceFeed(props.instanceTypeFilter, props.instanceNameFilter)
        }

        this.updateInstancesHealthStatuses()
        this.timerId = setInterval(this.decreaseTimeout.bind(this), 1000);
    }

    instanceFeed(instanceType, nameStr) {
        let instance_data = this.instance_source_data
        if(instanceType !== null) {
            instance_data = instance_data.filter( elem => elem.type === instanceType)
        }
        if(nameStr !== null) {
            instance_data = instance_data.filter( elem => {
                return elem.client.toLowerCase().includes(nameStr.toLowerCase()) ||
                    elem.name.toLowerCase().includes(nameStr.toLowerCase())
            } )
        }
        return instance_data.map((el, i) => {
            el.errors = null
            return el
        }).sort((a, b) => a.client.localeCompare(b.client)) 
    }


    decreaseTimeout() {
        this.props.decrementGlobalTimer()
        
        if(this.props.globalTimer === 0) {
            this.updateInstancesHealthStatuses()
        } 
    }

    updateInstancesHealthStatuses() {
        console.log('updateInstancesHealthStatuses',this.state.instances.length)
        this.state.instances.map((instance, i) => this.checkInstanceHealth(instance, i) )
    }

    componentDidUpdate(prevProps) {
        const instanceListUpdatedCallback = () => {
            console.log('instanceListUpdatedCallback')
            this.updateInstancesHealthStatuses()
        }
        //filtering criteria changed
        if ( (this.props.instanceTypeFilter !== prevProps.instanceTypeFilter) || 
            (this.props.instanceNameFilter !== prevProps.instanceNameFilter) ) {

            console.log('filtering criteria changed')
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
                instance.health = data;
                instance.errors = null ;
                this.setState(state => { state.instances[i] = instance; return state;  })
            })
            .catch((errors)=> {
                instance.health = null;
                instance.errors = {"error": errors} ;
                this.setState(state => { state.instances[i] = instance; return state;  })
            });
        const allowedUrls = ['https://feature1.spaceos.io','https://feature2.spaceos.io']          
        if(allowedUrls.includes(instance.url)) {
            const web_status_url = instance.url+'/commit_info.json'
            console.info('AHAHAH', web_status_url)
            fetch(web_status_url)
            .then(response => response.json())
            .then(data => {
                instance.webHealth = data
                instance.webErrors = null
                console.log('webHealth', data)
                sessionStorage.setItem(instance.url, JSON.stringify(data))
                this.setState(state => {state.instances[i] = instance; return state;})
            }) 
            .catch((errors)=> {
                instance.webHealth = null;
                sessionStorage.setItem(instance.url, JSON.stringify(errors))
                //instance.webErrors = {"error": errors} ;
                
                //this.setState(state => { state.instances[i] = instance; return state;  })
            });
        } else {
            console.info('niet')
        }

    }

    render() {
        return(
            <div>
                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan="5">Common info</th>
                            <th colSpan="3">Backend status</th>
                            <th colSpan="3">Frontend status</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Instance</th>
                            <th>Type</th>
                            <th>Health</th>
                  
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
              
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //.sort(function(a,b){return b.isProd-a.isProd})
                            this.state.instances
                                .map(function(instance, i){
                                return(
                                    <InstanceTableRow identifier={i} key={instance.id} instance={instance}></InstanceTableRow>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker)