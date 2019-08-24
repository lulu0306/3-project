import React from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { white, purple, blue, gray } from '../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';


function HomeBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.homeBtn}
            onPress={onPress}
        >
            <MaterialIcons name='keyboard-return' size={24} color={blue} />
            <Text style={styles.goToDeckBtnText}> Go To Deck</Text>
        </TouchableOpacity>
    )
}

function RetryBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.retryBtn}
            onPress={onPress}
        >
            <MaterialIcons name='autorenew' size={24} color={blue} />
            <Text style={styles.retryBtnText}> Retry Quiz</Text>
        </TouchableOpacity>
    )
}
class Answers extends React.Component{
    state = {
        bounceValue: new Animated.Value(1),
    }
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params;
        return {
            title: `Your Result for ${deckId}`,
        }
    }

    componentDidMount() {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue:1.04 }),
            Animated.spring(bounceValue, {toValue: 1, friction: 4})
        ]).start();
        clearLocalNotification()
        .then(setLocalNotification);

    }
    render(){
        const { bounceValue } = this.state;
        const { deckId, correct, deckCards } = this.props;
        const percentage = ((correct / deckCards.questions.length) * 100 ).toFixed(1);
        return(
            <View  style={styles.container}>
                <Text style={styles.resultText}>You have answered</Text>
                <Animated.Text style={[
                    styles.percentText,
                    {transform: [{scale: bounceValue}]}]}>
                    {`${percentage} %`}
                </Animated.Text>
                <Text style={styles.resultText}>correctly.</Text>
                <HomeBtn onPress={() => {this.props.navigation.navigate('Deck', { deckId: deckId })}} />
                <RetryBtn onPress={() => {this.props.navigation.navigate(
                    'Card',
                    { deckId: deckId, index: 0, correct: 0} 
                )}} />
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
    percentText: {
        fontSize: 70,
        fontStyle: 'italic',
        color:purple,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    resultText: {
        fontSize: 15,
        color:gray,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    homeBtn: {
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    goToDeckBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
        // margin:10,
        // padding:10,
    },
    retryBtn: {
        flexDirection: 'row',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    retryBtnText: {
        color: blue,
        fontSize: 20,
        textAlign: 'center',
        // margin:10,
        // padding:10,
    },
})

 function mapStateToProps (state, { navigation }) {
    const { deckId, correct } = navigation.state.params;
    return {
        deckId,
        deckCards: state[deckId],
        correct
    }
}

 export default connect(mapStateToProps)(Answers); 