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
        return <a className="instance-link" href={linkUrl} target="_blank" rel="noopener noreferrer">#{hash}</a>      
    }

    render() {
        const instance = this.state.instance
        if(instance.health) {
            return(
                <tr>
                <td>{this.state.identifier+1}</td>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url} target="_blank" rel="noopener noreferrer">{instance.url}</a>      
                </td>
                <td>
                    { instance.isProd ? (<Badge color="primary">PROD</Badge>) : (<Badge color="secondary">NON-PROD</Badge>) } 
                </td>
                <td>
                    <img src={checked} className="icon icon-checked" alt="icon-checked" />
                </td>
    
                <td>
                    { instance.health.git_commit_data ? instance.health.git_commit_data.committer_name : ''  }
                </td>
                
                <td>
                    { instance.health.git_commit_data ? instance.health.git_commit_data.commit_subject : ''  }
                </td>
    
                <td>
                    { instance.health.git_commit_data ? <Moment date={new Date(instance.health.git_commit_data.timestamp)} format="D MMM YYYY" /> : ''  }
                </td>
    
                <td>
                    { instance.health.git_commit_data ? this.hashToLink(instance) : ''  }
                </td>
            </tr>
            )
        //errors
        } else if(instance.errors) {
            return(
                <tr>
                    <td>{this.state.identifier+1}</td>
                    <td>
                        <a className="instance-link btn btn-outline-primary btn-block" href={instance.url}>{instance.url}</a>      
                    </td>
                    <td>
                        { instance.isProd ? (<Badge color="primary">PROD</Badge>) : (<Badge color="secondary">NON-PROD</Badge>) } 
                    </td>
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
                <td>{this.state.identifier+1}</td>
                <td>
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url}>{instance.url}</a>      
                </td>
                <td>
                    { instance.isProd ? (<Badge color="primary">PROD</Badge>) : (<Badge color="secondary">NON-PROD</Badge>) } 
                </td>
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