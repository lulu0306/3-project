import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Button from './Button'
import {white,blue,gray} from '../utils/colors'


function CorrectBtn({onPress}){
    return(
    <TouchableOpacity
    style={StyleSheet.correctBtn}
    onPress={onPress}
    >
       <Text style={style={correctBtnText}}>Correct!</Text> 
    </TouchableOpacity>
    )
}

function IncorrectBtn({onPress}){
    return(
        <TouchableOpacity
        style={StyleSheet.incorrectBtn}
        onPress={onPress}
        >
            <Text style={StyleSheet.incorrectBtnText}>Incorrect</Text>
        </TouchableOpacity>
    )
}

class Card extends React.Component{
    state={
        showAnswer: false
    }

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;
        return{
            title: `Quiz for ${deckId}`,
        }
    }
    switchQuestionAnswer = () => {
        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }));
    }
    nextQuestion = ( correct ) => {
        const { deckId, pos, num } = this.props;
        (pos === num)
            ? this.props.navigation.navigate(
                'Result',
                { deckId: deckId, correct: correct })
            : this.props.navigation.navigate(
                'Card',
                { deckId: deckId, index: pos, correct: correct})    
    }
    correctAnswer = () => {
        const newCorrect = this.props.correct + 1;
        this.nextQuestion(newCorrect)
    }
    incorrectAnswer = () => {
        this.nextQuestion(this.props.correct)
    }
    render(){
        const {deckId, pos, num, quiz, } = this.props;
        return(
            <View style={styles.container}>
                  <Text style={styles.progressText}>{`${pos} of ${num}`}</Text>
                  <Text style={styles.questionText}>
                  {(this.state.showAnswer)
                        ? quiz.answer
                        : quiz.question}
                </Text>
                <Button onPress={this.switchQuestionAnswer} style={{margin: 20}}>
                    {(this.state.showAnswer)
                        ? 'Question'
                        : 'Answer'}
                </Button>
                <CorrectBtn onPress={this.correctAnswer} />
                <IncorrectBtn onPress={this.incorrectAnswer}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 15,
        color:gray,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    questionText: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    correctBtn: {
        backgroundColor: blue,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    incorrectBtn: {
        backgroundColor: white,
        borderColor: blue,
        borderWidth: 0.5,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    incorrectBtnText: {
        color: blue,
        fontSize: 22,
        textAlign: 'center',
    },
})

function mapStateToProps (state, { navigation }) {
    const { deckId, index, correct } = navigation.state.params;
    const pos = index + 1;
    const num = state[deckId].questions.length;

     return {
        deckId,
        pos,
        num,
        correct,
        quiz: state[deckId].questions[index],
    }
}


export default connect(mapStateToProps)(Card);