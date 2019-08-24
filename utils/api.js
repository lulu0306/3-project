    import { AsyncStorage } from 'react-native';
    import {CARDS_STORAGE_KEY,formatCards} from './data'


    export function fetchCardsResults () {
        return AsyncStorage.getItem(CARDS_STORAGE_KEY)
            .then(formatCards)
    }


    export function submitDeck ( title ) {
        return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                title: title,
                questions: []
            },
        }))
    }
    
    export function submitCard ( title, cards ) {
        return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                ...cards,
            },
        }))
    }
    
    export function removeDeckAsyncStorage ( title ) {
    
        AsyncStorage.getItem(CARDS_STORAGE_KEY)
            .then((currentCards) => {
                let newCards = JSON.parse(currentCards);
                delete newCards[title];
                // console.log('newCards in Async:', newCards);
                return AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(newCards))
            })
    }

    export function testFetchCards () {
        return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    }

    export function clearAll(){
        return AsyncStorage.clear();
    }
    