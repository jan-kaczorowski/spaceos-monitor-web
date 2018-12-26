/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'

class InstanceDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.toggleInstanceModal(null)
  }

  buttonSection(instance) {
    return (
        <React.Fragment>
            <a className="instance-link btn btn-outline-primary btn-block disabled" href={instance.url} target="_blank" rel="noopener noreferrer">Goto Jenkins</a>  
            <br/>
            <a className="instance-link btn btn-outline-primary btn-block disabled" href={instance.url} target="_blank" rel="noopener noreferrer">Goto JIRA issue</a>  
            <br/>
            <a className="instance-link btn btn-primary btn-block" href={instance.url+'/api/v2/config'} target="_blank" rel="noopener noreferrer">Goto Config</a>  
        </React.Fragment>
    )
}


  render() {
      
      if(this.props.instanceModalResource) {
        const instance = this.props.instanceModalResource

        return (
            <div>
              <Modal isOpen={this.props.instanceModalShow} className={this.props.className}>
                <ModalHeader toggle={this.close}>{instance.name}</ModalHeader>
                <ModalBody>
                    {this.buttonSection(instance)}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.close}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
      } else return('')
  }
}

//export default InstanceDetailsModal;
export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetailsModal)