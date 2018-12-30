import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'

class AboutPage extends React.Component {

    render() {
        return(
            <h4>About Page</h4>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);