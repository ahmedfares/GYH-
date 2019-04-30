import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { GroupsListScreen,AllInboxDetailsScreen } from '../ScreenNames/ScreenNames';
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import MainInboxList from './MainInboxList'

export default class InboxScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.lang=user.lang;
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'الرسائل':'Inbox',
        }
      }
    state = { deals: [],totalCnt:0 };
    componentDidMount() {
        this.init();
    }
    setCurrentDeal = (dealId) => {
        user.InboxTitle = this.state.deals.Inbox.find(x=>x.Type == dealId).Name;
        user.InboxType = dealId;
        this.props.navigation.navigate(AllInboxDetailsScreen);
    };
    async init (){
        const deals = await ajax.getMainInbox(user.lang);
        for (var i=0;i<deals.Inbox.length;i++)
        {
          deals.Inbox[i].key = deals.Inbox[i].Id+"";
          deals.Inbox[i].ItemType = "Inbox";
        }
        this.setState({ deals });
    }
    render() {
        if (this.props.navigation.getParam('newLang') && this.lang != this.props.navigation.getParam('newLang'))
        {
            this.lang = this.props.navigation.getParam('newLang');
            this.strings = new LocalizedStrings(user.words);
            this.strings.setLanguage(user.lang);
            const deals = [];
              this.setState({ deals });
              this.init();
        }
        return (
            <View style={styles.container}>
                {(this.state.deals.Inbox && this.state.deals.Inbox.length > 0) ?
                    (<MainInboxList deals={this.state.deals.Inbox} onItemPress={this.setCurrentDeal}/>)
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