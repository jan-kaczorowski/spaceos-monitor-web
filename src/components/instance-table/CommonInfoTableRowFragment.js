import React from 'react';
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap';

import flame from '../../icons/flame.svg';
import checked from '../../icons/checked.svg';
import loading from '../../icons/loading.svg';

class CommonInfoTableRowFragment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instance: this.props.instance
        }
    }

    renderInstanceHealthIcon() {
        if(this.state.instance.health) {
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
                    <a className="instance-link btn btn-outline-primary btn-block" href={instance.url} target="_blank" rel="noopener noreferrer">{instance.name}</a>      
                </td>
                <td>
                    <Badge color="primary">{instance.type.toUpperCase()}</Badge>
                </td>
                {this.renderInstanceHealthIcon()}
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonInfoTableRowFragment);