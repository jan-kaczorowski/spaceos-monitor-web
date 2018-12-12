import React, { Component } from 'react';
import InstanceTableRow from './InstanceTableRow'
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
class StatusChecker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instances: require('../instances.json')
                            .instances.map((el, i) => {
                                    el.errors = null
                                    return el
                                })
                            .sort((a, b) => a.client.localeCompare(b.client))
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
        this.state.instances.map((instance, i) => this.checkInstanceHealth(instance, i) )
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
        if(instance.url === 'https://dev.spaceos.io') {
            fetch(instance.url+'/commit_info.txt')
            .then(data => {
                console.log('COMMIT INFO RETURN:',data);
                // instance.health = data;
                // instance.errors = null ;
                // this.setState(state => { state.instances[i] = instance; return state;  })
            })
            .catch((errors)=> {
                console.info('err')
                // instance.health = null;
                // instance.errors = {"error": errors} ;
                // this.setState(state => { state.instances[i] = instance; return state;  })
            });
        }

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
                                .map(function(instance,i){
                                return(
                                    <InstanceTableRow identifier={i} instance={instance}></InstanceTableRow>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker)