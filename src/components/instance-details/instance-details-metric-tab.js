/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { Row, Col, Button, Input, Card,CardBody, CardHeader, Form, FormGroup, Label} from 'reactstrap';
    
class InstanceDetailsMetricTab extends React.Component {

  constructor(props) {
    super(props);
    this.instance = props.instanceModalResource
    this.title = 'Metric'
  }

  webJenkinsJobLink() {
    if(!this.instance.slug) return '';
    return (
      <a className="btn btn-secondary btn-block" 
      href={'https://jenkins.up-next.com/job/wms_web_build-'+this.instance.slug} 
      target="_blank" rel="noopener noreferrer">Goto Web Build Jenkins job</a>  
    )
  }

  coreJenkinsJobLink() {
    if(!this.instance.slug) return '';
    return (
      <a className="btn btn-secondary btn-block" 
      href={'https://jenkins.up-next.com/job/wms_core_release-'+this.instance.slug} 
      target="_blank" rel="noopener noreferrer">Goto Core Release Jenkins job</a>  
    )
  }

  showWebGroup() {
    if(this.instance && (this.instance.backend_status_body.state === 'ok') ) {
      return (
        <Col className='col-std'>
          <Card>
            <CardHeader tag="h3">Backend</CardHeader>
            <CardBody>
                <dl>
                  <dt>Commit hash</dt>
                  <dd>{ this.instance.backend_status_body.body.git_commit_data.commit_hash }</dd>

                  <dt>Commit date</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.commit_timestamp }</dd>

                  <dt>Commit subject</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.commit_subject }</dd>
                
                  <dt>Branch name</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.branch_name }</dd>
                
                  <dt>Commiter name</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.committer_name }</dd>
                
                  <dt>Build timestamp</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.build_timestamp }</dd>
                    
                  <dt>Build number</dt>
                  <dd>{this.instance.backend_status_body.body.git_commit_data.build_number }</dd>
                
                </dl>    
              {this.coreJenkinsJobLink()}
            </CardBody>
          </Card>        
        </Col>
      )
    } else return '';
  }

  showBackendGroup() {
    if(this.instance && (this.instance.web_status_body.state === 'ok') ) {
      return (
        <Col className='col-std'>
          <Card>
            <CardHeader tag="h3">Frontend</CardHeader>
            <CardBody>
                <dl>
                  <dt>Commit hash</dt>
                  <dd>{ this.instance.web_status_body.body.commit_hash }</dd>

                  <dt>Commit date</dt>
                  <dd>{this.instance.web_status_body.body.commit_timestamp }</dd>
                  
                  <dt>Commit subject</dt>
                  <dd>{this.instance.web_status_body.body.commit_subject }</dd>                
                  
                  <dt>Branch name</dt>
                  <dd>{this.instance.web_status_body.body.branch_name }</dd>
                
                  <dt>Commiter name</dt>
                  <dd>{this.instance.web_status_body.body.committer_name }</dd>
                
                  <dt>Build timestamp</dt>
                  <dd>{this.instance.web_status_body.body.build_timestamp }</dd>
                    
                  <dt>Build number</dt>
                  <dd>{this.instance.web_status_body.body.build_number }</dd>
                
                </dl>    
              {this.webJenkinsJobLink()}
            </CardBody>
          </Card>        
        </Col>
      )
    } else return '';
  }

  showButtons() {
    if(this.instance) {
      return (
        <Col className='col-std'>
          <a className="instance-link btn btn-secondary btn-block" 
              href={this.instance.url} 
              target="_blank" rel="noopener noreferrer">Goto Instance</a>       

          <br/>
          
          <a className="instance-link btn btn-outline-secondary btn-block" 
              href={'http://'+this.instance.real_ip+':9000'} 
              target="_blank" rel="noopener noreferrer">Goto Portainer</a>  
          
          <br/>

          <a className="instance-link btn btn-outline-secondary btn-block" 
              href={this.instance.url+'/api/v2/config'} 
              target="_blank" rel="noopener noreferrer">Goto Config (GitHub)</a>     

          {this.showMiniForm()}            
        </Col>
      )
    } else return '';
  }

  showMiniForm() {
    return (
      <div>
        <br/>
        <Form>
          <FormGroup>
            <Label>Real IP Address</Label>
            <Input value={this.instance.real_ip} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>Hosting provider</Label>
            <Input value={this.instance.hosting_provider} readOnly  />
          </FormGroup>

          <FormGroup>
            <Label>URL</Label>
            <Input value={this.instance.url} readOnly />
          </FormGroup>
        </Form>
      </div>
    )
  }

  render() {
      
      if(this.instance) {
        

        return (
            <div>
              <Row>
                  {this.showWebGroup()}

                  {this.showBackendGroup()}
                
                  {this.showButtons()}
              </Row>
            </div>
          );
      } else return('')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsMetricTab)