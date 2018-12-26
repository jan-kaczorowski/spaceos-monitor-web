import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'

import WebTableRowFragment from './WebTableRowFragment'
import CoreTableRowFragment from './CoreTableRowFragment'
import CommonInfoTableRowFragment from './CommonInfoTableRowFragment'

class InstanceTableRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            identifier: this.props.identifier,
            instance: this.props.instance
        }
    }

    rowClickHandler(e, instance) {
        this.props.toggleInstanceModal(instance)
    }



    render() {
        const instance = this.state.instance
        const rowID = this.state.identifier+1
        return(
            <tr onClick={(e)=> this.rowClickHandler(e, instance)}>
                <CommonInfoTableRowFragment instance={instance} rowID={rowID} />
                <CoreTableRowFragment instance={instance}/>
                <WebTableRowFragment instance={instance}/>
            </tr>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceTableRow);