import AuthService from './auth-service'
import store from '../store/store'
class ApiService  {

    static instance = new ApiService()

    //apiRootPath = 'https://orange.jankaczorowski.pl/api'
    //apiRootPath = 'http://127.0.0.1:4000/api'
    apiRootPath = 'https://spaceos-monitor.jankaczorowski.pl/api' //<-- config

    commonHeaders = {
        "Accept": "application/json",
        "Authorization": `Bearer ${AuthService.getToken()}`
    }
    postHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AuthService.getToken()}`
    }

    apiRootPath() { return this.apiRootPath; }

    getInstances = () => this.getEndpoint("/instances")

    getClients = () => this.getEndpoint("/clients")

    getEndpoint(relativePath) {
        return fetch(this.apiRootPath + relativePath, { 
            headers: this.commonHeaders
        }).then(response => {
            console.log('asad',response)
            if(response.status === 200) {
                console.log("STORE",store.getState()) //not needed
                console.log("STORE obj",store) //not needed
                console.log(response)
                return response.json()
            } else {
                console.error('err while calling'+relativePath,response.status)
                return { data: [] }
            }
        })  
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

    updateInstance(id,changeset) {
        return fetch(this.apiRootPath + "/instances/"+id, {
            headers: this.postHeaders,
            method: 'PUT',
            body: JSON.stringify({instance: changeset})
        })
    }

    createInstance(changeset) {
        return fetch(this.apiRootPath + "/instances", {
            headers: this.postHeaders,
            method: 'POST',
            body: JSON.stringify({instance: changeset})
        })
    }

}


export default ApiService.instance