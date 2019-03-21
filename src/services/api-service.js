import { mapDispatchToProps, mapStateToProps } from '../store/reducer_interface'
import { connect } from 'react-redux'



class ApiService  {
    static instance = new ApiService()

    //apiRootPath = 'https://orange.jankaczorowski.pl/api'
    apiRootPath = 'http://127.0.0.1:4000/api'

    commonHeaders = {
        "Accept": "application/json"
    }


    apiRootPath() { return this.apiRootPath; }


    // getInstances() {
    //     return fetch(this.apiRootPath+"/instances",{ 
    //         headers: commonHeaders
    //     }).then(response => response.json())
    // }

    getInstances = () => this.getEndpoint("/instances")

    getClients = () => this.getEndpoint("/clients")

    getEndpoint(relativePath) {
        return fetch(this.apiRootPath + relativePath, { 
            headers: this.commonHeaders
        }).then(response => response.json())    
    }
}


export default ApiService.instance


//export default connect(mapStateToProps, mapDispatchToProps)(ApiService.instance)