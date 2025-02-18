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
        const hash = instance.web_status_body.body.commit_hash;
        const linkUrl = `https://github.com/SpaceOSLtd/web-wms/commit/${hash}`;
        if(hash) {
            return <a className="instance-link" href={linkUrl} target="_blank" rel="noopener noreferrer">#{hash}</a>  
        } else {
            return '';
        }
    }

    commitDate(instance) {
        const timestamp = instance.web_status_body.body.timestamp
        if(timestamp) {
            return <Moment date={new Date(timestamp)} format="D MMM YYYY" />
        } else {
            return '';
        }
    }

    render() {
        const instance = this.state.instance
        if(instance.web_status_body.state === 'ok') {
            return (
                <React.Fragment>
                    <td className="left-border">
                        { instance.web_status_body.body.committer_name }
                    </td>
                    <td className="commit-msg">
                        { instance.web_status_body.body.commit_subject  }
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

export default connect(mapStateToProps, mapDispatchToProps)(WebTableRowFragment);