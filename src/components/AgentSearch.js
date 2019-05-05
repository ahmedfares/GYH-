import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Share, StatusBar 
} from 'react-native';
import { Container, Footer, FooterTab, Content, Icon, Input, Item, Label } from 'native-base';
import { Mo3tamerDetailsScreen,AgentListScreen } from '../ScreenNames/ScreenNames';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import Toast, { DURATION } from 'react-native-easy-toast';
import ajax from '../ajax';
import user from "../data/userLanguage";
import DealList from './DealList';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class AgentSearchScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { Mutamers: '',loading:true,
         selectedCountry: '',selectedYear: '', selectedAgent: '',
         deals: [], totalCnt: 0,
         agentsData: [{ value: 'loading agents' }], 
         countriesData: [{ value: 'loading countries',name:'loading countries' }],
         yearsData: [{ value: 'loading years',name:'loading years' }],
         agents: [], countries: [], years: [],
        resetYear:false  };
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'استعلام عن وكيل':'Search for Agent',
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

        let exists = await AsyncStorage.getItem('existLookup');
        // if (exists != 'true')
        // {
        //     const lookups = await ajax.getUpdatedStatLookups("2017-03-21");
        //     this.setState({loading:false});
        //     this.setState({ countriesData: lookups.Countries });
        //     this.setState({ agentsData: lookups.Agents });
        //     this.setState({ yearsData: lookups.Years });
        //     await AsyncStorage.setItem('Countries',JSON.stringify(lookups.Countries));
        //     await AsyncStorage.setItem('Agents',JSON.stringify(lookups.Agents));
        //     await AsyncStorage.setItem('Years',JSON.stringify(lookups.Years));
        //     await AsyncStorage.setItem('existLookup','true');
        //     alert('X');
        // }
        // else
        // {
        //     alert('Y');
        //     let countries = await AsyncStorage.getItem('Countries');
        //     let agents = await AsyncStorage.getItem('Agents');
        //     let years = await AsyncStorage.getItem('Years');
        //     this.setState({loading:false});
        //     this.setState({ countriesData: JSON.parse(countries) });
        //     this.setState({ agentsData: JSON.parse(agents) });
        //     this.setState({ yearsData: JSON.parse(years) });
        // }

        const lookups = await ajax.getUpdatedStatLookups("2017-03-21");
        this.setState({ countriesData: lookups.Countries });
        this.setState({ agentsData: lookups.Agents });
        this.setState({ yearsData: lookups.Years });
        for (let i = 0; i < this.state.countriesData.length; i++) {
            this.state.countriesData[i].value = "Choose Year";
            this.state.countriesData[i].name = "Choose Year";
        }
        this.setState({countries:[]});
        this.state.countries.push({value:"Choose Year"})
        for (let i = 0; i < this.state.agentsData.length; i++) {
            this.state.agentsData[i].value = "Choose Country";
            this.state.agentsData[i].name = "Choose Country";
        }
        this.setState({agents:[]});
        this.state.agents.push({value:"Choose Country"})
        this.setState({years:[]});
        for (let i = 0; i < this.state.yearsData.length; i++) {
                this.state.yearsData[i].value = this.state.yearsData[i].Id;
                this.state.yearsData[i].name = this.state.yearsData[i].Id + "";
                this.state.years.push(this.state.yearsData[i]);
        }
        this.setState({ loading: false });
    }
    changeYear() {
        this.state.countries.length = 0;
        this.state.agents.length = 0;
        this.setState({selectedCountry:""});
        this.setState({selectedAgent:""});

        for (let i = 0; i < this.state.countriesData.length; i++) {
            if (this.state.countriesData[i].Years.find(x=>x.Id == this.state.selectedYear) != null){
                if (user.lang == 'ar')
                    {
                        this.state.countriesData[i].value =this.state.countriesData[i].Id + '-'+ this.state.countriesData[i].ArabicName;
                        this.state.countriesData[i].name = this.state.countriesData[i].Id + '-'+ this.state.countriesData[i].ArabicName;
                    }
                else
                    {
                        this.state.countriesData[i].value =this.state.countriesData[i].Id + '-'+ this.state.countriesData[i].EnglishName;
                        this.state.countriesData[i].name = this.state.countriesData[i].Id + '-'+this.state.countriesData[i].EnglishName;
                    }
                this.state.countries.push(this.state.countriesData[i]);
            }
        }
    }
    changeCountry() {
        this.state.agents.length = 0;
        this.setState({selectedAgent:""});
        for (let i = 0; i < this.state.agentsData.length; i++) {
            if (this.state.agentsData[i].CountryId == this.state.countries.find(x=>x.value == this.state.selectedCountry).Id){
                if (user.lang == 'ar')
                    {
                        this.state.agentsData[i].value =this.state.agentsData[i].Id +'-'+ this.state.agentsData[i].ArabicName;
                        this.state.agentsData[i].name = this.state.agentsData[i].Id +'-'+this.state.agentsData[i].ArabicName;
                    }
                else
                    {
                        this.state.agentsData[i].value = this.state.agentsData[i].Id +'-'+this.state.agentsData[i].EnglishName;
                        this.state.agentsData[i].name = this.state.agentsData[i].Id +'-'+this.state.agentsData[i].EnglishName;
                    }
                this.state.agents.push(this.state.agentsData[i]);
            }
        }
    }
    searchMo3tamers(Year, Country, Agent) {
        if ((Year == null || Year == '') && 
        (Country == null || Country == '') &&
        (Agent == null || Agent == ''))
        {
            this.refs.toast.show(  this.strings.SearchMsg, DURATION.LENGTH_LONG);
        }
        else
        {
            user.selectedAgentYear = Year;
            user.selectedAgentCountry = Country;
            user.selectedAgentId = Agent;
            this.props.navigation.navigate(AgentListScreen);
        }
    }
    setCurrentDeal = (dealId) => {
        user.Mutamer = this.state.deals.Mutamers.find(x=>x.Id == dealId);
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
    };

    resetSearch() {
        this.setState({selectedCountry:""});
        this.setState({selectedAgent:""});
        this.setState({selectedYear:""});
        this.setState({resetYear:true});
    }

    render() {
        if (this.props.navigation.getParam('newLang') && this.lang != this.props.navigation.getParam('newLang'))
        {
            this.lang = this.props.navigation.getParam('newLang');
            this.strings = new LocalizedStrings(user.words);
            this.strings.setLanguage(user.lang);
            this.setState({ Mutamers: '',loading:true,
         selectedCountry: '',selectedYear: '', selectedAgent: '',
         deals: [], totalCnt: 0,
         agentsData: [{ value: 'loading agents' }], 
         countriesData: [{ value: 'loading countries',name:'loading countries' }],
         yearsData: [{ value: 'loading years',name:'loading years' }],
         agents: [], countries: [], years: [],
        resetYear:false  });
            this.loadLookups();
        }
        return (
            <Container>
                <Content scrollEnabled={false}> 
                    {!this.state.loading && <View style={{marginTop:100,marginBottom:0}}>
                        <View style={{ paddingHorizontal: 10,marginBottom:10 }}>
                            <Dropdown label={this.strings.Year}  itemCount={5}
                                onChangeText={(selectedYear) => { this.setState({ selectedYear });this.changeYear(); }} 
                                data={this.state.years} value={this.state.selectedYear} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                            {/* <SearchableDropdown
                                // onTextChange={text => alert(text)}
                                onItemSelect={item => { this.setState({ selectedYear: item.Id }); this.changeYear(); }}
                                containerStyle={{ marginTop: 40 }}
                                textInputStyle={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderColor: '#204677',
                                    borderRadius: 5,
                                    color: '#204677'
                                }}
                                itemStyle={{
                                    padding: 10,
                                    backgroundColor: '#204677',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                    borderRadius: 5,

                                }}
                                itemTextStyle={{ color: '#fff' }}
                                itemsContainerStyle={{ maxHeight: 120 }}
                                items={this.state.years}
                                defaultIndex={2}
                                placeholder={this.strings.Year}
                                placeholderTextColor='#204677'
                                resetValue={this.state.resetYear}
                                underlineColorAndroid="transparent"
                            /> */}
                        
                        </View>
                        <View style={{ paddingHorizontal: 10,marginBottom:10 }}>
                            <Dropdown label={this.strings.Country}  itemCount={5}
                                onChangeText={(selectedCountry) => { this.setState({ selectedCountry });this.changeCountry(); }} 
                                data={this.state.countries} value={this.state.selectedCountry} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                                {/* <SearchableDropdown
        // onTextChange={text => alert(text)}
        onItemSelect={item => {this.setState({selectedCountry: item.name });this.changeCountry()}}
        containerStyle={{ marginTop:40 }}
        textInputStyle={{
          padding: 5,
          borderWidth: 1,
          borderColor: '#204677',
          borderRadius: 5,
          color:'#204677'
        }}
        itemStyle={{
          padding: 10,
          backgroundColor: '#204677',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,

        }}
        itemTextStyle={{ color: '#fff' }}
        itemsContainerStyle={{ maxHeight: 120 }}
        items={this.state.countries}
        defaultIndex={2}
        placeholder={this.strings.Country}
        placeholderTextColor='#204677'
        resetValue={false}
        underlineColorAndroid="transparent"
      /> */}
                        </View>
                        <View style={{ paddingHorizontal: 10}}>
                            <Dropdown label={this.strings.Agent}  itemCount={5}
                                onChangeText={(selectedAgent) => { this.setState({ selectedAgent }) }}
                                data={this.state.agents} value={this.state.selectedAgent} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                                {/* <SearchableDropdown
        // onTextChange={text => alert(text)}
        onItemSelect={item => {this.setState({selectedAgent: item.name })}}
        containerStyle={{ marginTop:40 }}
        textInputStyle={{
          padding: 5,
          borderWidth: 1,
          borderColor: '#204677',
          borderRadius: 5,
          color:'#204677'
        }}
        itemStyle={{
          padding: 10,
          backgroundColor: '#204677',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,

        }}
        itemTextStyle={{ color: '#fff' }}
        itemsContainerStyle={{ maxHeight: 120 }}
        items={this.state.agents}
        defaultIndex={2}
        placeholder={this.strings.Agent}
        placeholderTextColor='#204677'
        resetValue={false}
        underlineColorAndroid="transparent"
      /> */}
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
                                this.searchMo3tamers(this.state.selectedYear,
                                    (this.state.selectedCountry)?this.state.countriesData.find(x => x.value == this.state.selectedCountry).Id:null,
                                    (this.state.selectedAgent)?this.state.agentsData.find(x => x.value == this.state.selectedAgent).Id:null);
                            }} style={[styles.buttonContainer]}>
                                <Text style={styles.buttonText}>{this.strings.Search}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        </View>
                    </View>}
                    {this.state.loading && <ActivityIndicator animating={this.state.loading} style={{ marginTop: 400 }} color="#1E4276" size="large" />}
                    <Toast
                            ref="toast"
                            style={{ backgroundColor: '#1E4276' }}
                            position='bottom'
                            positionValue={150}
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
        marginBottom:10
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