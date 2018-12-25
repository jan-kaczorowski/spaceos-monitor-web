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

        console.log('FILTERING BY TYPE: '+instanceType)
        console.log('FILTERING BY NAME: '+nameStr)
        if(instanceType !== null) {
            instance_data = instance_data.filter( elem => elem.type === instanceType)
        }
        if(nameStr !== null) {
            instance_data = instance_data.filter( elem => {
                console.log('elem',elem.client)
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
        console.log('GLOBAL TIMER: '+this.props.globalTimer)
        console.log('TYPE FILTER: '+this.props.instanceTypeFilter)
        if(this.props.globalTimer === 0) {
            this.updateInstancesHealthStatuses()
        } 
    }

    updateInstancesHealthStatuses() {
        this.state.instances.map((instance, i) => this.checkInstanceHealth(instance, i) )
    }

    componentDidUpdate(prevProps) {
        if ( (this.props.instanceTypeFilter !== prevProps.instanceTypeFilter) || 
            (this.props.instanceNameFilter !== prevProps.instanceNameFilter) ) {
          console.info('props changed!')
          //updating local state
          this.setState((state, props) => {
            state.instances = this.instanceFeed(props.instanceTypeFilter, props.instanceNameFilter)
            return state; 
          })
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
    }

    render() {
        return(
            <div>
                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan="5">Common info</th>
                            <th colSpan="4">Code status info</th>
                            <th colSpan="3"></th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Instance</th>
                            <th>Type</th>
                            <th>Health</th>
                            <th>Commiter</th>
                            <th>Commit Msg</th>
                            <th>Commit Time</th>
                            <th>Commit hash</th>
                            <th colSpan="3"></th>
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


// const mapStateToProps = (state) => {
//     return {
//       globalTimer: state.globalTimer,
//       instanceTypeFilter: state.instanceTypeFilter,
//       instanceNameFilter: state.instanceNameFilter
//     }
//   }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         decrementGlobalTimer: () => dispatch({type: 'DECREMENT_GLOBAL_TIMER'}),
//         setInstanceNameFilter: (str) => dispatch({type: 'APPLY_INSTANCE_NAME_FILTER', instanceNameFilter: str }),
//         setInstanceTypeFilter: (instType) => dispatch({type: 'APPLY_INSTANCE_TYPE_FILTER', instanceTypeFilter: instType }) 
//     }
// }
  
export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker)