import React from 'react';
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap';

import flame from '../../icons/flame.svg';
import checked from '../../icons/checked.svg';
import loading from '../../icons/loading.svg';
import question from '../../icons/question.svg';

class CommonInfoTableRowFragment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instance: this.props.instance
        }
        this.typeColorMap = {
            demo: 'secondary',
            dev: 'secondary',
            prod: 'primary',
            feature: 'warning'
        }
    }

    health() {
        const inst = this.state.instance
        if ((inst.backend_status_http_code === 200) && (inst.web_status_http_code === 200)) {
            return 'healthy'
        } else if ((inst.backend_status_http_code === 999) && (inst.web_status_http_code === 999)) {
            return 'unknown'
        } else {
            return 'danger'
        }
    }

    renderInstanceHealthIcon() {
        const health = this.health()
        if(health === 'healthy') {
            return (
                <td>
                    <img src={checked} className="icon icon-checked" alt="icon-checked" />
                </td>
            )
        }
        else if(health === 'danger') {
            return (
                <td>
                    <img src={flame} className="icon icon-flame" alt="icon-flame" />
                </td>
            )
        }
        else if(health === 'unknown') {
            return (
                <td>
                    <img src={question} className="icon icon-question" alt="icon-question" />
                </td>
            )
        }
        else {
            return (
                <td>
                    <img src={loading} className="icon icon-spinning icon-loading" alt="icon-loading" />
                </td>
            )
        }

    }

    render() {
        const instance = this.state.instance
        return (
            <React.Fragment>
                <td>{this.props.rowID}</td>
                <td>{instance.client.name}</td>
                <td>
                    <strong className='instance-name'>{instance.name}</strong>      
                </td>
                <td>
                    <Badge color={this.typeColorMap[instance.type]}>{instance.type.toUpperCase()}</Badge>
                </td>
                {this.renderInstanceHealthIcon()}
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonInfoTableRowFragment);