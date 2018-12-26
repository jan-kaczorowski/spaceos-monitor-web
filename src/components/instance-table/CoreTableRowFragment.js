import React from 'react';
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { connect } from 'react-redux'
import Moment from 'react-moment';

class CoreTableRowFragment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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


    render() {
        const instance = this.state.instance
        if(instance.health) {
            return (
                <React.Fragment>
                    <td className="left-border">
                        { instance.health.git_commit_data ? instance.health.git_commit_data.committer_name : ''  }
                    </td>
                    <td className="commit-msg">
                        { this.commitMsg(instance)   }
                    </td>
                    <td>
                        { instance.health.git_commit_data ? this.commitDate(instance) : ''  }
                    </td>
                    <td>
                        { instance.health.git_commit_data ? this.hashToLink(instance) : ''  }
                    </td>
                </React.Fragment>
            )
        } else return('')

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreTableRowFragment);