import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Image,Switch
} from 'react-native';
import { Container, Header } from 'native-base';
import { LoginScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import user from '../data/userLanguage';
import RNRestart from 'react-native-restart';

export default class Language extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = {
             username: '', email: '', password: '', showLoading: false,
              showLoginItems: false,switchValue:true,hidePassword: true,
              lang: user.lang};
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
          title: (user.lang == 'ar')?'تغيير اللغة':'Change Language',
        }
      }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#1E4276" style={{ display: 'none' }} />
                   <ImageBackground source={require('../images/LoginG.jpg')} style={styles.backgroundImage} resizeMode='contain'>
                   <View style={{flex:1,flexDirection:'row',marginTop:200}}>
                                <TouchableOpacity onPress={async()=>{
        (this.state.lang == 'ar')? this.setState({lang: 'en-US'}): this.setState({lang: 'ar'});
        //RNRestart.Restart();
                                }} style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                                <Image
                            source={require('../images/inbox-11.png')} style={{ height: 55, width: 55 }} />
                                </TouchableOpacity>
                                <View style={{flex:0.6,alignItems:'center',justifyContent:'center'}}>
                                {(this.state.lang == 'ar') && <Image
                            source={require('../images/AR.png')} style={{ height: 192, width: 192 }} />}
                            {(this.state.lang == 'en-US') && <Image
                            source={require('../images/EN.png')} style={{ height: 192, width: 192 }} />}
                                </View>
                                <TouchableOpacity onPress={()=>{
        (this.state.lang == 'ar')? this.setState({lang: 'en-US'}): this.setState({lang: 'ar'});
        //RNRestart.Restart();
                                }}
                                 style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                                <Image
                            source={require('../images/inbox-07.png')} style={{ height: 55, width: 55 }} />
                                </TouchableOpacity>
                            </View>
                        <View style={styles.content} >
                            <View style={styles.inputContainer}>
                           
                        <TouchableOpacity onPress={() => {
                                this.saveLang();
                            }} style={styles.buttonContainer}>
                            
                            {(this.state.lang != 'ar') && <Text style={styles.buttonText}>Save</Text>}
                                {(this.state.lang == 'ar') && <Text style={styles.buttonText}>حفظ</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ImageBackground>
            </Container>
        );
    };
    changeLang () {
    }
    saveLang = async() => {
        try {
            await AsyncStorage.setItem('lang', this.state.lang);
            user.lang = this.state.lang;
            this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        //this.props.navigation.navigate(LoginScreen);
        } catch (error) {
            // Error saving data
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex:1, height: undefined, width: undefined
    },
    content: {
        alignItems: 'center',
        flex:1,
        flexDirection:'column',
        padding:0
    },
    inputContainer: {
        marginBottom: 0,
        padding: 0,
        paddingBottom: 0,
        alignSelf: 'stretch',
        borderWidth: 0,
        borderColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    input: {
        fontSize: 14,
        padding: 0,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 0,
        borderBottomWidth:1,
        borderBottomColor:'#C5C5C5',
        fontFamily: 'homa',
        color: '#1E4276'
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
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'homa'
    }
});