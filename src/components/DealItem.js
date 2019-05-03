import React from 'react';
import {View , Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import {icon, Icon} from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

class DealItem extends  React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
      };
      constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.Status = JSON.stringify(this.props.deal.Status);
    }
    render(){
        const { deal} = this.props;
        return(
            <TouchableOpacity onPress={this.handlePress} style={styles.deal}>
            {/* <Image source={{ uri: deal.media[0] }} style={styles.image} /> */}
                <View style={styles.info}>
                
                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerName.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.9 }}><Text style={{textAlign:'left',marginLeft:10,fontSize:12}}>{(deal.Name != null && deal.Name != '')?deal.Name:this.strings.NoData}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerStatus.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.2 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.7 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.Status.substring(1,30)}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems:'center', paddingBottom: 10 }}>
                        <View style={{flex:0.62,flexDirection:'row',borderRightWidth:1,borderRightColor:'#aaa',alignItems:'center'}}>

                        <View style={{ flex: 0.18 }}>
                        <Image source={require('../images/MutamerPassport.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.45 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Passport} </Text></View>
                        <View style={{ flex: 0.37 }}><Text style={{textAlign:'left',marginLeft:5,fontSize:11}}>{(deal.Id != null && deal.Id != '')?deal.PassportNo:this.strings.NoData}</Text></View>
                  
                        </View>
                        <View style={{flex:0.38,flexDirection:'row', alignItems:'center'}}>

                        <View style={{ flex: 0.18 }}>
                        <Image source={require('../images/MutamerNum.png')} style={{ height: '100%', width: '100%',marginLeft:5 }} />
                        </View>
                        <View style={{ flex: 0.35 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.47 }}><Text style={{textAlign:'left',marginLeft:10,fontSize:11}}>{(deal.Id != null && deal.Id != '')?deal.Id:this.strings.NoData}</Text></View>
                        </View>
                        
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerAgent.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.2 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Agent} </Text></View>
                        <View style={{ flex: 0.7 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.AgentName != null && deal.AgentName != '')?deal.AgentName:this.strings.NoData}</Text></View>
                    </View>

                </View>
                <View style={{flex:0.1}}>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <View>
                    {(user.defaultLang == 'ar') && <Image source={ require('../images/back.png')}/>}
                    {(user.defaultLang == 'en-US') && <Image style={{width:50,height:50}} source={ require('../images/Details.png')}/>}
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
        flex:0.9
      }
});

export default DealItem;