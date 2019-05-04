import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar
} from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { TafweejDetailsScreen,TafweejSearchScreen } from '../ScreenNames/ScreenNames';
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import TafweejList from './TafweejList';

export default class TafweejListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'قائمة التفويج':'Tafweej List',
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
        this.props.navigation.navigate(TafweejSearchScreen);
      }

    state = { deals: [],totalCnt:52348 };
    async componentDidMount() {
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        const deals = await ajax.fetchDetailedTafweej(user.selectedTafweej,1,(user.lang == 'ar'));
        user.lastPageTafweej = deals.lastPage;
        user.totalGroupsCount = deals.TotalCount;
        this.setState({totalCnt: deals.TotalCount});
        for (var i=0;i<deals.Tafweejs.length;i++)
        {
          deals.Tafweejs[i].key = deals.Tafweejs[i].Id+"";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        user.Tafweej = this.state.deals.Tafweejs.find(x=>x.Id == dealId);
        this.props.navigation.navigate(TafweejDetailsScreen);
      };
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals.Tafweejs && this.state.deals.Tafweejs.length > 0) ?
                    (<TafweejList deals={this.state.deals.Tafweejs} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Tafweejs} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                {/* {(this.state.deals.Tafweejs && this.state.deals.Tafweejs.length > 0) && <Footer>
                    <FooterTab style={{backgroundColor:'#323232',justifyContent:'space-between'}}>
                            <Text style={{color:'#fff',fontSize:16}}>{this.strings.totalCnt}</Text>
                            <Text style={{color:'#fff',fontSize:16}}>{this.state.totalCnt}</Text>
                    </FooterTab>
                </Footer>} */}
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