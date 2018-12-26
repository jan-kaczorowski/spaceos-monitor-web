
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
        default: {
            newState.globalTimer = initialState.globalTimer;
            newState.instanceNameFilter = initialState.initialInstanceNameFilter;
            newState.instanceTypeFilter = initialState.initialInstanceTypeFilter;
            break;
        }
    }
    return newState
}

export default reducer