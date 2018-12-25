import React, { Component } from 'react';
import flame from '../icons/flame.svg';
import checked from '../icons/checked.svg';
import loading from '../icons/loading.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import { Badge } from 'reactstrap';
class InstanceTableRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            identifier: this.props.identifier,
            instance: this.props.instance
        }
    }
    hashToLink(instance) {
        const hash = instance.health.git_commit_data.commit_hash;
        const linkUrl = `https://github.com/SpaceOSLtd/core-wms/commit/${hash}`;
        if(hash) {
            return <a className="instance-link" href={linkUrl} target="_blank" rel="noopener noreferrer">#{hash}</a>  
        } else {
            return '';
        }
    }

    commitDate(instance) {
        const timestamp = instance.health.git_commit_data.timestamp
        if(timestamp) {
            return <Moment date={new Date(timestamp)} format="D MMM YYYY" />
        } else {
            return '';
        }
    }

    commitMsg(instance) {
        if(instance.health.git_commit_data){
            return instance.health.git_commit_data.commit_subject || '(no commit message. Is jenkins job configured right?)'
        } else {
            return '(no commit data available)'
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
                {this.commonInfoSection(instance, rowID)}

                <td>
                    <img src={checked} className="icon icon-checked" alt="icon-checked" />
                </td>
    
                <td>
                    { instance.health.git_commit_data ? instance.health.git_commit_data.committer_name : ''  }
                </td>
                
                <td>
                    { this.commitMsg(instance)   }
                </td>
    
                <td>
                    { instance.health.git_commit_data ? this.commitDate(instance) : ''  }
                </td>
    
                <td>
                    { instance.health.git_commit_data ? this.hashToLink(instance) : ''  }
                </td>
                {this.buttonSection(instance)}
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
                    {this.buttonSection(instance)}
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
                {this.buttonSection(instance)}
            </tr>
        )
    }

}

export default InstanceTableRow