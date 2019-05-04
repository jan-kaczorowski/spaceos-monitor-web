/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { Input, Form, FormGroup, FormText, Label } from 'reactstrap';
import ApiService from '../../services/api-service'

class ClientDetailsModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = { changeset: null }
    }
    
    close() {
        this.setState(function(state){
            state.changeset = null
            return state
        })
        this.props.toggleClientModal(null) 
    }
    
    handleChange(event) {
        const param_name = event.target.name
        const param_val = event.target.value

        this.setState(function(state){
            state.changeset[param_name] = param_val
            return state
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.clientModalResource !== this.props.clientModalResource) {
            nextState.changeset = Object.assign({},nextProps.clientModalResource)
            delete nextState.changeset.id
            return nextState
        }
    }

    submitChanges(){
        if(this.props.clientModalResource.id) {
            console.log('update client')
            ApiService.updateClient(this.props.clientModalResource.id,
                this.state.changeset
            ).then((res) => console.log('RES: '+JSON.stringify(res)))

        } else { //POST
            console.log('create client')
            ApiService.createClient(this.state.changeset).then((res) => alert(JSON.stringify(res)))
        }
    }

    render() {
        if(this.props.clientModalResource) {  
            let changedName = (this.state.changeset.name === this.props.clientModalResource.name) ? 'hidden' : 'visible'
            return (
                <div>
                    <Modal isOpen={this.props.clientModalShow} className={this.props.className}>
                    <ModalHeader toggle={this.close}>Client Details</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <h2>{this.props.clientModalResource.name}</h2>
                                {/* <pre>
                                    State: {JSON.stringify(this.state)}
                                </pre>
                                <pre>
                                    Props: {JSON.stringify(this.props.clientModalResource)}
                                </pre> */}
                                <Form>
                                    <FormGroup>
                                        <Label for="client_name">Client Name</Label>
                                        <Input type="text" name="name" id="name" value={this.state.changeset.name}  onChange={this.handleChange.bind(this)} 
                                            />
                                        <FormText style={{visibility: changedName }}>Example help text that remains unchanged.</FormText>
                                    </FormGroup>
                                    <Button color="primary" size="lg" className="float-right" onClick={this.submitChanges.bind(this)}>Modify</Button>
                                </Form>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.close.bind(this)}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            );
        } else return('')
    }
}
      
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsModal)
