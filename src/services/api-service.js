import AuthService from './auth-service'
import store from '../store/store'
class ApiService  {
    static instance = new ApiService()

    //apiRootPath = 'https://orange.jankaczorowski.pl/api'
    //apiRootPath = 'http://127.0.0.1:4000/api'
    //apiRootPath = 'https://spaceos-monitor.jankaczorowski.pl/api' //<-- config

    commonHeaders() {
        return {
            "Accept": "application/json",
            "Authorization": `Bearer ${AuthService.getToken()}`
        }
    } 
    postHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AuthService.getToken()}`
        }
    } 

    getConfig() {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const config_data = {
                    root_path: 'https://spaceos-monitor.jankaczorowski.pl',
                    api_root_path: 'https://spaceos-monitor.jankaczorowski.pl/api',
                    google_api_redirect_uri: 'https://spaceos-monitor.jankaczorowski.pl/oauth/google/callback',
                    google_api_client_id: '809444742970-it8fsvjt7genve9u9qh1iclcmf6vuanc.apps.googleusercontent.com',
                    google_api_scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
                };
                store.dispatch({type: 'SAVE_CONFIG', config_data: config_data}) 
                resolve(config_data)
            }, 100)
        })
    }

    apiRootPath() { return store.getState().config.api_root_path; }

    getInstances = () => this.getEndpoint("/instances")

    getClients = () => this.getEndpoint("/clients")

    precheckAuth() {
        if(!AuthService.checkAuthentication()) return;
    }

    getEndpoint(relativePath) {
        if(!AuthService.checkAuthentication()) return;
        return fetch(this.apiRootPath() + relativePath, { 
            headers: this.commonHeaders()
        }).then(response => {
            if(response.status === 200) {
                return response.json()
            } else {
                console.error('err while calling'+relativePath,response.status)
                return { data: [] }
            }
        })  
    }

    updateClient(id,changeset) {
        if(!AuthService.checkAuthentication()) return;
        return fetch(this.apiRootPath() + "/clients/"+id, {
            headers: this.postHeaders(),
            method: 'PUT',
            body: JSON.stringify({client: changeset})
        })
    }

    createClient(changeset) {
        if(!AuthService.checkAuthentication()) return;
        return fetch(this.apiRootPath() + "/clients", {
            headers: this.postHeaders(),
            method: 'POST',
            body: JSON.stringify({client: changeset})
        })
    }

    updateInstance(id,changeset) {
        if(!AuthService.checkAuthentication()) return;
        return fetch(this.apiRootPath() + "/instances/"+id, {
            headers: this.postHeaders(),
            method: 'PUT',
            body: JSON.stringify({instance: changeset})
        })
    }

    createInstance(changeset) {
        if(!AuthService.checkAuthentication()) return;
        return fetch(this.apiRootPath() + "/instances", {
            headers: this.postHeaders(),
            method: 'POST',
            body: JSON.stringify({instance: changeset})
        })
    }

}

export default ApiService.instance