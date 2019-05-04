
import store from '../store/store'
import ApiService from './api-service'

const jwt = require('jsonwebtoken')

class AuthService  {
    static instance = new AuthService()

    constructor() {
        this.jwt_key_name = 'JWT_TOKEN'
    }

    responseGoogle(arg) {
        console.info('responseGoogle' + JSON.stringify(arg))
        console.log('API SERVICE', ApiService)
        ApiService.getConfig().then(
            ()=>{
                const config = store.getState().config
                fetch(
                    `https://spaceos-monitor.jankaczorowski.pl/oauth/google/callback?code=${arg.code}&scope=${config.google_api_scope}&client_id=${config.google_api_client_id}`
                ).then( (response ) => {
                    console.log('RES SOS_backend: ' + JSON.stringify(response))
                    return response.json()
                }).then((json) => {
                    this.saveToken(json.jwt)
                    this.checkAuthentication();
                }).catch(err => {
                    console.log("ERROR: "+JSON.stringify(err))
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
}

export default AuthService.instance