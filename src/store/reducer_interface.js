const mapStateToProps = (state) => {
    return {
      globalTimer: state.globalTimer,
      instanceTypeFilter: state.instanceTypeFilter,
      instanceNameFilter: state.instanceNameFilter
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        decrementGlobalTimer: () => dispatch({type: 'DECREMENT_GLOBAL_TIMER'}),
        setInstanceNameFilter: (str) => dispatch({type: 'APPLY_INSTANCE_NAME_FILTER', instanceNameFilter: str }),
        setInstanceTypeFilter: (instType) => dispatch({type: 'APPLY_INSTANCE_TYPE_FILTER', instanceTypeFilter: instType }) 
    }
}


export {
    mapDispatchToProps, mapStateToProps
}