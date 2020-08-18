const initialState = {
    activeRoute: 'prayersStack'
};

export default reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'UPDATE_ROUTE':
            return {
                ...state,
                activeRoute: action.route
            }
        default:
            return state
    }
}