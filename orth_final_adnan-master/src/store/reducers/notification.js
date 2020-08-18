const initialState = {
    notification: true
};

export default reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'UPDATE_NOTIFICATION':
            return {
                ...state,
                notification: !state.notification
            }
        default:
            return state
    }
}