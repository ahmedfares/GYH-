import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import { icon, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import PopoverTooltip from 'react-native-popover-tooltip';

class GroupItem extends React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
    };
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = {
            order: 1,
            userType:0
        };
    }
    async componentDidMount (){
        this.state.userType = await AsyncStorage.getItem('userType');
        //alert(this.state.userType)
    }
    async askMofa()
    {
        let val = await ajax.askMofa(user.selectedGroup,user.lang,false);
    }
    async askMofaIgnoreFilter()
    {
        let val = await ajax.askMofa(user.selectedGroup,user.lang,true);
    }
    async returnToAgent()
    {
        let val = await ajax.returnToAgent(user.selectedGroup,user.lang);
    }
    async pullGroup()
    {
        let val = await ajax.pullGroup(user.selectedGroup,user.lang);
    }
    async changePackage()
    {
        let val = await ajax.changePackage(user.selectedGroup,user.lang);
    }
    render() {
        const { deal } = this.props;
        return (
                        <View style={styles.main}>
            <View style={styles.deal}>
                        {/* <Image source={{ uri: deal.media[0] }} style={styles.image} /> */}
                            <View style={styles.info}>

                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                            <View style={{ flex: 0.1 }}>
                                <Image source={require('../images/MutamerName.png')} style={{ height: '100%', width: '100%' }} />
                            </View>
                            <View style={{ flex: 0.9 }}><Text style={{ textAlign: 'left', marginLeft: 10 }}>{(deal.Name != null && deal.Name != '') ? deal.Name : this.strings.NoData}</Text></View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                            <View style={{ flex: 0.1 }}>
                                <Image source={require('../images/MutamerAgent.png')} style={{ height: '100%', width: '100%' }} />
                            </View>
                            <View style={{ flex: 0.2 }}><Text style={{ color: '#204677', textAlign: 'left', marginLeft: 10 }}>{this.strings.Agent} </Text></View>
                            <View style={{ flex: 0.7 }}><Text style={{ textAlign: 'left', marginLeft: 10 }}>{(deal.AgentName != null && deal.AgentName != '') ? deal.AgentName : this.strings.NoData}</Text></View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.1 }}>
                                <Image source={require('../images/MutamerStatus.png')} style={{ height: '100%', width: '100%' }} />
                            </View>
                            <View style={{ flex: 0.2 }}><Text style={{ color: '#204677', textAlign: 'left', marginLeft: 10 }}>{this.strings.Status} </Text></View>
                            <View style={{ flex: 0.7 }}><Text style={{ textAlign: 'left', marginLeft: 10 }}>{(deal.Status != null && deal.Status != null)?deal.Status:this.strings.NoData}</Text></View>
                        </View>

                            </View>
                            <View style={{flex:0.1}}>
                                    {/* {(this.state.userType == 3) && <PopoverTooltip
                      ref='tooltip1'
                      buttonComponent={
                        <View style={{paddingTop:10,paddingBottom:0,width:50,justifyContent:'center',alignItems:'center'}}>
                                <Icon ios='ios-more' android="md-more" style={{ fontSize: 20, color: '#204677' }}></Icon>
                                </View>
                      }
                      items={[
                        {
                          label: 'Ask MOFA',
                          onPress: () => {this.askMofa}
                        },
                        {
                            label: 'Ask MOFA Without Filter',
                            onPress: () => {this.askMofaIgnoreFilter}
                        },
                        {
                          label: 'Return to Agent',
                          onPress: () => {this.returnToAgent}
                        },
                        {
                          label: 'Pull Group',
                          onPress: () => {this.pullGroup}
                        }
                        // ,
                        // {
                        //   label: 'Change Package',
                        //   onPress: () => {this.changePackage}
                        // }
                      ]}
                      triangleOffset={(user.lang == 'ar')?140:null}
                      overlayStyle={{backgroundColor: 'transparent'}} // set the overlay invisible
                      tooltipContainerStyle={{borderRadius:2,marginLeft:(user.lang == 'ar')?150:0}}
                      labelContainerStyle={{backgroundColor: '#204666', width: 180, alignItems: 'center'}}
                      labelStyle={{color:'#fff'}}
                      lang={user.lang}
                      />} */}
                            </View>
                      </View>
                      <View style={{flex:1}}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 10,height:40 }}>
                          
                            <View style={{ flex: 0.5, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#aaa', alignItems: 'center' }}>
                                <View style={{ flex: 0.2 }}>
                                    <Image source={require('../images/ProgramNum.png')} style={{ height: '100%', width: '100%' }} />
                                </View>
                                <View style={{ flex: 0.47 }}><Text style={{ color: '#204677', textAlign: 'left', marginLeft: 10 , fontSize: 12}}>{this.strings.PNO} </Text></View>
                                <View style={{ flex: 0.33 }}><Text style={{ textAlign: 'left', marginLeft: 5, fontSize: 11 }}>{(deal.Id != null && deal.Id != '') ? deal.PackageNo : this.strings.NoData}</Text></View>
                            </View>
                           
                            <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 0.2 }}>
                                    <Image source={require('../images/MutamerNum.png')} style={{ height: '100%', width: '100%', marginLeft: 5 }} />
                                </View>
                                <View style={{ flex: 0.4 }}><Text style={{ color: '#204677', textAlign: 'left', marginLeft: 10, fontSize: 12 }}>{this.strings.GID} </Text></View>
                                <View style={{ flex: 0.4 }}><Text style={{ textAlign: 'left', marginLeft: 10, fontSize: 11 }}>{(deal.Id != null && deal.Id != '') ? deal.Id : this.strings.NoData}</Text></View>
                            </View>

                        </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10,height:40 }}>
                        <View style={{ flex: 0.25,flexDirection:'row', borderRightWidth: 1, borderRightColor: '#aaa',alignItems:'center' }}>
                            <View style={{ flex: 0.5 }}>
                                <Image source={require('../images/Adult.png')} style={{ height: '100%', width: '100%', marginLeft: 5 }} />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ textAlign: 'center', marginLeft: 10 }}>{(deal.Adult != null && deal.Adult != null) ? deal.Adult : this.strings.NoData}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.25,flexDirection:'row', borderRightWidth: 1, borderRightColor: '#aaa',alignItems:'center' }}>
                            <View style={{ flex: 0.5 }}>
                                <Image source={require('../images/Child.png')} style={{ height: '100%', width: '100%', marginLeft: 5 }} />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ textAlign: 'center', marginLeft: 10 }}>{(deal.Child != null && deal.Child != null) ? deal.Child : this.strings.NoData}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.25,flexDirection:'row', borderRightWidth: 1, borderRightColor: '#aaa',alignItems:'center' }}>
                            <View style={{ flex: 0.5 }}>
                                <Image source={require('../images/Infant.png')} style={{ height: '100%', width: '100%', marginLeft: 5 }} />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ textAlign: 'center', marginLeft: 10 }}>{(deal.Infant != null && deal.Infant != null) ? deal.Infant : this.strings.NoData}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.25,flexDirection:'row', borderRightWidth: 1, borderRightColor: '#aaa',alignItems:'center' }}>
                            <View style={{ flex: 0.5 }}>
                                <Image source={require('../images/totalFamily.png')} style={{ height: '100%', width: '100%', marginLeft: 5 }} />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ textAlign: 'center', marginLeft: 10 }}>{(deal.Total != null && deal.Total != null) ? deal.Total : this.strings.NoData}</Text>
                            </View>
                        </View>
                    </View>

                      </View>
                        </View>
        );
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 0,
        marginTop: 0,
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
        flex: 0.9
    }
});

export default GroupItem;