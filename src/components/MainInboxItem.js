import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage, TouchableOpacity } from 'react-native';
import { icon, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';
import InboxProfile from '../data/InboxData';
import MutamerProfile from '../data/MutamersData';
import TafweejProfile from '../data/TafweejData';
import VoucherProfile from '../data/VouchersData';

class MainInboxItem extends React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.Type);
    };
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.GroupDescriptions = [];
        this.strings.setLanguage(user.lang);
        this.state = {
            order: 1,
            userType: 0
        };
    }
    async componentDidMount() {
        this.state.userType = await AsyncStorage.getItem('userType');
        //alert(this.state.userType)
    }
    render() {
        const { deal } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <ImageBackground
                    source={require('../images/mainIcon2.png')} style={styles.box}>
                    <View style={{ justifyContent: 'center', flex: 0.2, marginHorizontal: 10 }}>
                        <Image
                            source={InboxProfile.find(x => x.id == deal.Type).url} style={{ height: 55, width: 55 }} />
                    </View>
                    <View style={styles.progress}>
                        <Text style={styles.label}>{deal.Name}</Text>
                        <Text style={styles.Desc}>
                            {(user.lang == 'ar') ? InboxProfile.find(x => x.id == deal.Type).descAr : InboxProfile.find(x => x.id == deal.Type).descrEn}
                        </Text>
                    </View>
                    <View style={{ flex: 0.08, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                        { deal.UnreadCount > 0 && <Text style={{ fontSize: 20,backgroundColor:'#AB2A28',color:'#fff',width:30,height:30,textAlignVertical:'center',textAlign:'center',borderRadius:15 }}>{deal.UnreadCount}</Text>}
                    </View>
                    <View style={{ flex: 0.08, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                    <Image
                            source={require('../images/inbox-07.png')} style={{ height: 55, width: 55 }} />
                      </View>
                </ImageBackground>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    box: {
        width: 350,
        height: 115,
        margin: 5,
        // justifyContent:'space-between',
        flex: 1,
        flexDirection: 'row',
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
    progress: {
        flex: 0.6,
        flexDirection: 'column',
    },
    label: {
        color: '#204677',
        marginTop: 10,
        width: null,
        paddingRight: 0,
        paddingLeft: 0,
        fontSize: 18,
        fontWeight: '900'
    },
    Desc: {
        color: '#000',
        marginTop: 10,
        width: null,
        paddingRight: 0,
        paddingLeft: 0,
        fontSize: 12
    }
});

export default MainInboxItem;