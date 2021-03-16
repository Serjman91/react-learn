const initialState = {
    user: null,
    isAdmin: false,
};

const user = (state = initialState, action) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user,
        }
    }

    if (action.type === 'SET_IS_ADMIN') {
        return {
            ...state,
            user: state.user,
            isAdmin: action.isAdmin,
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