/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import AuthService from '../services/auth-service'
import { AuthRoute } from 'react-router-auth'
class ProtectedRoute extends React.Component {
  render() {
      return(
        <AuthRoute path={this.props.path} component={this.props.component} redirectTo="/login" authenticated={this.props.isAuthenticated} />
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)