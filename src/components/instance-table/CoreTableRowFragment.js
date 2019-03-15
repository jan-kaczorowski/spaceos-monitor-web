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
        const hash = instance.backend_status_body.body.git_commit_data.commit_hash;
        const linkUrl = `https://github.com/SpaceOSLtd/core-wms/commit/${hash}`;
        if(hash) {
            return <a className="instance-link" href={linkUrl} target="_blank" rel="noopener noreferrer">#{hash}</a>  
        } else {
            return '';
        }
    }

    commitDate(instance) {
        const timestamp = instance.backend_status_body.body.git_commit_data.commit_timestamp
        if(timestamp) {
            return <Moment date={new Date(timestamp)} format="D MMM YYYY" />
        } else {
            return '';
        }
    }

    commitMsg(instance) {
        return instance.coreHealth.commit_subject
    }


    render() {
        const instance = this.state.instance
        if(instance.backend_status_body.state === 'ok') {
            return (
                <React.Fragment>
                    <td className="left-border">
                        { instance.backend_status_body.body.git_commit_data.committer_name }
                    </td>
                    <td className="commit-msg">
                        { instance.backend_status_body.body.git_commit_data.commit_subject   }
                    </td>
                    <td>
                        { this.commitDate(instance) }
                    </td>
                    <td>
                        { this.hashToLink(instance) }
                    </td>
                </React.Fragment>
            )
        } else return(
            <td colSpan="4" className="commit-msg left-border">(No data available)</td>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreTableRowFragment);