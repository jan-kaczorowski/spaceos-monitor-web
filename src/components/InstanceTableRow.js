import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import flame from '../icons/flame.svg';
import Moment from 'react-moment';
import 'moment-timezone';

class InstanceTableRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: this.props.key,
            instance: this.props.instance
        }
    }
    hashToLink(instance) {
        const hash = instance.health.git_commit_data.commit_hash;
        const linkUrl = `https://github.com/SpaceOSLtd/core-wms/commit/${hash}`;
        return <a className="instance-link" href={linkUrl} target="_blank">#{hash}</a>      
    }

    render() {
        const instance = this.state.instance
        return(
            <tr key={this.state.key}>
            <td>{this.state.key+1}</td>
            <td>
                <a className="instance-link" href="{instance.url}">{instance.url}</a>      
            </td>
            <td>
                { instance.isProd ? 'PROD' : 'NON-PROD' } 
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
    }

}

export default InstanceTableRow