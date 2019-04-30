import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler,StatusBar
} from 'react-native';
import { Container, Header, Content, Item, Row } from 'native-base';
import { Mo3tamereenListScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import user from '../data/userLanguage';

export default class GroupsScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = {};
    }
    
    componentDidMount() {
    }
    
    render() {
        
        return (
            <Container>
        <Header androidStatusBarColor="#183B65" style={{ display: 'none' }} />

        <ImageBackground source={require('../images/LoadingG.jpg')} style={styles.backgroundImage} resizeMode='cover'>
        <TouchableOpacity  onPress={() => {
                                this.ViewAll();
                            }} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{this.strings.mo3tamerList}</Text>
                            </TouchableOpacity>
        </ImageBackground>
      </Container>
        );
    };
    ViewAll = () => {
        this.props.navigation.navigate(Mo3tamereenListScreen);
    }
}

const styles = StyleSheet.create({
    mainText:{
        fontSize:40,
        color:'white'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems:'center',
        width: null,
        justifyContent: 'flex-start',
        padding:0,
        margin:0,
        backgroundColor:'green'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems:'center',
        margin: 40,
        padding: 10,
        borderWidth: 0,
        borderColor: '#fff',
        borderRadius: 20,
        backgroundColor: '#1E4276',
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'homa'
    }
});