import React from 'react';
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { connect } from 'react-redux'
import Moment from 'react-moment';

class WebTableRowFragment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instance: this.props.instance
        }
    }

    hashToLink(instance) {
        const hash = instance.webHealth.commit_hash;
        const linkUrl = `https://github.com/SpaceOSLtd/core-wms/commit/${hash}`;
        if(hash) {
            return <a className="instance-link" href={linkUrl} target="_blank" rel="noopener noreferrer">#{hash}</a>  
        } else {
            return '';
        }
    }

    commitDate(instance) {
        const timestamp = instance.webHealth.timestamp
        if(timestamp) {
            return <Moment date={new Date(timestamp)} format="D MMM YYYY" />
        } else {
            return '';
        }
    }

    commitMsg(instance) {
        if(instance.webHealth){
            return instance.webHealth.commit_subject || '(no commit message. Is jenkins job configured right?)'
        } else {
            return '(no commit data available)'
        }
    } 

    render() {
        const instance = this.state.instance
        return (
            <React.Fragment>
                <td className="left-border">
                    { instance.webHealth ? instance.webHealth.committer_name : ''  }
                </td>
                <td className="commit-msg">
                    { this.commitMsg(instance)   }
                </td>
                <td>
                    { instance.webHealth ? this.commitDate(instance) : ''  }
                </td>
                <td>
                    { instance.webHealth ? this.hashToLink(instance) : ''  }
                </td>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebTableRowFragment);