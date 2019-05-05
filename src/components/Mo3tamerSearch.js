import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Share, StatusBar
} from 'react-native';
import { Container, Footer, FooterTab, Content, Icon, Input, Item, Label } from 'native-base';
import { Mo3tamerDetailsScreen,Mo3tamereenSearchListScreen } from '../ScreenNames/ScreenNames';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import Toast, { DURATION } from 'react-native-easy-toast';
import ajax from '../ajax';
import user from "../data/userLanguage";
import DealList from './DealList';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class Mo3tamerSearchScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { Mutamers: '', selectedCountry: '', selectedAgent: '',
         deals: [], totalCnt: 0,agents:[],
          agentsData: [{ value: 'loading agents' }], 
          Passport: '', Mofa: '', Moi: '',Group:'',
          countriesData: [{ value: 'loading countries',name: 'loading countries' }] };
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
                {
                    this.state.countriesData[i].value = this.state.countriesData[i].Id +"-"+ this.state.countriesData[i].ArabicName;
                    this.state.countriesData[i].name = this.state.countriesData[i].Id +"-"+this.state.countriesData[i].ArabicName;
                }
            else
                {
                    this.state.countriesData[i].value = this.state.countriesData[i].Id +"-"+this.state.countriesData[i].EnglishName;
                    this.state.countriesData[i].name = this.state.countriesData[i].Id +"-"+this.state.countriesData[i].EnglishName;
                }
        }

        for (let i = 0; i < this.state.agentsData.length; i++) {
            if (user.lang == 'ar')
                {
                    this.state.agentsData[i].value = this.state.agentsData[i].Id +'-'+ this.state.agentsData[i].ArabicName;
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
    searchMo3tamers(Mutamer, Country, Agent,Passport,Mofa,Moi,group) {
        if ((Mutamer == null || Mutamer == '') && 
        (Country == null || Country == '') &&
        (Passport == null || Passport == '') &&
        (Mofa == null || Mofa == '') &&
        (Moi == null || Moi == '') &&
        (group == null || group == '') &&
        (Agent == null || Agent == ''))
        {
            this.refs.toast.show(  this.strings.SearchMsg, DURATION.LENGTH_LONG);
        }
        else
        {
            user.selectedMutamerName = Mutamer;
            user.selectedMutamerCountryId = Country;
            user.selectedMutamerAgentId = Agent;
            user.selectedMutamerPassport = Passport;
            user.selectedMutamerMofa = Mofa;
            user.selectedMutamerMoi = Moi;
            user.selectedMutamerGroup = group;
            this.props.navigation.navigate(Mo3tamereenSearchListScreen);
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
    restrict = (event) => {
        alert(event);

        const regex = new RegExp("/^[^!-\\/:-@\\[-`{-~]+$/;");;
        
        const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
        
        event.preventDefault(); return false;
        
        }
        
        }
    render() {

        return (
            <Container scrollEnabled={false}>
                <Content scrollEnabled={false}>
                    <View style={{marginTop:0,marginBottom:0}}>
                        <Item style={styles.Input}>
                            <Input value={this.state.Mutamers} placeholder={this.strings.Name} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Mutamers) => { this.setState({ Mutamers }) }}
                                style={{ color: '#204677', marginLeft: 0,textAlign:'left' }} />
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Passport} placeholder={this.strings.Passport} placeholderTextColor='#204677' color='#204677'
                                onKeyPress={(e) => this.restrict(e)}
                                onChangeText={(Passport) => {  this.setState({ Passport }) }}
                                style={{ color: '#204677', marginLeft: 0,textAlign:'left' }} />
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Mofa} placeholder={this.strings.Mofa} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Mofa) => { this.setState({ Mofa }) }}
                                style={{ color: '#204677', marginLeft: 0,textAlign:'left' }} />
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Moi} placeholder={this.strings.MoiNumber} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Moi) => { this.setState({ Moi }) }}
                                style={{ color: '#204677', marginLeft: 0,textAlign:'left' }} />
                        </Item>
                        <Item style={styles.Input}>
                            <Input value={this.state.Group} placeholder={this.strings.Group} placeholderTextColor='#204677' color='#204677'
                                onChangeText={(Group) => { this.setState({ Group }) }}
                                style={{ color: '#204677', marginLeft: 0 ,textAlign:'left'}} />
                        </Item>
                        <View style={{ paddingHorizontal: 10,marginBottom:10,textAlign:'center' }}>
                            <Dropdown label={this.strings.Country}  itemCount={5}
                                onChangeText={(selectedCountry) => { this.setState({ selectedCountry });this.changeCountry() }} 
                                data={this.state.countriesData} value={this.state.selectedCountry} textColor="#204677" baseColor='#204677' selectedItemColor="#000" />
                            
                            {/* <SearchableDropdown
                                // onTextChange={text => alert(text)}
                                onItemSelect={item => { this.setState({ selectedCountry: item.name }); this.changeCountry() }}
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
                                items={this.state.countriesData}
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
                                onItemSelect={item => { this.setState({ selectedAgent: item.name }) }}
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
                                items={this.state.agents}
                                defaultIndex={2}
                                placeholder={this.strings.Agent}
                                placeholderTextColor='#204677'
                                resetValue={false}
                                underlineColorAndroid="transparent"
                            /> */}
                        </View> 
                        
                            <View style={{flex:1,flexDirection:'row',marginTop:-20}}>
                            <View style={{flex:0.5}}>
                        <TouchableOpacity onPress={() => {
                                this.resetSearch();
                            }} style={[styles.buttonContainer,{backgroundColor:'red'}]}>
                                <Text style={styles.buttonText}>{this.strings.Reset}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5}}>
                        <TouchableOpacity onPress={() => {
                                this.searchMo3tamers(this.state.Mutamers,
                                    (this.state.selectedCountry)?this.state.countriesData.find(x => x.value == this.state.selectedCountry).Id:null,
                                    (this.state.selectedAgent)?this.state.agentsData.find(x => x.value == this.state.selectedAgent).Id:null,
                                    this.state.Passport,this.state.Mofa,this.state.Moi,this.state.Group)
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