import React from 'react';
import {View , Text, StyleSheet,FlatList} from 'react-native';
import ReportItem from './ReportItem'
import user from "../data/userLanguage";
import ajax from '../ajax';

class ReportList extends  React.Component {
    constructor(props) {
        super(props);
        //this.strings = new LocalizedStrings({ "ar": {}, "en-US": {} });
        //this.strings.setLanguage("ar");
        this.state = { isFetching: false, Page: 1 }
        this.FlatListData = this.props.deals;
    }
    goToDetailed(key){
        //alert(key);
    }
    render(){
        return(
            <View style={styles.list}>
            <FlatList
            data={this.FlatListData}
            renderItem={({item}) => <ReportItem deal={item} onPress={this.props.onItemPress}/>}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.9}
          />
            </View>
        );
    }
    onRefresh(){
        this.setState({ isFetching: true }, function() { this.getApiData() });
    }
    handleLoadMore = () => {
        if (!user.lastPageMutamer) {
            this.setState({ isFetching: true }, function() { 
            this.setState({ Page: this.state.Page + 1 },
                () => {
                //alert(this.state.Page);
                    this.makeRemoteRequest();
                });

            });
        }
    }
    makeRemoteRequest = async () => {
         //alert(this.state.Page);
            const deals = await ajax.fetchSearchedMutamers(user.selectedMutamer, this.state.Page,(user.lang == 'ar'), user.selectedMutamerName,
                user.selectedMutamerCountryId, user.selectedMutamerAgentId);
                
                user.lastPageMutamer = deals.lastPage;
           
         //alert(user.lastPageMutamer);
         for (var i = 0; i < deals.Mutamers.length; i++) {
                deals.Mutamers[i].key = deals.Mutamers[i].Id + "";
            }
            this.FlatListData = [...this.FlatListData, ...deals.Mutamers];
            this.props.onMore();
        this.setState({ isFetching: false });


        //alert(JSON.stringify(this.FlatListData.length,null,4));
    }
    async getApiData(){
        const deals = await ajax.fetchSearchedMutamers(user.selectedMutamer, 1,(user.lang == 'ar'), user.selectedMutamerName,
            user.selectedMutamerCountryId, user.selectedMutamerAgentId);
        for (var i = 0; i < deals.Mutamers.length; i++) {
            deals.Mutamers[i].key = deals.Mutamers[i].Id + "";
        }
        this.FlatListData = deals.Mutamers;
        this.setState({ isFetching: false });
    }
}

const styles = StyleSheet.create({
    list : {
        backgroundColor:'#eee',
        flex:1,
        width:'100%',
        paddingTop:15,
        backgroundColor:'#fff'
    },
    header: {
        fontSize:40,
        color:'black'
    }
});

export default ReportList;