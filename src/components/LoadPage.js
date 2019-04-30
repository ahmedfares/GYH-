import React, {Component} from 'react';
import { Container, Header } from 'native-base';
import {StyleSheet, ImageBackground, AsyncStorage} from 'react-native';
import {LoginScreen,PrepareScreen,LangScreen} from '../ScreenNames/ScreenNames';
import user from '../data/userLanguage';
import LocalizedStrings from 'react-native-localization';

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    this.checkLoggedIn()
    this.strings = new LocalizedStrings(user.words);
    user.lang = this.strings.getInterfaceLanguage();
    if (user.lang.substring(0,2) == 'ar')
      user.lang = 'ar';
    else
      user.lang = 'en-US'
    //user.lang = 'ar';
}
checkLoggedIn = async ()=> {
  let language = await AsyncStorage.getItem('lang');
  let token2 = await AsyncStorage.getItem('token');
  let tokenImg = await AsyncStorage.getItem('tokenImg');
  let tokenEN = await AsyncStorage.getItem('tokenEN');
  let tokenAR = await AsyncStorage.getItem('tokenAR');
  let remember = await AsyncStorage.getItem('remember');
  if (language != null)
    user.lang = language;
  user.Image = tokenImg;
  user.ARName = tokenAR;
  user.ENName = tokenEN;
  //language = null;
  if (token2 && remember && remember === 'true' && language != null)
    {
      setTimeout(() => {
        this.props.navigation.navigate(PrepareScreen);
    }, 1000);
    }
    else if (language != null)
    {
      setTimeout(() => {
        this.props.navigation.navigate(LoginScreen);
    }, 1000);
    }
   else
    {
      setTimeout(() => {
        this.props.navigation.navigate(LangScreen);
    }, 1000);
    }
    
}
  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#1E4276" style={{ display: 'none' }} />

        <ImageBackground source={require('../images/LoadingG.jpg')} style={styles.backgroundImage} resizeMode='cover'>
        </ImageBackground>
      </Container>
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
