import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Share, StatusBar
} from 'react-native';
import { Container, Footer, FooterTab, Content, Icon, Input, Item, Label } from 'native-base';
import { Mo3tamerDetailsScreen,GroupsSearchListScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import GroupList from './GroupList';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

export default class GroupSearchScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { Groups: '', selectedCountry: '', selectedAgent: '', deals: [], totalCnt: 0, agents: [{ value: 'loading agents' }], agentsData: [{ value: 'loading agents' }], countriesData: [{ value: 'loading countries' }] };
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'بحث':'Search',
        }
      }
    async componentDidMount() {
        //const deals = await ajax.fetchInitialDeals();
        this.props.navigation.setParams({ handleSearch: () => this.searchMo3tamers() })
        const deals = [];
        this.setState({ deals });
        this.loadLookups();
    }
    async loadLookups() {

        const lookups = await ajax.getUpdatedLookups("2017-03-21");
        this.setState({ countriesData: lookups.Countries });
        this.setState({ agentsData: lookups.Agents });
        this.state.agents.length = 0;
        for (let i = 0; i < this.state.countriesData.length; i++) {
            if (user.lang == 'ar')
                this.state.countriesData[i].value = this.state.countriesData[i].ArabicName;
            else
                this.state.countriesData[i].value = this.state.countriesData[i].EnglishName;
        }

        for (let i = 0; i < this.state.agentsData.length; i++) {
            if (user.lang == 'ar')
                this.state.agentsData[i].value = this.state.agentsData[i].ArabicName;
            else
                this.state.agentsData[i].value = this.state.agentsData[i].EnglishName;

            this.state.agents.push(this.state.agentsData[i]);
        }
    }
    async searchMo3tamers(Mutamer, Country, Agent) {
        if ((Mutamer == null || Mutamer == '') && 
        (Country == null || Country == '') &&
        (Agent == null || Agent == ''))
        {
            this.refs.toast.show( this.strings.SearchMsg, DURATION.LENGTH_LONG);
        }
        else
        {
            user.selectedGroupName = Mutamer;
            user.selectedGroupCountryId = Country;
            user.selectedGroupAgentId = Agent;
            this.props.navigation.navigate(GroupsSearchListScreen);
        }
    }
    setCurrentDeal = (dealId) => {
        // alert(dealId);
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
    };

    resetSearch() {
        this.setState({selectedCountry:""});
        this.setState({selectedAgent:""});
        this.setState({Groups:""});
    }

    changeCountry () {
        this.state.agents.length = 0;
        this.setState({selectedAgent:""});
        for (let i = 0; i < this.state.agentsData.length; i++) {
            if (this.state.agentsData[i].CountryId == this.state.countriesData.find(x=>x.value == this.state.selectedCountry).Id){
                if (user.lang == 'ar')
                    this.state.agentsData[i].value = this.state.agentsData[i].ArabicName;
                else
                    this.state.agentsData[i].value = this.state.agentsData[i].EnglishName;
                this.state.agents.push(this.state.agentsData[i]);
            }
        }
    }

    render() {

        return (
            <Container >
                <Content scrollEnabled={false}>
                    <View style={{marginTop:100,marginBottom:100}}>
                        <Item style={styles.Input}>
                            <Input placeholder={this.strings.Group} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Groups) => { this.setState({ Groups }) }}
                                value={this.state.Groups} style={{ color: '#204677', marginLeft: 0,textAlign:'left' }} />
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss();
                                 }}><Icon active name='search' style={{ color: '#204677' }} /></TouchableOpacity>
                        </Item>
                        <View style={{ paddingHorizontal: 10,marginBottom:10 }}>
                            <Dropdown label={this.strings.Country}  itemCount={5}
                                onChangeText={(selectedCountry) => { this.setState({ selectedCountry });this.changeCountry(); }} 
                                data={this.state.countriesData} value={this.state.selectedCountry} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                        </View>
                        <View style={{ paddingHorizontal: 10}}>
                            <Dropdown label={this.strings.Agent}  itemCount={5}
                                onChangeText={(selectedAgent) => { this.setState({ selectedAgent }) }}
                                data={this.state.agents} value={this.state.selectedAgent} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                        </View> 
                        
                            <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.5}}>
                        <TouchableOpacity onPress={() => {
                                this.resetSearch();
                            }} style={[styles.buttonContainer,{backgroundColor:'red'}]}>
                                <Text style={styles.buttonText}>{this.strings.Reset}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5}}>
                        <TouchableOpacity onPress={() => {
                                this.searchMo3tamers(this.state.Groups,
                                    (this.state.selectedCountry)?this.state.countriesData.find(x => x.value == this.state.selectedCountry).Id:null,
                                    (this.state.selectedAgent)?this.state.agentsData.find(x => x.value == this.state.selectedAgent).Id:null);
                            }} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{this.strings.Search}</Text>
                            </TouchableOpacity>
                            </View>
                        
                        </View>
                    </View>
                    <Toast
                            ref="toast"
                            style={{ backgroundColor: '#1E4276' }}
                            position='bottom'
                            positionValue={160}
                            fadeInDuration={500}
                            fadeOutDuration={500}
                            opacity={0.8}
                        />
                </Content>
            </Container>

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
    },
    Input: {
        zIndex: 1000,
        borderBottomColor: '#204677',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 0,

    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems:'center',
        margin: 40,
        marginHorizontal: 5,
        padding: 10,
        borderWidth: 0,
        borderColor: '#fff',
        borderRadius: 20,
        backgroundColor: '#1E4276',
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'homa'
    }
});