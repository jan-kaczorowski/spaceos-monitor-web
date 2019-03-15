
const commonHeaders = {
    "Accept": "application/json"
}

class ApiService  {
    static instance = new ApiService()

    //apiRootPath = 'https://orange.jankaczorowski.pl/api'
    apiRootPath = 'http://127.0.0.1:4000/api'


    apiRootPath() { return this.apiRootPath; }


    getInstances() {
        return fetch(this.apiRootPath+"/instances",{ 
            headers: commonHeaders
        }).then(response => response.json())
    }
}


export default ApiService.instance