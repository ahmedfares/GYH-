import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,Alert,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar,DeviceEventEmitter
} from 'react-native';
import { Container, Header, Content, Item, Row, Accordion, Icon } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import user from "../data/userLanguage";
import ajax from '../ajax';
import LocalizedStrings from 'react-native-localization';
import BoxItem from './BoxItem';
import HandleBack from './HandleBack';

export default class MainScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { showLoading: true, fieldLoading: true, AccordionKey: -1,defaultLanguage:user.lang };
        this.ExpandedItem = 0;
        this.dataArray = [];
        this.fieldArray = [];
        this.loadedViews = [];
        this.boxCnt = 5;
        this.selectedItem = null;
        this.lang = user.lang;
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
          title: (user.lang == 'ar')?'الرئيسية':'Dashboard',
          headerLeft:<View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10}}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerRight:<View></View>
        //   headerRight:(user.lang != user.defaultLang)? <View>
        //   <TouchableOpacity
        //     onPress={() => navigation.toggleDrawer()}
        //     style={{ marginRight: 10,marginLeft:0}}

        //   ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
        //   </TouchableOpacity>
        // </View>:<View></View>,
        }
      }
    _renderHeader(item, expanded) {
        return (
            <View style={styles.accordionHeader2}>
                <Text style={{ fontWeight: "600",color:'#204677' }}>
                    {" "}{item.title.Name}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18, color: '#F7720B' }} name="arrow-dropup" />
                    : <Icon style={{ fontSize: 18, color: '#F7720B' }} name="arrow-dropdown" />}
            </View>
        );
    }
    _renderContent = (item) => {
        if (this.loadedViews.find(x=>x.Id == item.title.Id) == null) {
            this.state.fieldLoading = true;
            this.selectedItem = item;
            this.getContents(item);
        }
        else
        {
            this.fieldArray = this.loadedViews.find(x=>x.Id == item.title.Id).data;
        }
        if (item.title != null)
            this.ExpandedItem = item.title.Id;
        var arr = this.fieldArray;
        //var arr=["one"];
        var elements = [];
        var totalVals = 0;
        for (var i = 0; i < arr.length; i++) {
            totalVals += arr[i].Value;
         }
        for (var i = 0; i < arr.length; i++) {
            // push the component to elements!
            if (i % 2 == 1)
                continue;
            elements.push(
                <View key={i} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <BoxItem iconNum={i % 4} label={arr[i].Name} text={arr[i].Value} total={totalVals} />
                    {(arr[i + 1] != null) && <BoxItem iconNum={(i + 1) % 4} label={arr[i + 1].Name} text={arr[i + 1].Value} total={totalVals} />}
                </View>
            );

        }
        return (
            <View>
                {!this.state.fieldLoading && this.fieldArray.length > 0 && <View style={styles.accordionContent2}>
                    {elements}
                </View>}
                {!this.state.fieldLoading && this.fieldArray.length == 0 && <View style={styles.accordionContent2}>
                    <Text style={{padding:10}}>{this.strings.noContents}</Text>
                </View>}
                {this.state.fieldLoading && <View style={styles.accordionContent2}>
                    <Text style={{padding:10}}>{this.strings.loadContent}</Text>
                </View>}
            </View>


        );
    }
    async componentDidMount() {
        const deals = await ajax.getMainInbox(user.lang);
        user.unreadMsg = 0;
        for(var i=0;i<deals.Inbox.length;i++)
        {
            user.unreadMsg += deals.Inbox[i].UnreadCount;
        }
        this.getViews();
        // DeviceEventEmitter.emit('goback',  {});
    }
    
    getContents = async (item) => {
        let token2 = await AsyncStorage.getItem('token');
        this.state.fieldLoading = true;
        this.fieldArray = [];
        fetch('http://eumra.com/gyh/api/gyh/GetDashboard?ViewId=' + item.title.Id + '&IsArabic=' + (user.lang == 'ar'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token2,
            }
        }).then((response) => response.json())
            .then((res) => {
                this.fieldArray = res.Fields;
                if (item.title.Id == 1)
                {
                    this.setState({ showLoading: false });
                }
                this.loadedViews.push({Id:item.title.Id,data:res.Fields});
                this.state.fieldLoading = false;
                this.setState({ AccordionKey: item.title.Id });
            })
    }
    getViews = async () => {
        let token2 = await AsyncStorage.getItem('token');
        fetch('http://eumra.com/gyh/api/gyh/GetDashboardSettings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token2,
            }
        }).then((response) => response.json())
            .then((res) => {
                for (let i = 0; i < res.Settings.length; i++) {
                    this.dataArray.push({ title: res.Settings[i], content: "Coming Soon" })
                    if (res.Settings[i].Id == 1)
                       {
                        this.getContents({ title:res.Settings[i]});
                       } 
                }
                //this.loadAllContents();
            })
    }
    loadAllContents = () => {
        for (let i = 0; i < this.dataArray.length; i++) {
            if (this.dataArray[i].title.Id != 1)
               {
                   //alert('d');
                this.getContents(this.dataArray[i]);
               } 
        }
    }
    onBack = () => {
          Alert.alert(
              this.strings.exit,
              this.strings.exitAlert,
            [
              { text: this.strings.cancel, onPress: () => {}, style: "cancel" },
              { text: this.strings.exit, onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
          );
          return true;
      };

    render() {
        if (this.props.navigation.getParam('newLang') && this.lang != this.props.navigation.getParam('newLang'))
        {
            this.lang = this.props.navigation.getParam('newLang');
            this.strings = new LocalizedStrings(user.words);
            this.strings.setLanguage(user.lang);
            this.dataArray = [];
            this.fieldArray = [];
            this.loadedViews = [];
            this.selectedItem = null;
            this.getViews();
        }
        return (
            <HandleBack onBack={this.onBack}>
                <Container>
                    <Header androidStatusBarColor="#183B65" style={{ display: 'none' }} />

                    <Content style={{ borderBottomColor: '#FFF' }}>
                        {!this.state.showLoading && <Accordion
                            dataArray={this.dataArray}
                            animation={true}
                            key={this.state.AccordionKey}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            expanded={this.ExpandedItem}
                        />}
                        {this.state.showLoading && <View>
                            <ActivityIndicator animating={this.state.showLoading} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                        </View>}
                    </Content>
                </Container>
            </HandleBack>
        );
    };
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, height: undefined, width: undefined
    },
    box: {
        width: 160,
        height: 130,
        margin: 5,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    accordionHeader: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        // borderBottomColor: expanded
        //     ? '#FFF' : '#FFF'
    },
    accordionHeader2: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom:8
    },
    accordionContent2:{
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: -10,
        marginBottom:8
    }
});