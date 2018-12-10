import React, { Component } from 'react';
import InstanceTableRow from './InstanceTableRow'
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
class StatusChecker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instances: require('../instances.json').instances,
            timeout: 15 
        }

        this.updateInstancesHealthStatuses()
        this.timerId = setInterval(this.decreaseTimeout.bind(this), 1000);
    }

    decreaseTimeout() {
        this.props.decrementGlobalTimer()
        console.log('GLOBAL TIMER: '+this.props.globalTimer)
        if(this.props.globalTimer === 0) {
            this.updateInstancesHealthStatuses()
        } 
    }

    updateInstancesHealthStatuses() {
        console.log('Updating instance status!')
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
                            <th colSpan="4">Common info</th>
                            <th colSpan="3">Code status info</th>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker);

//export default StatusChecker