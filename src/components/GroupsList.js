import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar
} from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { Mo3tamerDetailsScreen,GroupSearchScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import GroupList from './GroupList'

export default class GroupsListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'قائمة المجموعات':'Groups List',
            headerRight: <View style={{flex:1,flexDirection:'row'}}>
              {/* <TouchableOpacity
              onPress={() => state.params.handleSearch()}
              style={{ marginRight:10 ,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

            ><Icon ios='ios-search' android="md-search" style={{ fontSize: 25, color: 'white' }} />
            </TouchableOpacity> */}
            </View>,
        }
      }

      searchContents() {
        this.props.navigation.navigate(GroupSearchScreen);
      }

    state = { deals: [],totalCnt:0,pageLength:20,MutamerCnt:20 };
    async componentDidMount() {
        const deals = await ajax.fetchSearchedGroups(user.selectedGroup,this.state.Page,(user.lang == 'ar'),user.selectedGroupName,
        user.selectedGroupCountryId,user.selectedGroupAgentId);
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        user.totalGroupsCount = deals.TotalCount;
        user.selectedGroupName = null;
        user.selectedGroupCountryId = null;
        user.selectedGroupAgentId = null;
        user.lastPageGroup = deals.lastPage;
        this.setState({totalCnt: deals.TotalCount});
        for (var i=0;i<deals.Groups.length;i++)
        {
          deals.Groups[i].key = deals.Groups[i].Id+"";
        }
        this.setState({ deals });
    }
    updateCnt = () => {
        this.setState({MutamerCnt:this.state.MutamerCnt+20});
    }
    setCurrentDeal = (dealId) => {
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
      };
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals.Groups && this.state.deals.Groups.length > 0) ?
                    (<GroupList deals={this.state.deals.Groups} onMore={this.updateCnt} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Groups} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                  {(this.state.deals.Groups && this.state.deals.Groups.length > 0) && <Footer>
                    <FooterTab style={{backgroundColor:'#204677',justifyContent:'center',paddingTop:15}}>
                            <Text style={{color:'#fff',fontSize:16}}>{this.strings.totalCnt}</Text>
                            <Text style={{color:'#fff',fontSize:16}}> | </Text>
                            <Text style={{color:'#fff',fontSize:16}}>{this.state.MutamerCnt} of {this.state.totalCnt}</Text>
                    </FooterTab>
                </Footer>}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 40,
        color: 'white'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        width: null,
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    header: {
        fontSize: 40,
        color: 'black'
    }
});