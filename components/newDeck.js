import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { white, blue, gray} from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../Actions';
import { submitDeck} from '../utils/api';
import FlashMessage, { showMessage } from "react-native-flash-message";


function AddDeckBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.addDeckBtn}
            onPress={onPress}
        >
            <Text style={styles.addDeckBtnText}>Add Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component{
    state= {
        text: ''
    }
    addNewDeck = () => {
        const { text } = this.state; 
        if (text === '') {
            showMessage({
                message: "This field is required",
                description: "Please input at leaset one character.",
                type: "warning",
                backgroundColor: skyBlue,
              });
            return; 
        }
         this.props.dispatch(addDeck(text))
        this.setState({ text: '' });
        submitDeck( text );
        this.props.navigation.navigate('Deck', { deckId: text} );

     }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
            <Text style={styles.itemText}>What is the title of your new deck?</Text>	           
                   <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='Deck Title'
                     />
                <AddDeckBtn onPress={this.addNewDeck}/>
                <FlashMessage position="top" />
             </KeyboardAvoidingView>
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
    itemText: {
        fontSize: 35,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: 15,
    },
    addDeckBtn: {
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
    addDeckBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        margin:20,
        padding:10,
    },
    input:{
        // height: 40, 
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 15,
    }
})

 function mapStateToProps (state, { navigation }) {
    return {
        state,
    }
}

 export default connect(mapStateToProps)(AddDeck)