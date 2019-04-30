import React from 'react';
import {View , Text, StyleSheet,FlatList} from 'react-native';
import InboxItem from './InboxItem'
import user from "../data/userLanguage";
import ajax from '../ajax';

class InboxList extends  React.Component {
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
            renderItem={({item}) => <InboxItem deal={item} onPress={this.props.onItemPress}/>}
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
        if (
            (!user.alllastPageInbox && this.props.inboxType == 2) ||
            (!user.readlastPageInbox && this.props.inboxType == 1) ||
            (!user.unreadlastPageInbox && this.props.inboxType == 0) 
            ) {
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
            const deals = await ajax.fetchInboxDetails(user.InboxType,this.state.Page,this.props.inboxType,(user.lang == 'ar'));
                if (this.props.inboxType == 0)
                    user.unreadlastPageInbox = deals.lastPage;
                if (this.props.inboxType == 1)
                    user.readlastPageInbox = deals.lastPage;
                if (this.props.inboxType == 2)
                    user.alllastPageInbox = deals.lastPage;
           
         //alert(user.lastPageMutamer);
         for (var i = 0; i < deals.Details.length; i++) {
                deals.Details[i].key = deals.Details[i].Id + "";
            }
            this.FlatListData = [...this.FlatListData, ...deals.Details];

        this.setState({ isFetching: false });


        //alert(JSON.stringify(this.FlatListData.length,null,4));
    }
    async getApiData(){
        const deals = await ajax.fetchInboxDetails(user.InboxType,1,this.props.inboxType,(user.lang == 'ar'));
        for (var i = 0; i < deals.Details.length; i++) {
            deals.Details[i].key = deals.Details[i].Id + "";
        }
        this.FlatListData = deals.Details;
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

export default InboxList;