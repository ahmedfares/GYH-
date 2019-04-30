import React from 'react';
import {View , Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import {icon, Icon} from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

class TafweejItem extends  React.Component {
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
                        <View style={{ flex: 0.07 }}><Icon ios='ios-finger-print' android="md-finger-print" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.ID} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Id}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-person' android="md-person" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Name} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Name}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-calendar' android="md-calendar" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Date} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Date}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-briefcase' android="md-briefcase" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Status} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.Status}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-trending-up' android="md-trending-up" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.Type} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.TafweejType}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-pin' android="md-pin" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.fromCity} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.FromCity}</Text></View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                        <View style={{ flex: 0.07 }}><Icon ios='ios-jet' android="md-jet" style={{ fontSize: 20, color: '#204677' }}></Icon></View>
                        <View style={{ flex: 0.25 }}><Text style={{color: '#204677',textAlign:'left',marginLeft:10}}>{this.strings.toCity} </Text></View>
                        <View style={{ flex: 0.68 }}><Text style={{textAlign:'left',marginLeft:10}}>{deal.ToCity}</Text></View>
                    </View>
                    

                </View>
                <View style={{flex:0.15}}>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <View>
                    {(user.lang == 'ar') && <Image source={ require('../images/back.png')}/>}
                    {(user.lang == 'en-US') && <Image source={ require('../images/next.png')}/>}
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

export default TafweejItem;