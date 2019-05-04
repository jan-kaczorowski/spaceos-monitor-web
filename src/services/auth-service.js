
import store from '../store/store'

const jwt = require('jsonwebtoken')

class AuthService  {
    static instance = new AuthService()

    constructor() {

        this.jwt_key_name = 'JWT_TOKEN'
        this.config = null;
      
        // console.log('Kwik 1')
        // setTimeout(()=> {
        //     store.dispatch({type: 'AUTHORIZE'}) 
        //     console.log('Kwik 2')
        // }, 4000)
       
        
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
                }).then((json) => {
                    this.saveToken(json.jwt)
                    this.checkAuthentication();
                }).catch(err => {
                    console.log("ERROR: "+err)
                })
            }
        )
    }


    checkAuthentication() {
        if(this.isLoggedIn()){
            store.dispatch({type: 'AUTHORIZE'}) 
            return true;
        } else this.logout()
    }

    saveToken(jwt_token) {
        store.dispatch({type: 'SAVE_JWT_TOKEN', jwtToken: jwt_token}) 
        localStorage.setItem(this.jwt_key_name,jwt_token)
    }

    isLoggedIn() {
        const decoded_token = this.decodedToken();
        let res = (typeof decoded_token === 'object') && this.isTokenValid(decoded_token)
        console.log('isLoggedIn',res)
        return res
    }

    logout() {
        console.log('Logging out')
        localStorage.removeItem(this.jwt_key_name)
        localStorage.removeItem('DECODED_JWT_TOKEN')
        store.dispatch({type: 'LOGOUT'})
        return false;
    }

    getToken() {
        //take token from redux store
        let jwt_token = store.getState().jwtToken
        // ..or take it from LocalStorage (fallback)
        if (jwt_token === null) {
            jwt_token = localStorage.getItem(this.jwt_key_name)
        }
        
        if(typeof jwt_token === 'string') {
            return jwt_token;
        }
        else return null;
    }

    isTokenValid(decoded_token) {
        if(decoded_token) {
            const expDate = new Date(decoded_token.exp * 1000)
            if(expDate > (new Date())) {
                return true;
            } else {
                return false;
            }
        } else {
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

    // destroyToken() {
    //     localStorage.removeItem(this.jwt_key_name)
    //     localStorage.removeItem('DECODED_JWT_TOKEN')
    // }

}

export default AuthService.instance