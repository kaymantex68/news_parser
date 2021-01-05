const initialState = {
    posts: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
            };
        case 'REMOVE_POSTS':
            return {
                ...state,
            };
        default:
            return state;
    }
}