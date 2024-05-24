import { createStore, combineReducers } from 'redux';

// Пример простого редьюсера
const exampleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EXAMPLE_ACTION':
            return {
                ...state,
                exampleData: action.payload,
            };
        default:
            return state;
    }
};

// Комбинируем редьюсеры
const rootReducer = combineReducers({
    example: exampleReducer,
});

// Создаем store
const store = createStore(rootReducer);

export default store;
