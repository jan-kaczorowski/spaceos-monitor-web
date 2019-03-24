import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import { connect } from 'react-redux'



class ApiService  {
    static instance = new ApiService()

    //apiRootPath = 'https://orange.jankaczorowski.pl/api'
    //apiRootPath = 'http://127.0.0.1:4000/api'
    apiRootPath = 'https://orange.jankaczorowski.pl/api'

    commonHeaders = {
        "Accept": "application/json"
    }
    postHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    apiRootPath() { return this.apiRootPath; }

    getInstances = () => this.getEndpoint("/instances")

    getClients = () => this.getEndpoint("/clients")

    getEndpoint(relativePath) {
        return fetch(this.apiRootPath + relativePath, { 
            headers: this.commonHeaders
        }).then(response => response.json())    
    }

    updateClient(id,changeset) {
        return fetch(this.apiRootPath + "/clients/"+id, {
            headers: this.postHeaders,
            method: 'PUT',
            body: JSON.stringify({client: changeset})
        })
    }

    createClient(changeset) {
        return fetch(this.apiRootPath + "/clients", {
            headers: this.postHeaders,
            method: 'POST',
            body: JSON.stringify({client: changeset})
        })
    }
}


export default ApiService.instance


//export default connect(mapStateToProps, mapDispatchToProps)(ApiService.instance)