import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icon, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

class TafweejItem extends React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
    };
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }
    render() {
        const { deal } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.deal}>
                {/* <Image source={{ uri: deal.media[0] }} style={styles.image} /> */}
                <View style={{ flex: 0.15 }}>
                    <View style={{ flex: 1,marginBottom:10,marginTop:10,borderRightWidth:1,borderRightColor:'#aaa', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            {(deal.TravelType == 1) && <Image style={{ height: 40, width: 40 }} source={require('../images/Air.png')} />}
                            {(deal.TravelType > 1) && <Image style={{ height: 40, width: 40 }} source={require('../images/Land.png')} />}
                        </View>
                    </View>
                </View>

                <View style={styles.info}>

                    <View style={{ flex: 1, flexDirection: 'row',alignItems:'center',paddingBottom:10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/TafweejName.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.9 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.Name != null && deal.Name != '')?deal.Name:this.strings.NoData}</Text></View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row',alignItems:'center' }}>
                        <View style={{flex:0.5,borderRightWidth:1,borderRightColor:'#aaa'}}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingBottom:10}}>

                        <View style={{ flex: 0.18 }}>
                        <Image source={require('../images/MutamerNum.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.45 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.37 }}><Text style={{textAlign:'left',marginLeft:5,fontSize:11}}>{(deal.Id != null && deal.Id != '')?deal.Id:this.strings.NoData}</Text></View>
                  
                        </View>
                        <View style={{flex:1,flexDirection:'row',paddingBottom:10,alignItems:'center'}}>

                        <View style={{ flex: 0.18 }}>
                        <Image source={require('../images/MutamerStatus.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.45 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.37 }}><Text style={{textAlign:'left',marginLeft:5,fontSize:11}}>{(deal.Status != null && deal.Status != '')?deal.Status:this.strings.NoData}</Text></View>
                  
                        </View>
                        <View style={{flex:1,flexDirection:'row',paddingBottom:10,alignItems:'center'}}>

                        <View style={{ flex: 0.18 }}>
                        <Image source={require('../images/From.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.45 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.fromCity} </Text></View>
                        <View style={{ flex: 0.37 }}><Text style={{textAlign:'left',marginLeft:5,fontSize:11}}>{(deal.FromCity != null && deal.FromCity != '')?deal.FromCity:this.strings.NoData}</Text></View>
                  
                        </View>
                        </View>
                        <View style={{flex:0.5}}>
                        <View style={{flex:1,flexDirection:'row', alignItems:'center',paddingBottom:10}}>

                        <View style={{ flex: 0.2 }}>
                        <Image source={require('../images/TafweejDate.png')} style={{ height: '100%', width: '100%',marginLeft:5 }} />
                        </View>
                        <View style={{ flex: 0.8 }}><Text style={{textAlign:'left',marginLeft:10,fontSize:11}}>{(deal.Date != null && deal.Date != '')?deal.Date.substring(0,10):this.strings.NoData}</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row', alignItems:'center',paddingBottom:10}}>

                        <View style={{ flex: 0.2 }}>
                        <Image source={require('../images/TafweejType.png')} style={{ height: '100%', width: '100%',marginLeft:5 }} />
                        </View>
                        <View style={{ flex: 0.5 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10,fontSize:11}}>{(deal.TafweejType != null && deal.TafweejType != '')?deal.TafweejType:this.strings.NoData}</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row', alignItems:'center',paddingBottom:10}}>

<View style={{ flex: 0.2 }}>
<Image source={require('../images/To.png')} style={{ height: '100%', width: '100%',marginLeft:5 }} />
</View>
<View style={{ flex: 0.5 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.toCity} </Text></View>
<View style={{ flex: 0.3 }}><Text style={{textAlign:'left',marginLeft:10,fontSize:11}}>{(deal.ToCity != null && deal.ToCity != '')?deal.ToCity:this.strings.NoData}</Text></View>
</View>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 0.1 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            {(user.lang == 'ar') && <Image style={{ height: 50, width: 50 }} source={require('../images/Details.png')} />}
                            {(user.lang == 'en-US') && <Image style={{ height: 50, width: 50 }} source={require('../images/Details.png')} />}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 0,
        marginTop: 0,
        flex: 1,
        flexDirection: 'row',
        borderColor: '#bbb',
        borderBottomWidth: 1,

    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
        flex: 0.75
    }
});

export default TafweejItem;