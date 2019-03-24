import ApiService from '../services/api-service'

const mapStateToProps = (state) => {
    return {
      globalTimer: state.globalTimer,
      instanceTypeFilter: state.instanceTypeFilter,
      instanceNameFilter: state.instanceNameFilter,
      instanceModalShow: state.instanceModalShow,
      instanceModalResource: state.instanceModalResource,
      clientModalShow: state.clientModalShow,
      clientModalResource: state.clientModalResource,      
      clients: state.clients,
      instances: state.instances
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        decrementGlobalTimer: () => dispatch({type: 'DECREMENT_GLOBAL_TIMER'}),

        refreshClients: () => {
            ApiService.getClients().then((json_response) => {
                sessionStorage.setItem('CLIENTS1',JSON.stringify(json_response.data))
                dispatch({type: 'REFRESH_CLIENT_LIST', data: json_response.data})
            })
        },
        
        refreshInstances: () => {
            ApiService.getInstances().then((json_response) => {
                json_response.data.forEach(function(instance){
                    sessionStorage.setItem(instance.url,JSON.stringify(instance))
                })
                sessionStorage.setItem('INSTANCES1',JSON.stringify(json_response.data))
                dispatch({type: 'REFRESH_INSTANCES_LIST', data: json_response.data})
            })  
        },

        setInstanceNameFilter: (str) => dispatch({type: 'APPLY_INSTANCE_NAME_FILTER', instanceNameFilter: str }),
        setInstanceTypeFilter: (instType) => dispatch({type: 'APPLY_INSTANCE_TYPE_FILTER', instanceTypeFilter: instType }),

        toggleInstanceModal: (instance, modalVisibility) => dispatch({
            type: 'TOGGLE_INSTANCE_MODAL', 
            instance: instance,
            modalVisibility: modalVisibility
        }), 

        toggleClientModal: (client, modalVisibility) => dispatch({
            type: 'TOGGLE_CLIENT_MODAL', 
            client: client,
            modalVisibility: modalVisibility
        })
    }
}


export { mapDispatchToProps, mapStateToProps }