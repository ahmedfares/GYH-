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
import AgentList from './AgentList';

export default class AgentListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = {MutamerCnt:20};
    }
    updateCnt = () => {
        this.setState({MutamerCnt:this.state.MutamerCnt+20});
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'نتائج البحث':'Search Results',
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

    state = { deals: [],totalCnt:52348,pageLength:20,MutamerCnt:20  };
    async componentDidMount() {
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        const deals = await ajax.fetchDetailedAgent(1,(user.lang == 'ar'),user.selectedAgentYear,user.selectedAgentCountry,user.selectedAgentId);
        user.lastPageAgent = deals.lastPage;
        user.totalGroupsCount = deals.TotalCount;
        this.setState({totalCnt: deals.TotalCount});
        for (var i=0;i<deals.Agents.length;i++)
        {
          deals.Agents[i].key = deals.Agents[i].Id+"";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        //user.Tafweej = this.state.deals.Tafweejs.find(x=>x.Id == dealId);
        //this.props.navigation.navigate(TafweejDetailsScreen);
      };
      updateCnt = () => {
        this.setState({MutamerCnt:this.state.MutamerCnt+20});
    }
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals && this.state.deals.Agents && this.state.deals.Agents.length > 0) ?
                    (<AgentList deals={this.state.deals.Agents}  onMore={this.updateCnt} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={true} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                   {(this.state.deals && this.state.deals.Agents && this.state.deals.Agents.length > 0) && <Footer>
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