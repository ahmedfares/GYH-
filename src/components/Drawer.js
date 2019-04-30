import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, ImageBackground, AsyncStorage, Switch } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Icon, Item, Input, Left } from 'native-base';
import { LoginScreen, VoucherScreen, MainScreen,InboxScreen,LanguageScreen,
   Mo3tamereenScreen,ReportSearchScreen, TafweejScreen,GroupsScreen, AgentSearchScreen } from '../ScreenNames/ScreenNames';
import user from '../data/userLanguage';
import CircularProgress from './circularProgress';
import LocalizedStrings from 'react-native-localization';
import DrawerItem from './DrawerItem';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', showLoading: false,
     showLoginItems: false,lang:user.lang,switchValue:(user.lang=='ar') };
    this.strings = new LocalizedStrings(user.words);
    this.strings.setLanguage(user.lang);
    this.lang = user.lang;
  }

  render() {
    if (this.lang != user.lang)
    {
      this.lang = user.lang;
      this.strings = new LocalizedStrings(user.words);
      this.strings.setLanguage(user.lang);
    }
    return (
      <Container scrollEnabled={false}>
        <Header style={{ height: 100, padding: 0, backgroundColor: '#204677' }}>
            <ImageBackground
              source={require('../images/topDrawer.jpg')} resizeMode='cover' style={[styles2.backgroundImage]}>
                <View style={{alignItems:'center'}}>
                <View style={{width:270,height:60,marginBottom:10}}><Image  source={{uri: user.Image}} style={{width:'100%',height:'100%',marginTop:10}}/></View>
                <Text style={{ color: 'white',marginTop:5 }}>{(user.lang == 'ar')?user.ARName:user.ENName}</Text>
                </View>
            </ImageBackground> 

        </Header>
        <Content scrollEnabled={false}>
          <ImageBackground source={require('../images/bottomDrawer.jpg')}
            style={[styles2.backgroundImage,{height:500}]}>
            {/* <CircularProgress percent={20} /> */}
            <DrawerItem screenName="MainScreen" imgIndex="0" title={this.strings.mainPage} onPress={() => this.MainPage()}/>
            <DrawerItem screenName="Mo3tamereenScreen" imgIndex="1" title={this.strings.mo3tamerenPage} onPress={() => this.Mo3tamereenPage()}/>
            <DrawerItem screenName="GroupsScreen" imgIndex="2" title={this.strings.groupsPage} onPress={() => this.GroupsPage()}/>
            <DrawerItem screenName="AgentSearchScreen" imgIndex="3" title={this.strings.agentPage} onPress={() => {this.AgentPage()}}/>
            <DrawerItem screenName="TafweejScreen" imgIndex="4" title={this.strings.tafougPage} onPress={() => this.TafweejPage()}/>
            <DrawerItem screenName="ReportSearchScreen" imgIndex="5" title={this.strings.reportPage} onPress={() => {this.reportPage()}}/>
            <DrawerItem screenName="VoucherScreen" imgIndex="6" title={this.strings.vouchPage} onPress={() => {this.VouchPage()}}/>
            <DrawerItem screenName="InboxScreen" imgIndex="7" title={this.strings.inboxPage} onPress={() => {this.inboxPage()}}/>
             <DrawerItem screenName="LanguageScreen" imgIndex="8" title={this.strings.langPage} onPress={() => {this.LangPage()}}/> 
            <DrawerItem screenName="LogOut" imgIndex="9" title={this.strings.logoutPage} onPress={() => this.LogOut()}/>
          </ImageBackground>
        </Content>
      </Container>
    );
  };
  MainPage = () => {
    user.currentPage = "MainScreen";
    this.props.navigation.navigate(MainScreen, {newLang:user.lang});
  }
  toggleSwitch = (value) => {
    this.setState({switchValue: value});
   if (this.state.lang == 'ar')
   {
    this.setState({lang: 'en-US'});
    user.lang = 'en-US';
   }
   else
   {
    this.setState({lang: 'ar'});
    user.lang = 'ar';
   }
   this.strings.setLanguage(user.lang);
   this.props.navigation.navigate(user.currentPage, {newLang:user.lang});
 }
  AgentPage  = () => {
    user.currentPage = "AgentSearchScreen";
    this.props.navigation.navigate(AgentSearchScreen, {newLang:user.lang});
  }
  inboxPage  = () => {
    user.currentPage = "InboxScreen";
    this.props.navigation.navigate(InboxScreen, {newLang:user.lang});
  }
  
  reportPage  = () => {
    user.currentPage = "ReportSearchScreen";
    this.props.navigation.navigate(ReportSearchScreen, {newLang:user.lang});
  }
  Mo3tamereenPage = () => {
    user.currentPage = "Mo3tamereenScreen";
    this.props.navigation.navigate(Mo3tamereenScreen, {newLang:user.lang});
  }
  TafweejPage = () => {
    user.currentPage = "TafweejScreen";
    this.props.navigation.navigate(TafweejScreen, {newLang:user.lang});
  }
  VouchPage = () => {
    user.currentPage = "VoucherScreen";
    this.props.navigation.navigate(VoucherScreen, {newLang:user.lang});
  }
  GroupsPage = () => {
    user.currentPage = "GroupsScreen";
    this.props.navigation.navigate(GroupsScreen, {newLang:user.lang});
  }
  LangPage = () => {
    user.currentPage = "LanguageScreen";
    this.props.navigation.navigate(LanguageScreen, {newLang:user.lang});
  }
  LogOut() {
    Alert.alert(
      this.strings.logoutPage,
      this.strings.logoutAlert,
      [
        { text: this.strings.cancel, onPress: () => { }, style: "cancel" },
        {
          text: this.strings.logoutPage, onPress: () => {
            this.props.navigation.navigate(LoginScreen);
            try {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('email');
              AsyncStorage.removeItem('name');
              AsyncStorage.removeItem('mobile');
              AsyncStorage.removeItem('address');
              AsyncStorage.removeItem('uid');
            } catch (error) {
              // Error saving data
            }
          }
        },
      ],
    { cancelable: false },
  );
    
  }
}
const styles2 = StyleSheet.create({
  backgroundImage: {
    height: null,
    width: 280,
    flex:1
  },
  drawerItem: {
    padding: 10,
    color: '#7E7E7E',
    fontSize: 17,
    fontFamily: 'homa',
    marginRight: 50
  }
});