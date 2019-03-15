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

    renderInstanceHealthIcon() {
        if(this.state.instance.backend_status_body) {
            return (
                <td>
                    <img src={checked} className="icon icon-checked" alt="icon-checked" />
                </td>
            )
        }
        else if(this.state.instance.errors) {
            return (
                <td>
                    <img src={flame} className="icon icon-flame" alt="icon-flame" />
                </td>
            )
        }
        else if(!this.state.instance.errors && !this.state.instance.coreHealth) {
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
                <td>{instance.client}</td>
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