
const initialState = {
    globalTimer: 30
}

const reducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === 'DECREMENT_GLOBAL_TIMER') {
        if(newState.globalTimer === 0) { newState.globalTimer = initialState.globalTimer }
        else {newState.globalTimer--}
    }
    return newState
}

export default reducer