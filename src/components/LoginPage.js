import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Image,Switch
} from 'react-native';
import { Container, Header } from 'native-base';
import { PrepareScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import user from '../data/userLanguage';

export default class Login extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        AsyncStorage.setItem('remember','true');
        this.state = { username: '', email: '', password: '', showLoading: false, showLoginItems: false,switchValue:true,hidePassword: true };
    }
    toggleSwitch = (value) => {
        this.setState({switchValue: value});
        AsyncStorage.setItem('remember',value+'');
     }
     managePasswordVisibility = () =>
     {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    getData = () => {
        this.setState({ showLoginItems: true })
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#1E4276" style={{ display: 'none' }} />
                    {!this.state.showLoading &&  <ImageBackground source={require('../images/LoginG.jpg')} style={styles.backgroundImage} resizeMode='contain'>
                        <View style={styles.content} >
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{this.strings.user}</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={[styles.input,(user.lang == "ar")?styles.rightInput:styles.leftInput]}
                                    textContentType="emailAddress"
                                    clearTextOnFocus={true}
                                    onChangeText={(username) => {this.setState({ username })}}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                >
                                </TextInput>
                            <Text style={styles.label}>{this.strings.passwordLang}</Text>
                            <View style={styles.textBoxBtnHolder}>
                                <TextInput underlineColorAndroid="transparent" secureTextEntry={this.state.hidePassword}
                                style={[styles.input,(user.lang == "ar")?styles.rightInput:styles.leftInput]}
                                onChangeText={(password) => this.setState({ password })}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    this.setState({ showLoading: true });
                                    this.Login(this.state.password, this.state.username);
                                }}
                                ref={(input) => { this.secondTextInput = input; }} />
                                    <TouchableOpacity activeOpacity={0.8} style={[styles.visibilityBtn,(user.lang == user.defaultLang)?{right:3}:{left:3}]} onPress={this.managePasswordVisibility}>
                                    <Image source={(this.state.hidePassword) ? require('../images/hide.png') : require('../images/view.png')} style={styles.btnImage} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                    <View><Text style={{ color: '#1E4276', fontSize: 12,marginLeft:45,marginTop:5 }}>{this.strings.rememberMe}</Text></View>
                                </View>
                                <Switch
                                style={{ textAlign: 'left', width: 40,marginTop:0,paddingTop:0 }}
                                onValueChange={this.toggleSwitch}
                                trackColor={{ false: '#C5C5C5', true: '#1E4276' }}
                                thumbColor = '#C5C5C5'
                                disabled={false}
                                value={this.state.switchValue} />
                            </View>
                            <TouchableOpacity disabled={this.state.showLoading} onPress={() => {
                                Keyboard.dismiss();
                                this.Login(this.state.password, this.state.username);
                            }} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{this.strings.login}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        <Toast
                            ref="toast"
                            style={{ backgroundColor: '#1E4276' }}
                            position='bottom'
                            positionValue={100}
                            fadeInDuration={500}
                            fadeOutDuration={500}
                            opacity={0.8}
                        />
                    </ImageBackground>}
                    {this.state.showLoading &&
                        <ImageBackground source={require('../images/LoginG.jpg')} style={styles.backgroundImage}  resizeMode='contain'>
                            <ActivityIndicator animating={this.state.showLoading} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                        </ImageBackground>
                    }
                {!this.state.showLoginItems && <ImageBackground source={require('../images/LoginG.jpg')} style={styles.backgroundImage}  resizeMode='contain'>
                    <ActivityIndicator animating={this.state.showLoading} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                </ImageBackground>}
            </Container>
        );
    };
    Login = (pass, email) => {
        
        email = email.toLowerCase().replace(/\s/g, '');
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email)))
        {
            this.setState({ showLoading: true });
        fetch('https://eumra.com/gyh/token', {
            method: 'POST',
            body:"grant_type=password&UserName="+email+"&password="+pass,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => response.json())
            .then((res) => {
                this.setState({ showLoading: false });
                if(res.userName != null)
                    {
                        user.currentPage = "MainScreen";
                        this.props.navigation.navigate(PrepareScreen);
                        this.saveToken(res);                     
                    }
                    else
                    this.refs.toast.show( this.strings.wrongCred, DURATION.LENGTH_LONG);

            })
        }
        else
        {
            this.refs.toast.show( this.strings.wrongEmail, DURATION.LENGTH_LONG);
        } 
        
    }
    saveToken = async(res) => {
        try {
            await AsyncStorage.setItem('token', res.access_token);
            await AsyncStorage.setItem('tokenImg', res.Image);
            user.Image = res.Image;
            await AsyncStorage.setItem('tokenAR', res.DisplayArabicName);
            user.ARName = res.DisplayArabicName;
            await AsyncStorage.setItem('tokenEN', res.DisplayEnglishName);
            user.ENName = res.DisplayEnglishName;
            user.Details = res;
            await AsyncStorage.setItem('userType', res.Type + '');
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
        justifyContent:'space-around'
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        marginTop: 250,
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
    label:{
        fontSize: 12,
        marginTop:5
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
    leftInput:{
        textAlign: 'left',
    },
    rightInput:{
        textAlign: 'right',
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
    },
    textBoxBtnHolder:
  {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
 
  textBox:
  {
    fontSize: 18,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5
  },
  visibilityBtn:
  {
    position: 'absolute',
    height: 35,
    width: 30,
    padding: 5
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});