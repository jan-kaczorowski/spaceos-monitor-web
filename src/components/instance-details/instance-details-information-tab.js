/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { Row, Col, Button, Input, FormText, Form, FormGroup, Label } from 'reactstrap';
import ApiService from '../../services/api-service'

class InstanceDetailsInformationTab extends React.Component {

  constructor(props) {
    super(props);
    this.instance = props.instanceModalResource
    this.instance_types = {
      demo: 0, 
      production: 1, 
      staging: 2, 
      feature: 3
    }
    this.instance_statuses = {
      inactive: 0, 
      active: 1, 
      retired: 2 
    }
    this.state = { changeset: Object.assign({},this.props.instanceModalResource) }
  }

  close() {
    this.setState(function(state){
        state.changeset = null
        return state
    })
    this.props.toggleInstanceModal(null) 
  }

  handleChange(event) {
    const param_name = event.target.name
    const param_val = event.target.value

    this.setState(function(state){
        state.changeset[param_name] = param_val
        console.log(state.changeset)
        return state
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.instanceModalResource !== this.props.instanceModalResource) {
      nextState.changeset = Object.assign({}, nextProps.instanceModalResource)
      delete nextState.changeset.id
      return nextState
    }
  }

  submitChanges(){
    if(this.props.instanceModalResource.id) {
        console.log('update instance')
        ApiService.updateInstance(this.props.instanceModalResource.id,
            this.state.changeset
        ).then((res) => console.log('RES: '+ JSON.stringify(res)))

    } else { //POST
        console.log('create instance')
        ApiService.createInstance(this.state.changeset).then((res) => alert(JSON.stringify(res)))
    }
  }

  leftColForm() {
    return (
      <div>
          <FormGroup>
              <Label for="name">Instance Name</Label>
              <Input type="text" 
                     name="name" 
                     id="name" 
                     value={this.state.changeset.name} 
                     onChange={this.handleChange.bind(this)}
                     />
              <FormText>Example help text that remains unchanged.</FormText>
          </FormGroup>

          <FormGroup>
              <Label for="url">Instance full URL</Label>
              <Input type="text" 
                     name="url" 
                     id="url" 
                     value={this.state.changeset.url}
                     onChange={this.handleChange.bind(this)}
                     />
              <FormText>Example help text that remains unchanged.</FormText>
          </FormGroup>  

          <FormGroup>
              <Label for="client_id">Instance belongs to client</Label>
              <Input type="select" 
                     name="client_id" 
                     id="client_id"
                     onChange={this.handleChange.bind(this)}
                     defaultValue={this.state.changeset.client_id}
                     >
                  {this.props.clients.map((el, index) => <option key={index+1} value={el.id}>{el.name}</option>)}
              </Input>
              <FormText>Example help text that remains unchanged.</FormText>
          </FormGroup>  
      </div>
    )
  }

  middleColForm() {
    return (
      <div>
        <FormGroup>
            <Label for="slug">Slug</Label>
            <Input  type="text" 
                    name="slug" 
                    id="slug" 
                    value={this.instance.slug} 
                    onChange={this.handleChange.bind(this)}
                    />
            <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>

        <FormGroup>
              <Label for="type">Instance type</Label>
              <Input  type="select" 
                      name="type" 
                      id="type"
                      onChange={this.handleChange.bind(this)}
                      defaultValue={this.state.changeset.type}
                      value={this.state.changeset.type}
                      >
                  {Object.keys(this.instance_types).map((el, index) => <option key={index+1} value={el}>{el}</option>)}
              </Input>
              <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>  

        <FormGroup>
              <Label for="status">Instance status</Label>
              <Input type="select" 
                     name="status" 
                     id="status"
                     onChange={this.handleChange.bind(this)}
                     defaultValue={this.state.changeset.status}
                     value={this.state.changeset.status}
                     >
                  {Object.keys(this.instance_statuses).map((el, index) => <option key={index+1} value={this.instance_statuses[el]} >{el}</option>)}
              </Input>
              <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>  
                       
      </div>
    )
  }

  rightColForm() {
    return (
      <div>
        <FormGroup>
            <Label for="real_ip">Real IP</Label>
            <Input type="text" 
                   name="real_ip" 
                   id="real_ip" 
                   value={this.state.changeset.real_ip} 
                   onChange={this.handleChange.bind(this)}
                   />
            <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>

        <FormGroup>
            <Label for="hosting_provider">Hosting Provider</Label>
            <Input type="text" 
                   name="hosting_provider" 
                   id="hosting_provider" 
                   value={this.state.changeset.hosting_provider} 
                   onChange={this.handleChange.bind(this)}
                   />
            <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>        
      </div>
    )
  }


  showNotesField() {
    return (
      <div>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input type="textarea" 
                 name="notes" 
                 id="notes" 
                 value={this.state.changeset.notes} 
                 onChange={this.handleChange.bind(this)}
                 />
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>      
      </div>
    )
  }

  render() {
      
      if(this.instance) {
        
        return (
            <div>
              <Form>
                  <Row>
                    <Col>{this.leftColForm()}</Col>
                    <Col>{this.middleColForm()}</Col>
                    <Col>{this.rightColForm()}</Col>
                  </Row>
                  <Row>
                    <Col>{this.showNotesField()}</Col>
                  </Row>
              </Form>
              <Row>
                <Col>
                  <Button color="primary" size="lg" className="float-right" onClick={this.submitChanges.bind(this)}>Modify</Button>
                </Col>
              </Row>
            </div>
          );
      } else return('')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsInformationTab)
