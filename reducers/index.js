import { RECEIVE_CARDS, ADD_CARD, ADD_DECK,REMOVE_DECK } from '../Actions/index'

function cards (state= {}, action) {
    switch (action.type) {
        case RECEIVE_CARDS:
            return {
                ...state,
                ...action.cards
            }
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: [],
                },
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: action.newCards,
            }
        case REMOVE_DECK:
            const key = action.title; 
            let newState = state;
            delete newState[key]
            // console.log('newState in Reducer:', newState);
            return {
                ...newState,
            }
        default:
            return state;
    }
}

export default cards;