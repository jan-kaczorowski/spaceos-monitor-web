import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import AuthService from '../services/auth-service'
import { GoogleLogin } from 'react-google-login';
import { Form, FormGroup, Jumbotron, Row, Col, Input } from 'reactstrap';

class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = { config: null}
    }

    componentDidMount() {
        AuthService.getConfig().then((cfg_data)=>{
            console.log('cfg data',cfg_data)
            this.setState((state)=> {
                state.config = cfg_data
                return state;
            })
        })

    }

    render() {
        if(this.state.config) {
                return(
                    <div className="login-form-container">
                        
                        <Row className="justify-content-start app-title">
                            <Col xs="10" md="6" className="p-0">
                                <h1>spaceOS Monitoring Tool</h1>
                            </Col>
                        </Row>
    
                        <Row className="justify-content-start">
                            <Col xs="10" md="4" className="p-0">
       
                                <GoogleLogin
                                clientId={this.state.config.clientId}
                                buttonText="Login"
                                className="google-login-button"
                                responseType="code"
                                accessType="offline"
                                uxMode="popup"
                                redirectUri="https://spaceos-monitor.jankaczorowski.pl/oauth/google/callback"
                                fetchBasicProfile={false}
                                scope={this.state.config.scope}
                                onSuccess={AuthService.responseGoogle.bind(AuthService)}
                                onFailure={AuthService.responseGoogle.bind(AuthService)}
                            />
                            </Col>   
                        </Row>
    
                        <Row className="justify-content-start">
                            <Col xs="10" md="4" className="p-0">
                    
                                <Form className="login-form"> 
                                    <FormGroup row>
                                        <Col sm={12}>
                                            <Input  type="email" 
                                                    name="email" 
                                                    id="login-email" 
                                                    placeholder="Email" 
                                                    bsSize="lg" disabled />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col sm={12}>
                                            <Input  type="password" 
                                                    ame="email" 
                                                    id="login-password" 
                                                    placeholder="Password" 
                                                    bsSize="lg" disabled/>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>   
                        </Row>
                        <Row className="justify-content-start descr-jumbotron">
                            <Col xs="10" md="4" className="p-0">
                                <Jumbotron>
                                    <h4 >Note:</h4>
                                    <p className="lead">
                                        This is a tiny app to track statuses of various spaceOS instances. 
                                        Please use Google login. Regular login is not a priority and is temporarily disabled.
                                    </p>
                                    <hr />
                                    <p>To contact author please bother <a href="mailto:jan.kaczorowski@spaceos.io">@JanKaczorowski</a></p>
                                </Jumbotron>
                            </Col>   
                        </Row>
                    </div>
                )
        } else return '';

    } 
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));