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
import DealList from './DealList'

export default class Mo3tamereenSearchListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'نتائج البحث':'Search Results',
              headerRight: <View style={{flex:1,flexDirection:'row'}}>
        </View>,
        }
      }

      searchContents() {
        this.props.navigation.navigate(Mo3tamerSearchScreen);
      }

    state = { deals: [],totalCnt:52348 };
    async componentDidMount() {
        //alert(user.selectedMutamer);
        const deals = await  ajax.fetchSearchedMutamers(-1, 1,(user.lang == 'ar'), user.selectedMutamerName,
            user.selectedMutamerCountryId, user.selectedMutamerAgentId,user.selectedMutamerMofa
            ,user.selectedMutamerPassport,user.selectedMutamerGroup,user.selectedMutamerMoi);
        user.lastPageMutamer = deals.lastPage;
        user.totalGroupsCount = deals.TotalCount;
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
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals.Mutamers && this.state.deals.Mutamers.length > 0) ?
                    (<DealList deals={this.state.deals.Mutamers} type="Search" onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Mutamers} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                {/* {(this.state.deals.Mutamers && this.state.deals.Mutamers.length > 0) && <Footer>
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