const initialState ={
    region : 'TAM1',
}

export default function Regions (state = initialState, action){
    switch (action.type) {
        case 'CHANGE_REGION':
            return {
                ...state,
                region: action.payload,
            };
        default:
            return state;
    }
}