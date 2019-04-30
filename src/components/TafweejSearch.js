import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, Share, StatusBar
} from 'react-native';
import { Container, Footer, FooterTab, Content, Icon, Input, Item, Label } from 'native-base';
import { Mo3tamerDetailsScreen } from '../ScreenNames/ScreenNames';
import Toast, { DURATION } from 'react-native-easy-toast';
import profile from "../data/ProfileData";
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import DealList from './DealList';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';


export default class TafweejSearchScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { Mutamers: '', selectedCountry: '', selectedAgent: '', deals: [], totalCnt: 0, agentsData: [{ value: 'loading agents' }], countriesData: [{ value: 'loading countries' }] };
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
        }
    }
    async searchMo3tamers(Mutamer, Country, Agent) {
        const deals = await ajax.fetchSearchedMutamers(user.selectedMutamer, 1, Mutamer, Country, Agent);
        user.totalGroupsCount = deals.TotalCount;
        this.setState({ totalCnt: deals.TotalCount });
        for (var i = 0; i < deals.Mutamers.length; i++) {
            deals.Mutamers[i].key = deals.Mutamers[i].Id + "";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        user.Mutamer = this.state.deals.Mutamers.find(x=>x.Id == dealId);
        this.props.navigation.navigate(Mo3tamerDetailsScreen);
    };


    render() {

        return (
            <Container style={{ backgroundColor: '#204677' }}>
                <Content  scrollEnabled={false}>
                    <View>
                        <Label style={{ fontSize: 15, color: '#D7622C', paddingTop: 5 }}>Search</Label>
                        <Item style={styles.Input}>
                            <Input placeholder={this.strings.Mutamer} placeholderTextColor='white' color='white'
                                onChangeText={(Mutamers) => { this.setState({ Mutamers }) }}
                                style={{ color: 'white', marginLeft: 0 }} />
                            <TouchableOpacity onPress={() => {
                                Keyboard.dismiss();
                                this.searchMo3tamers(this.state.Mutamers,
                                    (this.state.selectedCountry)?this.state.countriesData.find(x => x.value == this.state.selectedCountry).Id:null,
                                    (this.state.selectedAgent)?this.state.agentsData.find(x => x.value == this.state.selectedAgent).Id:null);
                            }}><Icon active name='search' style={{ color: 'white' }} /></TouchableOpacity>
                        </Item>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Dropdown label={this.strings.Country}  itemCount={5}
                                onChangeText={(selectedCountry) => { this.setState({ selectedCountry }) }} 
                                data={this.state.countriesData} textColor="#fff" baseColor='#fff' selectedItemColor="#204677" style={{ borderBottomColor: '#fff' }} />
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Dropdown label={this.strings.Agent}  itemCount={5}
                                onChangeText={(selectedAgent) => { this.setState({ selectedAgent }) }}
                                data={this.state.agentsData} textColor="#fff" baseColor='#fff' selectedItemColor="#204677" style={{ borderBottomColor: '#fff' }} />
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ height: 270 }}>
                            {this.state.deals.Mutamers && this.state.deals.Mutamers.length > 0 ?
                                (<DealList deals={this.state.deals.Mutamers} onItemPress={this.setCurrentDeal} />)
                                : (<View style={{ backgroundColor: 'white', height: 500 }}><Text></Text></View>)}
                        </View>
                    </ScrollView>


                </Content>

                <Footer>
                    <FooterTab style={{ backgroundColor: '#323232', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>{this.strings.totalCnt}</Text>
                        <Text style={{ color: '#fff', fontSize: 16 }}>{this.state.totalCnt}</Text>
                    </FooterTab>
                </Footer>
            </Container>
            // <View style={styles.container}>
            //     <View style={{flex:1,backgroundColor:'#204677'}}>
            //         <Item>
            //             <Input placeholder='Icon Alignment in Textbox' />
            //             <Icon active name='swap' />
            //         </Item>
            //     </View>
            //     {this.state.deals.length > 0 ?
            //         (<DealList deals={this.state.deals} onItemPress={this.setCurrentDeal}/>)
            //         : (<Text style={styles.header}>جاري التحميل ...</Text>)}
            //     <Footer>
            //         <FooterTab style={{backgroundColor:'#323232',justifyContent:'space-between'}}>
            //                 <Text style={{color:'#fff',fontSize:16}}>{this.strings.totalCnt}</Text>
            //                 <Text style={{color:'#fff',fontSize:16}}>{this.state.totalCnt}</Text>
            //         </FooterTab>
            //     </Footer>
            // </View>

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
        backgroundColor: '#204677',
        zIndex: 1000,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 0,

    }
});