/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
// Features

class InstanceDetailsFeaturesTab extends React.Component {

  render() {
    return (
        <div>
            <h1>Modal part Features</h1>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsFeaturesTab)