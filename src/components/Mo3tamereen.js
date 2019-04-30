import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { Mo3tamereenListScreen,Mo3tamerSearchScreen } from '../ScreenNames/ScreenNames';
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import MainList from './MainList'

export default class Mo3tamereenScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.lang = user.lang;
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'المعتمرين':'Mutamers',
              headerRight: <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity
              onPress={() => state.params.handleSearch()}
              style={{ marginRight:10 ,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

            ><Icon ios='ios-search' android="md-search" style={{ fontSize: 25, color: 'white' }} />
            </TouchableOpacity>
            
        </View>,
        }
      }

      searchContents() {
        this.props.navigation.navigate(Mo3tamerSearchScreen);
      }
    state = { deals: [],totalCnt:0 };
    componentDidMount() {
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        this.init();
    }
    async init () {
        const deals = await ajax.getMainMutamers(user.lang);
        for (var i=0;i<deals.Statuses.length;i++)
        {
          deals.Statuses[i].key = deals.Statuses[i].Id+"";
          deals.Statuses[i].ItemType = "Mutamer";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        user.selectedMutamer = dealId;
        this.props.navigation.navigate(Mo3tamereenListScreen);
    };
    render() {
        if (this.props.navigation.getParam('newLang') && this.lang != this.props.navigation.getParam('newLang'))
        {
            this.setState({deals:[]});
            this.lang = this.props.navigation.getParam('newLang');
            this.strings = new LocalizedStrings(user.words);
            this.strings.setLanguage(user.lang);
            this.init();
        }
        return (
            <View style={styles.container}>
                {(this.state.deals.Statuses && this.state.deals.Statuses.length > 0) ?
                    (<MainList deals={this.state.deals.Statuses} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Groups} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
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