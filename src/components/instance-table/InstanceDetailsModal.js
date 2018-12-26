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

  render() {
      
      if(this.props.instanceModalResource) {
        const instance = this.props.instanceModalResource

        return (
            <div>
              {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
              <Modal isOpen={this.props.instanceModalShow} className={this.props.className}>
                <ModalHeader>{instance.name}</ModalHeader>
                <ModalBody>




                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.close}>Do Something</Button>{' '}
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