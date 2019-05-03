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
                        <View style={{ flex: 0.9 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.Name != null && deal.Name != '')?deal.Name:this.strings.NoData}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.1 }}>
                        <Image source={require('../images/MutamerStatus.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ flex: 0.2 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.7 }}><Text style={{textAlign:'left',marginLeft:10}}>{this.Status.substring(1,30)}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{flex:0.5}}>

                        <View style={{ flex: 0.07 }}><Icon ios='ios-finger-print' android="md-finger-print" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.22 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.71 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.Id != null && deal.Id != '')?deal.PassportNo:this.strings.NoData}</Text></View>
                  
                        </View>
                        <View style={{flex:0.5}}>
                        
                        <View style={{ flex: 0.07 }}><Icon ios='ios-finger-print' android="md-finger-print" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.22 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.71 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.Id != null && deal.Id != '')?deal.PassportNo:this.strings.NoData}</Text></View>
                        </View>
                        
                      </View>

                    

                    

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-briefcase' android="md-briefcase" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.22 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Agent} </Text></View>
                        <View style={{ flex: 0.71 }}><Text style={{textAlign:'left',marginLeft:10}}>{(deal.AgentName != null && deal.AgentName != '')?deal.AgentName:this.strings.NoData}</Text></View>
                    </View>

                </View>
                <View style={{flex:0.1}}>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <View>
                    {(user.defaultLang == 'ar') && <Image source={ require('../images/back.png')}/>}
                    {(user.defaultLang == 'en-US') && <Image source={ require('../images/next.png')}/>}
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