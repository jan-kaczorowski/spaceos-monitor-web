import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../store/reducer_interface'
import { Row, Col, Table, Button, Nav, NavItem, NavLink } from 'reactstrap';
import ApiService from '../../services/api-service'
import ClientDetailsModal from './ClientDetailsModal'

class ClientsList extends React.Component {

    constructor(props) {
        super(props)
        this.apiService = ApiService
        this.state = {showClientDetailsModal:false}
        this.props.refreshInstances()
    }

    rowClickHandler(e,client){
        this.props.toggleClientModal(client, true)
    }

    // @TODO: handle messaage + reloading list when client added
    prepNewClient(e) {
        this.props.toggleClientModal({name:""}, true)
    }

    render() {
        return (
          <div>
            <Row>
              <Col>
              <br/>
                <Nav pills>
                  <NavItem>
                    <Button size="lg" color="primary" onClick={this.prepNewClient.bind(this)}>
                      New Client
                    </Button>
                  </NavItem>
                </Nav>
                <br/>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Table responsive hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Client name</th>
                        <th>Instance count</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.clients.map(((instances, client, i) => {
                        const instancesCount = instances.filter((el) => { return el.client.id === client.id}).length
                        return (
                          <tr  key={client.id} onClick={(e)=> this.rowClickHandler(e, client)}>
                            <td>{i + 1}</td>
                            <td>{client.name}</td>
                            <td>{instancesCount}</td>
                            <td>
                              <Button disabled>Details</Button>
                            </td>
                          </tr>
                        );
                      }).bind(null,this.props.instances))}
                    </tbody>
                  </Table>
                </div>
              </Col>
             <ClientDetailsModal />
            </Row>
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);


