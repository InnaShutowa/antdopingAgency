let initialState = {
    user: {
        is_admin: false,
        apikey: "",
        user_id: 1
    },
    isOpenModal: false
};

function UserReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "SET_DATA": {
        handler(state, action) {
            console.log(action);
            state = {
                ...state,
                user_id: action.data.user_id,
                is_admin: action.data.is_admin,
                apikey: action.data.apikey
            };
            return { ...state };
        }
    }
};

export default UserReducer;