import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icon, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

class AgentItem extends React.Component {
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
                <View style={{ flex: 1, flexDirection: 'row',marginLeft:-10 }}>
                    <View style={{ flex: 0.1 }}><Image source={require('../images/icon-01.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 15 }} /></View>
                    <View style={{ flex: 0.9 }}><Text style={{ textAlign: 'left', marginLeft: 10, marginTop: 3 }}>{deal.Agent}</Text></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={styles.info}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-04.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5 }} /></View>
                            <View style={{ flex: 0.8 }}><Text style={{ textAlign: 'left', marginLeft: 10,fontSize:11 }}>{deal.Country}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-01.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.51 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Sejel}</Text></View>
                            <View style={{ flex: 0.29 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:11 }}>{deal.AgentSejelId}</Text></View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-09.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.51 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Mofa}</Text></View>
                            <View style={{ flex: 0.29 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:9 }}>{deal.Mofa}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-12.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.51 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Runaway}</Text></View>
                            <View style={{ flex: 0.29 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:11 }}>{deal.Runaway}</Text></View>
                        </View>
                    </View>
                    <View style={{ flex: 0.4,borderColor: '#bbb',borderRightWidth: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.17 }}><Image source={require('../images/icon-02.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7  }} /></View>
                            <View style={{ flex: 0.83 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:11 }}>{deal.City}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.17 }}><Image source={require('../images/icon-05.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.46 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.IataNo}</Text></View>
                            <View style={{ flex: 0.37 }}><Text style={{ textAlign: 'left',marginTop:10,fontSize:10 }}>{deal.IataNumber}</Text></View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.17 }}><Image source={require('../images/icon-08.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.46 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.StatusDate}</Text></View>
                            <View style={{ flex: 0.37 }}><Text style={{ textAlign: 'left',marginTop:10,fontSize:10 }}>{deal.StatusOn.substring(0,10)}</Text></View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.17 }}><Image source={require('../images/icon-13.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.46 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.RunawayPercent}</Text></View>
                            <View style={{ flex: 0.37 }}><Text style={{ textAlign: 'left',marginTop:10,fontSize:11 }}>{deal.Percentage}</Text></View>
                        </View> 
                    </View>
                    <View style={{ flex: 0.3 }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-03.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.42 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Year}</Text></View>
                            <View style={{ flex: 0.38 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:11  }}>{deal.Year}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-06.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.42 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Status}</Text></View>
                            <View style={{ flex: 0.38 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,fontSize:11  }}>{deal.Status}</Text></View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-10.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.42 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Entry}</Text></View>
                            <View style={{ flex: 0.38 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10 ,fontSize:11 }}>{deal.Entry}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                            <View style={{ flex: 0.2 }}><Image source={require('../images/icon-11.png')} style={{ width: 25, height: 25, padding: 5, marginLeft: 5,marginTop:7 }} /></View>
                            <View style={{ flex: 0.42 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10,color:'#204677',fontSize:11 }}>{this.strings.Exit}</Text></View>
                            <View style={{ flex: 0.38 }}><Text style={{ textAlign: 'left', marginLeft: 10,marginTop:10 ,fontSize:11 }}>{deal.Exit}</Text></View>
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
        flexDirection: 'column',
        borderColor: '#bbb',
        borderBottomWidth: 1,
    },
    info: {
        paddingTop:10,
        backgroundColor: '#fff',
        color: '#000',
        flex: 0.3,
        borderColor: '#bbb',
        borderRightWidth: 1
    }
});

export default AgentItem;