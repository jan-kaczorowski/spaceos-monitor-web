
const jwt = require('jsonwebtoken')

class AuthService  {
    static instance = new AuthService()

    constructor() {
        this.jwt_key_name = 'JWT_TOKEN'
        this.config = null;
        
        // setInterval(()=>{
        //     console.log('tik tak')
        //     const curr_val =  JSON.parse(localStorage.getItem('AAA'))
        //     if(curr_val === true) {
        //         localStorage.setItem('AAA','false') 
        //     } else if (curr_val=== false) {
        //         localStorage.setItem('AAA','true')
        //     } else {
        //         localStorage.setItem('AAA','false')
        //     }
        //     console.log('Value n: ',curr_val)
        // },3000)
    }

    responseGoogle(arg) {
        let scope="email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        console.info('responseGoogle' + JSON.stringify(arg))
        this.getConfig().then(
            ()=>{
                fetch(
                    `https://spaceos-monitor.jankaczorowski.pl/oauth/google/callback?code=${arg.code}&scope=${scope}&client_id=${this.config.clientId}`
                ).then( (response ) => {
                    console.log('RES SOS_backend: ' + JSON.stringify(response))
                    return response.json()
                })
                    .then((json) => {
                    localStorage.setItem(this.jwt_key_name,json.jwt)
                })
            }
        )
    }

    isLoggedIn() {
        let res = (typeof this.decodedToken()) && this.isTokenValid()
        //res = JSON.parse(localStorage.getItem('AAA'))
        console.log('isLoggedIn',res)
        return res
    }

    logout() {
        localStorage.removeItem(this.jwt_key_name)
        return false;
    }

    getToken() {
        const jwt_token = localStorage.getItem(this.jwt_key_name)
        if(typeof jwt_token === 'string') {
            return jwt_token;
        }
        else return null;
    }

    isTokenValid() {
        if(this.decodedToken()) {
            const expDate = new Date(this.decodedToken().exp * 1000)
            if(expDate > (new Date())) {
                return true;
            } else {
                this.destroyToken()
                return false;
            }

        } else {
            this.destroyToken()
            return false
        }
    }

    decodedToken() {
        const token_to_decode = this.getToken()
        if(token_to_decode) {
            const decoded_token =  jwt.decode(this.getToken());
            localStorage.setItem('DECODED_JWT_TOKEN',JSON.stringify(decoded_token))
            return decoded_token;
        } else return null;
    }

    getConfig() {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const config_data = {
                    clientId: '809444742970-it8fsvjt7genve9u9qh1iclcmf6vuanc.apps.googleusercontent.com',
                    scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
                };
                this.config = config_data
                resolve(config_data)
            },100)
        })
    }

    destroyToken() {
        localStorage.removeItem(this.jwt_key_name)
        localStorage.removeItem('DECODED_JWT_TOKEN')
    }

}

export default AuthService.instance