import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Icon, Item, Input, Left } from 'native-base';
import { LoginScreen, LoadingScreen, MainScreen, Mo3tamereenScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import user from '../data/userLanguage';
import LocalizedStrings from 'react-native-localization';

export default class DrawerItem extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', showLoading: false, showLoginItems: false };
    this.strings = new LocalizedStrings(user.words);
    this.strings.setLanguage(user.lang);
    this.imageUrls = [require('../images/first.png'), require('../images/2-1.png'), require('../images/3-1.png'),
                      require('../images/4-1.png'), require('../images/5-1.png'), require('../images/6-1.png'),
                      require('../images/7-1.png'), require('../images/8-1.png'), require('../images/10-1.png'),
                      require('../images/11-1.png')];
    this.imageSelectedUrls = [require('../images/1.png'), require('../images/2.png'), require('../images/3.png'),
                              require('../images/4.png'), require('../images/5.png'), require('../images/6.png'),
                              require('../images/7.png'), require('../images/8.png'), require('../images/10.png'),
                              require('../images/11.png')];
  }

  handlePress = () => {
    this.props.onPress();
  };
  render() {
    return (
      <View><TouchableOpacity
              style={styles2.menuItemEN}
              onPress={this.handlePress}
            >
          <View style={[styles2.itemContainerEN, (user.currentPage == this.props.screenName) ? { backgroundColor: '#274372' } : { backgroundColor: 'transparent' }]}>
            {(user.currentPage == this.props.screenName) && (this.props.imgIndex > 0 && this.props.imgIndex < 7) && <Image source={this.imageUrls[this.props.imgIndex]} style={{ width: 30, height: 30, marginTop: -5,marginLeft:45 }} />}
            {(user.currentPage != this.props.screenName) && (this.props.imgIndex > 0 && this.props.imgIndex < 7) && <Image source={this.imageSelectedUrls[this.props.imgIndex]} style={{ width: 30, height: 30, marginTop: -5,marginLeft:45 }} />}
            {(user.currentPage == this.props.screenName) && (0 == this.props.imgIndex || this.props.imgIndex >= 7) && <Image source={this.imageUrls[this.props.imgIndex]} style={{ width: 20, height: 20, padding: 5,marginLeft:50 }} />}
            {(user.currentPage != this.props.screenName) && (0 == this.props.imgIndex || this.props.imgIndex >= 7) && <Image source={this.imageSelectedUrls[this.props.imgIndex]} style={{ width: 20, height: 20, padding: 5,marginLeft:50 }} />}
          
          </View>
              <Text style={styles2.menuItemTextEN}>{this.props.title}</Text>
              {(this.props.screenName == 'InboxScreen') && (user.unreadMsg > 0) &&
                        <Text style={{ fontSize: 12,backgroundColor:'#AB2A28',color:'#fff',width:20,height:20,textAlignVertical:'center',textAlign:'center',borderRadius:10,marginLeft:90,marginTop:5 }}>{user.unreadMsg}</Text>              
              }
            </TouchableOpacity>
      </View>
      
    );
  };
  }
const styles2 = StyleSheet.create({
  itemContainer: {
    width: 85,
    paddingLeft: 10,
    padding:5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemContainerEN: {
    width: 85,
    padding:5,
    paddingRight: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 20
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 0,
    marginTop: 10
  },
  menuItemEN: {
    flexDirection: 'row',
    marginTop: 10
  },
  rightInput: {
    alignItems: 'flex-end',
  },
  menuItemTextEN: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
    paddingTop:4,
    color: '#7D7D7D'
  },
  dimmedItemTextEN: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
    marginRight: 20,
    color: '#274372'
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
    marginRight: 20,
    color: '#7D7D7D'
  },
  dimmedItemText: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
    marginRight: 20,
    color: '#274372'
  }
});