
import AuthService from '../services/auth-service'

const initialState = {
    globalTimer: 30,
    initialInstanceTypeFilter: null,
    initialInstanceNameFilter: '',
    isAuthenticated: false,
    jwtToken: null
}

const reducer = (state = initialState, action) => {
    const newState = {...state}

    switch(action.type) {
        case 'DECREMENT_GLOBAL_TIMER': {
            if(newState.globalTimer === 0) { newState.globalTimer = initialState.globalTimer }
            else {newState.globalTimer--}
            break;
        }
        case 'APPLY_INSTANCE_TYPE_FILTER': {
            newState.instanceTypeFilter = action.instanceTypeFilter;
            break;
        }
        case 'APPLY_INSTANCE_NAME_FILTER': {
            newState.instanceNameFilter = action.instanceNameFilter;
            break;
        }
        case 'TOGGLE_INSTANCE_MODAL': {
            newState.instanceModalResource = action.instance;
            if(action.modalVisibility === undefined) {
                newState.instanceModalShow = !state.instanceModalShow
            } else {
                newState.instanceModalShow = action.modalVisibility;
            }
            break;
        }
        case 'TOGGLE_CLIENT_MODAL': {
            newState.clientModalResource = action.client;
            if(action.modalVisibility === undefined) {
                newState.clientModalShow = !newState.clientModalShow
            } else {
                newState.clientModalShow = action.modalVisibility;
            }
            break;
        }
        case 'REFRESH_CLIENT_LIST': {
            newState.clients = action.data  
            break;
        }
            
        case 'REFRESH_INSTANCES_LIST': {
            newState.instances = action.data
            break;
        }

        case 'AUTHORIZE': {
            console.log('is Authenticated!')
            newState.isAuthenticated = true;
            break;
        }

        case 'SAVE_JWT_TOKEN': {
            newState.jwtToken = action.jwtToken
            break;
        }

        case 'LOGOUT': {
            newState.isAuthenticated = false;
            break;
        }

        default: {
            newState.globalTimer = initialState.globalTimer;
            newState.instanceNameFilter = initialState.initialInstanceNameFilter;
            newState.instanceTypeFilter = initialState.initialInstanceTypeFilter;

            newState.instanceModalResource = null
            newState.instanceModalShow = false
            newState.clientModalResource = null
            newState.clientModalShow = false
            newState.clients = []
            newState.instances = []
            newState.isAuthenticated = initialState.isAuthenticated;
            newState.jwtToken = initialState.jwtToken;
            break;
        }
    }
    localStorage.setItem('redux',JSON.stringify(newState))
    return newState
}

export default reducer