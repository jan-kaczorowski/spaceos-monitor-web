import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'

class ClientsList extends React.Component {

    componentDidMount() {
        // let search = window.location.search;
        let params = new URLSearchParams(this.props.location.search);
        console.log("PARAMS: ",params.toString())
        const paramas = JSON.parse(JSON.stringify(this.props.match.params));
        console.log("PARAMAS: ",paramas)
    }

    render() {
        return(
            <h4>Clients list Page</h4>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);


