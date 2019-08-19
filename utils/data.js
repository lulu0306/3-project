import { AsyncStorage } from 'react-native';
import {timeTostring} from './helpers'

export const CARDS_STORAGE_KEY = 'UdaciCards:cards'


function setDefaultData(){
    let data ={

        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                },
                {
                    question: 'Question No.3?',
                    answer: 'Answer No.3'
                },
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))

    return data
}

export function formatCards(results) {
    return results === null
        ? setDefaultData()
        : JSON.parse(results)
}

