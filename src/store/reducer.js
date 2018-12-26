
const initialState = {
    globalTimer: 30,
    initialInstanceTypeFilter: 'feature',
    initialInstanceNameFilter: ''
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
        default: {
            newState.globalTimer = initialState.globalTimer;
            newState.instanceNameFilter = initialState.initialInstanceNameFilter;
            newState.instanceTypeFilter = initialState.initialInstanceTypeFilter;
            newState.instanceModalResource = null
            newState.instanceModalShow = false
            break;
        }
    }
    localStorage.setItem('redux',JSON.stringify(newState))
    return newState
}

export default reducer