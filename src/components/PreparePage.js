import React, {Component} from 'react';
import { Container, Header } from 'native-base';
import {StyleSheet, ImageBackground, View,StatusBar,ActivityIndicator,DeviceEventEmitter,Text} from 'react-native';
import {LoginScreen,MainScreen} from '../ScreenNames/ScreenNames';
import user from '../data/userLanguage';
import LocalizedStrings from 'react-native-localization';

export default class App2 extends Component<Props> {
  
  constructor(props) {
    super(props);
    user.currentPage = "MainScreen";
    this.props.navigation.navigate(MainScreen);
}
  render() {
    return (
      <ImageBackground source={require('../images/LoginG.jpg')} style={styles.backgroundImage} resizeMode='contain'>
         <ActivityIndicator animating={true} style={{ marginTop: 400 }} color="#1E4276" size="large" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#000'
  },
  backgroundImage: {
    flex:1,
    height: undefined,
    width: undefined,
}
});
