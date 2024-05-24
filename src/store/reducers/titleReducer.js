const initialState = {
    exampleData: 'Initial Data',
    headerTitle: 'Initial Title',
};

const exampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXAMPLE_ACTION':
            return {
                ...state,
                exampleData: action.payload,
            };
        case 'UPDATE_HEADER_TITLE':
            return {
                ...state,
                headerTitle: action.payload,
            };
        default:
            return state;
    }
};

export default exampleReducer;
