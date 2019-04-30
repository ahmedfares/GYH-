import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, Alert,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar, DeviceEventEmitter,Share
} from 'react-native';
import { Container, Header, Content, Item, Row, Accordion, Icon } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';
import BoxItem from './BoxItem';
import HandleBack from './HandleBack';

export default class TafweejDetailsScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { showLoading: true, fieldLoading: true, AccordionKey: -1 };
        this.ExpandedItem = 0;
        this.dataArray = [];
        this.fieldArray = [];
        this.loadedViews = [];
        this.loadedViews = [{}];
        this.boxCnt = 5;
        this.selectedItem = null;
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'تفاصيل التفويج':'Tafweej Details',
            headerRight: <View>
            <TouchableOpacity
              onPress={() => state.params.handleSave()}
              style={{ marginRight: 10 }}

            ><Icon ios='ios-share' android="md-share" style={{ fontSize: 25, color: 'white' }} />
            </TouchableOpacity>
          </View>
        }
      }
    _renderHeader(item, expanded) {
        return (
            <View style={styles.accordionHeader2}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name={item.iconName} style={{ fontSize: 25, color: '#204677', flex: 0.1 }} />
                    <Text style={{ fontSize: 17, color: '#204677', flex: 0.9 }}>
                        {" "}{item.title}
                    </Text>
                </View>
                <View>
                    {expanded
                        ? <Icon style={{ fontSize: 18, color: '#F7720B' }} name="arrow-dropup" />
                        : <Icon style={{ fontSize: 18, color: '#F7720B' }} name="arrow-dropdown" />}
                </View>

            </View>
        );
    }
    shareContents (){
        let sharedString = this.strings.tafougPage + '\n';
        sharedString += this.strings.Name + ": " + user.Tafweej.Name + '\n';
        sharedString += this.strings.Type + ": " + user.Tafweej.TafweejType + '\n';
        sharedString += this.strings.Date + ": " + user.Tafweej.Date + '\n';
        sharedString += this.strings.mo3tamerenPage + ": " + user.Tafweej.MutamersCount + '\n';
        sharedString += this.strings.Status + ": " + user.Tafweej.Status + '\n';
        sharedString += "\n" + this.strings.Bus + '\n';
        sharedString += this.strings.busId + ": " + user.Tafweej.BusPlateNumber + '\n';
        sharedString += this.strings.Driver + ": " + user.Tafweej.Driver + '\n';
        sharedString += this.strings.fromCity + ": " + user.Tafweej.FromCity + '\n';
        sharedString += this.strings.toCity + ": " + user.Tafweej.ToCity + '\n';
        
        Share.share({
            message: sharedString,
          })
    }
    _renderContent = (item) => {
        if (this.loadedViews.find(x=>x.Id == item.title.Id) == null) {
            this.state.fieldLoading = true;
            this.selectedItem = item;
            //this.getContents(item);
        }
        else
        {
            this.state.fieldLoading = false;
            //this.fieldArray = this.loadedViews.find(x=>x.Id == item.title.Id).data;
        }
        // if (item.title != null)
        //     this.ExpandedItem = item.title.Id;
        //var arr = this.fieldArray;
        //var arr=["one"];
        var elements = [];
        for (var i = 0; i < 1; i++) {
            // push the component to elements!
            elements.push(
                <View  key={item.title}>
                {(item.title == this.strings.tafougPage) && <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-person' android="md-person" style={{ fontSize: 20, color: '#8D8D8D',textAlign:'center'  }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.Name} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.Name}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-finger-print' android="md-finger-print" style={{ fontSize: 20, color: '#8D8D8D',textAlign:'center'  }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.Type} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.TafweejType}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-calendar' android="md-calendar" style={{ fontSize: 20, color: '#8D8D8D',textAlign:'center'  }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.Date} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.Date}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-people' android="md-people" style={{ fontSize: 20, color: '#8D8D8D',textAlign:'center'  }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.mo3tamerenPage} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.MutamersCount}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-trending-up' android="md-trending-up" style={{ fontSize: 20, color: '#8D8D8D',textAlign:'center'  }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.Status}</Text></View>
                </View>
            </View>}
            {(item.title == this.strings.Bus) && <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-finger-print' android="md-finger-print" style={{ fontSize: 20, color: '#8D8D8D' }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.busId} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.BusPlateNumber}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-person' android="md-person" style={{ fontSize: 20, color: '#8D8D8D' }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.Driver} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.DriverName}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-pin' android="md-pin" style={{ fontSize: 20, color: '#8D8D8D' }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.fromCity} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.FromCity}</Text></View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 0.1 }}><Icon ios='ios-jet' android="md-jet" style={{ fontSize: 20, color: '#8D8D8D' }}></Icon></View>
                    <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.strings.toCity} </Text></View>
                    <View style={{ flex: 0.5 }}><Text style={{textAlign:'left'}}>{user.Tafweej.ToCity}</Text></View>
                </View>
            </View>}
        </View>
                

            );

        }
        return (
            <View>
                {!this.state.fieldLoading && <View style={styles.accordionContent2}>
                    {elements}
                </View>}
                {/* {!this.state.fieldLoading && <View>
                    <Text style={{ padding: 10 }}>{this.strings.noContents}</Text>
                </View>} */}
                {this.state.fieldLoading && <View>
                    <Text style={{ padding: 10 }}>{this.strings.loadContent}</Text>
                </View>}
            </View>


        );
    }
    componentDidMount() {
        this.getViews();
        this.props.navigation.setParams({ handleSave: () => this.shareContents() })
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
                this.state.fieldLoading = false;
                this.setState({ AccordionKey: item.title.Id });
            })
    }
    getViews = async () => {

        this.setState({ showLoading: false });
        this.dataArray = [
            { title: this.strings.tafougPage, iconName: "people" },
            { title: this.strings.Bus, iconName: "bus" },
        ];
    }
    onBack = () => {
        Alert.alert(
            this.strings.exit,
            this.strings.exitAlert,
            [
                { text: this.strings.cancel, onPress: () => { }, style: "cancel" },
                { text: this.strings.exit, onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
        );
        return true;
    };

    render() {
        return (
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
                    </Content>
                </Container>
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
        marginBottom: 8
    },
    accordionContent2: {
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
        marginBottom: 8
    }
});