const initialState = {
    user: null,
};

const user = (state = initialState, action) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user,
        }
    }

    if (action.type === 'DELETE_USER') {
        return {
            ...state,
            user: null,
        }
    }

    return state
};

export default user;