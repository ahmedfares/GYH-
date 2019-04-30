import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar
} from 'react-native';
import { Footer, FooterTab, Icon } from 'native-base';
import { VoucherDetailsScreen,TafweejSearchScreen } from '../ScreenNames/ScreenNames';
import LocalizedStrings from 'react-native-localization';
import ajax from '../ajax';
import user from "../data/userLanguage";
import VoucherList from './VoucherList';

export default class VoucherSearchListScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: (user.lang == 'ar')?'نتائج البحث':'Search Results',
              headerRight: <View style={{flex:1,flexDirection:'row'}}>
              {/* <TouchableOpacity
              onPress={() => state.params.handleSearch()}
              style={{ marginRight:10 ,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

            ><Icon ios='ios-search' android="md-search" style={{ fontSize: 25, color: 'white' }} />
            </TouchableOpacity> */}
            
        </View>,
        }
      }

      searchContents() {
        this.props.navigation.navigate(TafweejSearchScreen);
      }

    state = { deals: [],totalCnt:52348 };
    async componentDidMount() {
        this.props.navigation.setParams({ handleSearch: () => this.searchContents() })
        const deals = await ajax.fetchDetailedVoucher(-1,1,(user.lang == 'ar'),
        user.selectedVouchNo,user.selectedPayState,user.selectedCancelledVouch,
        user.selectedExpiredVouch,user.selectedVouchCountry,user.selectedVouchAgent,
        user.selectedByVouchDate,user.selectedByPaymentDate,user.selectedVouchFromDate,
        user.selectedVouchToDate);
        //alert(JSON.stringify(deals,null,4))
        user.lastPageTafweej = deals.lastPage;
        user.totalGroupsCount = deals.TotalCount;
        this.setState({totalCnt: deals.TotalCount});
        for (var i=0;i<deals.Vouchers.length;i++)
        {
          deals.Vouchers[i].key = deals.Vouchers[i].Id+"";
        }
        this.setState({ deals });
    }
    setCurrentDeal = (dealId) => {
        user.Voucher = this.state.deals.Vouchers.find(x=>x.Id == dealId);
        this.props.navigation.navigate(VoucherDetailsScreen);
      };
    render() {

        return (
            <View style={styles.container}>
                {(this.state.deals.Vouchers && this.state.deals.Vouchers.length > 0) ?
                    (<VoucherList deals={this.state.deals.Vouchers} onItemPress={this.setCurrentDeal}/>)
                    : (<View>
                      <ActivityIndicator animating={!this.state.deals.Vouchers} style={{ marginTop: 400 }} color="#1E4276" size="large" />
                  </View>)}
                {/* {(this.state.deals.Tafweejs && this.state.deals.Tafweejs.length > 0) && <Footer>
                    <FooterTab style={{backgroundColor:'#323232',justifyContent:'space-between'}}>
                            <Text style={{color:'#fff',fontSize:16}}>{this.strings.totalCnt}</Text>
                            <Text style={{color:'#fff',fontSize:16}}>{this.state.totalCnt}</Text>
                    </FooterTab>
                </Footer>} */}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 40,
        color: 'white'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        width: null,
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    header: {
        fontSize: 40,
        color: 'black'
    }
});