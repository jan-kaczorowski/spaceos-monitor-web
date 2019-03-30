/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'

class InstanceDetailsConfigTab extends React.Component {

  render() {
      
      if(this.props.instanceModalResource) {
        const instance = this.props.instanceModalResource

        return (
            <div>
                <h1>Modal config {instance.name}</h1>
            </div>
          );
      } else return('')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsConfigTab)