
const initialState = {
    globalTimer: 15
}

const reducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === 'DECREMENT_GLOBAL_TIMER') {
        console.log('Decrement!')
        if(newState.globalTimer === 0) { newState.globalTimer = 15 }
        else {newState.globalTimer--}
    }
    return newState
}

export default reducer