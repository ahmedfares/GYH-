import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Share, StatusBar
} from 'react-native';
import { Container, Footer, FooterTab, Content, Icon, Input, Item, Label } from 'native-base';
import { Mo3tamerDetailsScreen,Mo3tamereenSearchListScreen, ReportSearchListScreen } from '../ScreenNames/ScreenNames';
import DatePicker from 'react-native-datepicker';
import LocalizedStrings from 'react-native-localization';
import Toast, { DURATION } from 'react-native-easy-toast';
import ajax from '../ajax';
import user from "../data/userLanguage";
import DealList from './DealList';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

export default class ReportSearchScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { Mutamers: '',Groups:'',Passports:''
        ,selectedCountry: '', selectedAgent: '',
         deals: [], totalCnt: 0,agents:[],
         arriveFromDate:"",arriveToDate:"",departureFromDate:"",departureToDate:"",
          agentsData: [{ value: 'loading agents' }], countriesData: [{ value: 'loading countries' }] };
          this.lang = user.lang;
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
        // this.setState({ agents: lookups.Agents });

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
    searchMo3tamers(Mutamer,Group,Passport, Country, Agent,arrivalFromDate,arrivalToDate,departureFromDate,departureToDate) {
        if ((Mutamer == null || Mutamer == '') && 
        (Group == null || Group == '') && 
        (Passport == null || Passport == '') && 
        (arrivalFromDate == null || arrivalFromDate == '') && 
        (arrivalToDate == null || arrivalToDate == '') && 
        (departureFromDate == null || departureFromDate == '') && 
        (departureToDate == null || departureToDate == '') && 
        (Country == null || Country == '') &&
        (Agent == null || Agent == ''))
        {
            this.refs.toast.show(  this.strings.SearchMsg, DURATION.LENGTH_LONG);
        }
        else
        {
            user.selectedReportMutamer = Mutamer;
            user.selectedReportCountryId = Country;
            user.selectedReportAgentId = Agent;
            user.selectedReportGroup = Group;
            user.selectedReportPassport = Passport;
            user.selectedReportArrivalFrom = arrivalFromDate;
            user.selectedReportArrivalTo = arrivalToDate;
            user.selectedReportDepartureFrom = departureFromDate;
            user.selectedReportDepartureTo = departureToDate;
            this.props.navigation.navigate(ReportSearchListScreen);
        }
    }
    setCurrentDeal = (dealId) => {
        user.Mutamer = this.state.deals.Mutamers.find(x=>x.Id == dealId);
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
    };

    resetSearch() {
        this.setState({selectedCountry:""});
        this.setState({selectedAgent:""});
        this.setState({Mutamers:""});
    }

    render() {
        if (this.props.navigation.getParam('newLang') && this.lang != this.props.navigation.getParam('newLang'))
        {
            this.lang = this.props.navigation.getParam('newLang');
            this.strings = new LocalizedStrings(user.words);
            this.strings.setLanguage(user.lang);
            this.setState({ Mutamers: '',Groups:'',Passports:''
            ,selectedCountry: '', selectedAgent: '',
             deals: [], totalCnt: 0,agents:[],
             arriveFromDate:"",arriveToDate:"",departureFromDate:"",departureToDate:"",
              agentsData: [{ value: 'loading agents' }], countriesData: [{ value: 'loading countries' }] });
              const deals = [];
              this.setState({ deals });
              this.loadLookups();
        }
        return (
            <Container>
                <Content scrollEnabled={false}>
                    <View style={{marginTop:0,marginBottom:100}}>
                        
                        <View style={{ paddingHorizontal: 10,marginBottom:0 }}>
                            <Dropdown label={this.strings.Country}  itemCount={5}
                                onChangeText={(selectedCountry) => { this.setState({ selectedCountry });this.changeCountry() }} 
                                data={this.state.countriesData} value={this.state.selectedCountry} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                        </View>
                        <View style={{ paddingHorizontal: 10}}>
                            <Dropdown label={this.strings.Agent}  itemCount={5}
                                onChangeText={(selectedAgent) => { this.setState({ selectedAgent }) }}
                                data={this.state.agents} value={this.state.selectedAgent} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                        </View> 
                        <Item style={styles.Input}>
                            <Input value={this.state.Mutamers} placeholder={this.strings.Mutamer} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Mutamers) => { this.setState({ Mutamers }) }}
                                style={{ color: '#204677', marginLeft: 0 }} />
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss();
                                 }}><Icon active name='search' style={{ color: '#204677' }} /></TouchableOpacity>
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Groups} placeholder={this.strings.Group} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Groups) => { this.setState({ Groups }) }}
                                style={{ color: '#204677', marginLeft: 0 }} />
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss();
                                 }}><Icon active name='search' style={{ color: '#204677' }} /></TouchableOpacity>
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Passports} placeholder={this.strings.Passport} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Passports) => { this.setState({ Passports }) }}
                                style={{ color: '#204677', marginLeft: 0 }} />
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss();
                            }}><Icon active name='search' style={{ color: '#204677' }} /></TouchableOpacity>
                        </Item>

                        <View style={{flex:1,flexDirection:'row',marginBottom:10,marginLeft:10}}>
                        <View style={{flex:0.5}}>
                        <DatePicker
                            style={{ width: 150 }}  date={this.state.arriveFromDate}
                            mode="date" placeholder={this.strings.ArriveFrom} format="YYYY-MM-DD"
                            minDate="2001-01-01" maxDate="2020-01-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel" androidMode="spinner"
                            customStyles={{ dateIcon: {position: 'absolute', left: 0,top: 4, marginLeft: 0},
                                dateInput: {marginLeft: 36} }}
                            onDateChange={(date) => { this.setState({ arriveFromDate: date }) }}
                        />
                        </View>
                        <View style={{flex:0.5}}>
                        <DatePicker
                            style={{ width: 150 }}  date={this.state.arriveToDate}
                            mode="date" placeholder={this.strings.ArriveTo} format="YYYY-MM-DD"
                            minDate="2001-01-01" maxDate="2020-01-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel" androidMode="spinner"
                            customStyles={{ dateIcon: {position: 'absolute', left: 0,top: 4, marginLeft: 0},
                                dateInput: {marginLeft: 36} }}
                            onDateChange={(date) => { this.setState({ arriveToDate: date }) }}
                        />
                        </View>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
                        <View style={{flex:0.5}}>
                        <DatePicker
                            style={{ width: 150}}  date={this.state.departureFromDate}
                            mode="date" placeholder={this.strings.DepartureFrom} format="YYYY-MM-DD"
                            minDate="2001-01-01" maxDate="2020-01-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel" androidMode="spinner"
                            customStyles={{ dateIcon: {position: 'absolute', left: 0,top: 4, marginLeft: 0},
                                dateInput: {marginLeft: 36} }}
                            onDateChange={(date) => { this.setState({ departureFromDate: date }) }}
                        />
                        </View>
                        <View style={{flex:0.5}}>
                        <DatePicker
                            style={{ width: 150 }}  date={this.state.departureToDate}
                            mode="date" placeholder={this.strings.DepartureTo} format="YYYY-MM-DD"
                            minDate="2001-01-01" maxDate="2020-01-01" confirmBtnText="Confirm"
                            cancelBtnText="Cancel" androidMode="spinner"
                            customStyles={{ dateIcon: {position: 'absolute', left: 0,top: 4, marginLeft: 0},
                                dateInput: {marginLeft: 36} }}
                            onDateChange={(date) => { this.setState({ departureToDate: date }) }}
                        />
                        </View>
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
                                this.searchMo3tamers(this.state.Mutamers,this.state.Groups,this.state.Passports,
                                    (this.state.selectedCountry)?this.state.countriesData.find(x => x.value == this.state.selectedCountry).Id:null,
                                    (this.state.selectedAgent)?this.state.agentsData.find(x => x.value == this.state.selectedAgent).Id:null,
                                    this.state.arrivalFromDate,this.state.arrivalToDate,this.state.departureFromDate,this.state.departureToDate);
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