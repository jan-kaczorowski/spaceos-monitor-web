import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import NavBar from './NavBar'
import { Row, Col } from 'reactstrap';

class AboutPage extends React.Component {

    componentDidMount() {
        // let search = window.location.search;
        // let params = new URLSearchParams(this.props.location.search);
        // console.log("PARAMS: ",params.toString())
        // const paramas = JSON.parse(JSON.stringify(this.props.match.params));
        // console.log("PARAMAS: ",paramas)
    }

    render() {
        return(
        <div>
            <Row>
                <Col>
                    <NavBar/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>About Page</h4>
                </Col>
            </Row>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);


