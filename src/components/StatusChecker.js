import React, { Component } from 'react';
import InstanceTableRow from './instance-table/InstanceTableRow'
import NavBar from './NavBar'
import { Table, Row, Col, Progress, Badge, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import InstanceDetailsModal from './instance-details/InstanceDetailsModal'

class StatusChecker extends Component {
    
    constructor(props) {
        super(props)
        this.timerId = setInterval(this.decreaseTimeout.bind(this), 1000);
        this.audioFile = new Audio('sounds/bamboo.mp3')
        this.playSounds = localStorage.getItem('AUDIO_ENABLED')
        this.props.refreshInstances()
    }

    instanceFeed(instanceType, nameStr) {
        let instance_data = this.props.instances
        if(instanceType) {
            instance_data = instance_data.filter( elem => elem.type === instanceType)
        }
        if(nameStr) {
            instance_data = instance_data.filter( elem => {
                return elem.client.name.toLowerCase().includes(nameStr.toLowerCase()) ||
                    elem.name.toLowerCase().includes(nameStr.toLowerCase())
            } )
        }
        return instance_data.sort((a, b) => a.name.localeCompare(b.name))
    }

    decreaseTimeout() {
        this.props.decrementGlobalTimer()
        
        if(this.props.globalTimer === 0) {
            if(this.playSounds) { this.audioFile.play() }
            this.props.refreshInstances()
        } 
    }

    prepNewInstance(e) {
        const new_instance = {
            backend_status_body: { state: null},
            web_status_body: { state: null},
            name: '<New instance>'
        }
        this.props.toggleInstanceModal(new_instance, true)
    }


    componentDidUpdate(prevProps) {
        if ( (this.props.instanceTypeFilter !== prevProps.instanceTypeFilter) || 
            (this.props.instanceNameFilter !== prevProps.instanceNameFilter) ) {

            console.log('FILTERING BY TYPE: '+this.props.instanceNameFilter)
            console.log('FILTERING BY NAME: '+this.props.instanceTypeFilter)

            this.props.refreshInstances()
        }
    }

    render() {
        return(
        <div>
            <Row>
                <Col>
                <NavBar/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-center">
                        <small>Time to next refresh:</small> <Badge color="info">{this.props.globalTimer }s</Badge>
                    </div>
                    <Progress striped color="info" value={this.props.globalTimer * 100 / 30 } />
                
                    <Button size="lg" color="primary" className="new-instance-button" onClick={this.prepNewInstance.bind(this)}>
                        New Instance
                    </Button>

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
                                this.instanceFeed(this.props.instanceTypeFilter, this.props.instanceNameFilter)
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
                </Col>
            </Row>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusChecker)