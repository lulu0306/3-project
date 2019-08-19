    import { AsyncStorage } from 'react-native';
    import {CARDS_STORAGE_KEY,formatCards} from './data'


    export function fetchCardsResults () {
        return AsyncStorage.getItem(CARDS_STORAGE_KEY)
            .then(formatCards)
    }