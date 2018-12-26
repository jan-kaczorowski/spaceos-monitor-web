import React, { Component } from 'react';
import flame from '../../icons/flame.svg';
import checked from '../../icons/checked.svg';
import loading from '../../icons/loading.svg';
import { Badge } from 'reactstrap';
import 'moment-timezone';

import WebTableRowFragment from './WebTableRowFragment'
import CoreTableRowFragment from './CoreTableRowFragment'
import CommonInfoTableRowFragment from './CommonInfoTableRowFragment'

class InstanceTableRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            identifier: this.props.identifier,
            instance: this.props.instance
        }
    }


    buttonSection(instance) {
        return (
            <React.Fragment>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url} target="_blank" rel="noopener noreferrer">Goto Jenkins</a>  
                </td>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url} target="_blank" rel="noopener noreferrer">Goto JIRA issue</a>  
                </td>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url+'/api/v2/config'} target="_blank" rel="noopener noreferrer">Goto Config</a>  
                </td>
            </React.Fragment>
        )
    }

    commonInfoSection(instance, rowID) {
        return (
            <React.Fragment>
                <td>{rowID}</td>
                <td>{instance.client}</td>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url} target="_blank" rel="noopener noreferrer">{instance.name}</a>      
                </td>
                <td>
                    <Badge color="primary">{instance.type.toUpperCase()}</Badge>
                </td>
            </React.Fragment>
        )
    }

    render() {
        const instance = this.state.instance
        const rowID = this.state.identifier+1

        if(instance.health) {
            return(
                <tr>
                    

                <CommonInfoTableRowFragment instance={instance} rowID={rowID} />
    
                <CoreTableRowFragment instance={instance}/>

                <WebTableRowFragment instance={instance}/>
                </tr>
            )
        //errors
        } else if(instance.errors) {
            return(
                <tr>
                    {this.commonInfoSection(instance, rowID)}
                    <td>
                        <img src={flame} className="icon icon-flame" alt="icon-flame" />
                    </td>
                    <td colSpan="4">
                        Error occured when attempting to call <Badge color="secondary">GET /status</Badge> endpoint on this instance.
                    </td>

                </tr>
            )
        }
        //pending
        else return(
            <tr>
                {this.commonInfoSection(instance, rowID)}
                <td>
                    <img src={loading} className="icon icon-spinning icon-loading" alt="icon-loading" />
                </td>
                <td colSpan="4">
                    Gathering info...
                </td>
            </tr>
        )
    }

}

export default InstanceTableRow