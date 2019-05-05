import React from 'react';
import {View , Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import {icon, Icon} from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

class VoucherItem extends  React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
      };
      constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }
    render(){
        const { deal} = this.props;
        return(
            <TouchableOpacity  onPress={this.handlePress} style={styles.deal}>
            {/* <Image source={{ uri: deal.media[0] }} style={styles.image} /> */}
                <View style={styles.info}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerNum.png')} style={{ height: '100%', width: '100%',marginLeft:0 }} />
                       </View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.65 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Id}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/10.png')} style={{ height: 20, width: 20,marginLeft:5 }} />
                        </View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Country} </Text></View>
                        <View style={{ flex: 0.65 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.CountryName}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerAgent.png')} style={{ height: '100%', width: '100%',marginLeft:0 }} />
                        </View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Agent} </Text></View>
                        <View style={{ flex: 0.65 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.AgentName}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                            <Image source={require('../images/MutamerStatus.png')} style={{ height: '100%', width: '100%',marginLeft:0 }} />
                        </View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.65 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Status}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/7.png')} style={{ height: '100%', width: '100%',marginLeft:0 }} />
                        </View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Amount} </Text></View>
                        <View style={{ flex: 0.65 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.TotalVoucherAmount}</Text></View>
                    </View>

                </View>
                <View style={{flex:0.15}}>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <View>
                    {(user.lang == 'ar') && <Image style={{width:50,height:50}} source={ require('../images/back.png')}/>}
                    {(user.lang == 'en-US') && <Image style={{width:50,height:50}} source={ require('../images/Details.png')}/>}
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
        flex:1,
        flexDirection:'row',
        borderColor: '#bbb',
        borderBottomWidth: 1,

      },
      info: {
        padding: 10,
        backgroundColor: '#fff',
        color:'#000',
        flex:0.85
      }
});

export default VoucherItem;