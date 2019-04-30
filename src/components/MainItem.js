import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground,AsyncStorage,TouchableOpacity } from 'react-native';
import { icon, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';
import GroupProfile from '../data/GroupsData';
import MutamerProfile from '../data/MutamersData';
import TafweejProfile from '../data/TafweejData';
import VoucherProfile from '../data/VouchersData';

class MainItem extends React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
    };
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.GroupDescriptions = [];
        this.GroupUrls = [...GroupProfile,...MutamerProfile,...TafweejProfile];
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
    render() {
        const { deal } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <ImageBackground
                    source={require('../images/mainIcon.png')} style={styles.box}>
                    {(deal.ItemType == 'Group') && <View style={{ justifyContent: 'center', flex: 0.2,marginHorizontal:10 }}>
                      { (GroupProfile.find(x=>x.id == deal.Id ) != null) && <Image
                            source={GroupProfile.find(x=>x.id == deal.Id).url} style={{ height: 65, width: 65 }} />}
                       { (GroupProfile.find(x=>x.id == deal.Id ) == null) && <Image
                            source={GroupProfile.find(x=>x.id == 'other').url} style={{ height: 65, width: 65 }} />}
                    </View>}
                    {(deal.ItemType == 'Group') && <View style={styles.progress}>
                        <Text style={styles.label}>{deal.Name}</Text>
                        { (GroupProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) != null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?GroupProfile.find(x=>x.id == deal.Id).descAr:GroupProfile.find(x=>x.id == deal.Id).descrEn}
                            </Text>}
                        { (GroupProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) == null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?GroupProfile.find(x=>x.id == 'other').descAr:GroupProfile.find(x=>x.id == 'other').descrEn}
                        </Text>}
                    </View>}

                    {(deal.ItemType == 'Mutamer') && <View style={{ justifyContent: 'center', flex: 0.2,marginHorizontal:10 }}>
                      { (MutamerProfile.find(x=>x.id == deal.Id ) != null) && <Image
                            source={MutamerProfile.find(x=>x.id == deal.Id).url} style={{ height: 65, width: 65 }} />}
                       { (MutamerProfile.find(x=>x.id == deal.Id ) == null) && <Image
                            source={MutamerProfile.find(x=>x.id == 'other').url} style={{ height: 65, width: 65 }} />}
                    </View>}
                    {(deal.ItemType == 'Mutamer') && <View style={styles.progress}>
                        <Text style={styles.label}>{deal.Name}</Text>
                        { (MutamerProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) != null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?MutamerProfile.find(x=>x.id == deal.Id).descAr:MutamerProfile.find(x=>x.id == deal.Id).descrEn}
                            </Text>}
                        { (MutamerProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) == null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?MutamerProfile.find(x=>x.id == 'other').descAr:MutamerProfile.find(x=>x.id == 'other').descrEn}
                        </Text>}
                    </View>}

                    {(deal.ItemType == 'Tafweej') && <View style={{ justifyContent: 'center', flex: 0.2,marginHorizontal:10 }}>
                      { (TafweejProfile.find(x=>x.id == deal.Id ) != null) && <Image
                            source={TafweejProfile.find(x=>x.id == deal.Id).url} style={{ height: 65, width: 65 }} />}
                       { (TafweejProfile.find(x=>x.id == deal.Id ) == null) && <Image
                            source={TafweejProfile.find(x=>x.id == 'other').url} style={{ height: 65, width: 65 }} />}
                    </View>}
                    {(deal.ItemType == 'Tafweej') && <View style={styles.progress}>
                        <Text style={styles.label}>{deal.Name}</Text>
                        { (TafweejProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) != null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?TafweejProfile.find(x=>x.id == deal.Id).descAr:TafweejProfile.find(x=>x.id == deal.Id).descrEn}
                            </Text>}
                        { (TafweejProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) == null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?TafweejProfile.find(x=>x.id == 'other').descAr:TafweejProfile.find(x=>x.id == 'other').descrEn}
                        </Text>}
                    </View>}
                    {(deal.ItemType == 'Voucher') && <View style={{ justifyContent: 'center', flex: 0.2,marginHorizontal:10 }}>
                      { (VoucherProfile.find(x=>x.id == deal.Id ) != null) && <Image
                            source={VoucherProfile.find(x=>x.id == deal.Id).url} style={{ height: 65, width: 65 }} />}
                       { (VoucherProfile.find(x=>x.id == deal.Id ) == null) && <Image
                            source={VoucherProfile.find(x=>x.id == 'other').url} style={{ height: 65, width: 65 }} />}
                    </View>}
                    {(deal.ItemType == 'Voucher') && <View style={styles.progress}>
                        <Text style={styles.label}>{deal.Name}</Text>
                        { (VoucherProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) != null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?VoucherProfile.find(x=>x.id == deal.Id).descAr:VoucherProfile.find(x=>x.id == deal.Id).descrEn}
                            </Text>}
                        { (VoucherProfile.find(x=>x.id == deal.Id && x.ItemType == deal.ItemType) == null) && <Text style={styles.Desc}>
                        {(user.lang == 'ar')?VoucherProfile.find(x=>x.id == 'other').descAr:VoucherProfile.find(x=>x.id == 'other').descrEn}
                        </Text>}
                    </View>}
                    <View style={{ flex: 0.28, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                         <Text style={{ fontSize: 39 }}>{deal.Count}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            
        );
    }
}

const styles = StyleSheet.create({
    box:{
        width:350,
        height:105,
        margin:5,
        // justifyContent:'space-between',
        flex:1,
        flexDirection:'row',
    },
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
        flex: 0.8
    },
    backgroundImage: {
        flex: 1, height: undefined, width: undefined
    },
    progress:{
        flex:0.52,
        flexDirection:'column',
    },
    label:{
        color:'#000',
        marginTop:10,
        width:null,
        paddingRight:0,
        paddingLeft:0,
        fontSize:14,
        fontWeight:'900'
    },
    Desc:{
        color:'#000',
        marginTop:10,
        width:null,
        paddingRight:0,
        paddingLeft:0,
        fontSize:11
    }
});

export default MainItem;