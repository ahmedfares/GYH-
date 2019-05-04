import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar
} from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { Mo3tamerDetailsScreen,Mo3tamerSearchScreen } from '../ScreenNames/ScreenNames';
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
import DealList from './DealList'

export default class Mo3tamereenListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        user.MutamerCnt = 20;
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'قائمة المعتمرين':'Mutamers List',
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
        this.props.navigation.navigate(Mo3tamerSearchScreen);
      }

    state = { deals: [],totalCnt:52348,pageLength:20,MutamerCnt:20 };
    async componentDidMount() {
        //alert(user.selectedMutamer);
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        const deals = await ajax.fetchSearchedMutamers(user.selectedMutamer, 1,(user.lang == 'ar'), user.selectedMutamerName,
        user.selectedMutamerCountryId, user.selectedMutamerAgentId);
        user.lastPageMutamer = deals.lastPage;
        user.totalGroupsCount = deals.TotalCount;
        user.selectedMutamerName = null;
        user.selectedMutamerAgentId = null;
        user.selectedMutamerCountryId = null;
        this.setState({totalCnt: deals.TotalCount});
        for (var i=0;i<deals.Mutamers.length;i++)
        {
          deals.Mutamers[i].key = deals.Mutamers[i].Id+"";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        user.Mutamer = this.state.deals.Mutamers.find(x=>x.Id == dealId);
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
      };
      updateCnt = () => {
          this.setState({MutamerCnt:this.state.MutamerCnt+20});
      }
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals.Mutamers && this.state.deals.Mutamers.length > 0) ?
                    (<DealList deals={this.state.deals.Mutamers}  type="List" onMore={this.updateCnt} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Mutamers} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                {(this.state.deals.Mutamers && this.state.deals.Mutamers.length > 0) && <Footer>
                    <FooterTab style={{backgroundColor:'#204677',justifyContent:'center',paddingTop:15}}>
                            <Text style={{color:'#fff',fontSize:16}}>{this.strings.totalCnt} | </Text>
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