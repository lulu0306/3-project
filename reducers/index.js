import { RECEIVE_CARDS, ADD_CARD, ADD_DECK } from '../Actions/index'

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
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card),
                },
            }

         default:
            return state;
    }
}

 export default cards