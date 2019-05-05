import React from 'react';
import {View , Text, StyleSheet,FlatList} from 'react-native';
import AgentItem from './AgentItem'
import user from "../data/userLanguage";
import ajax from '../ajax';

class AgentList extends  React.Component {
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
            renderItem={({item}) => <AgentItem deal={item} onPress={this.props.onItemPress}/>}
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
        if (!user.lastPageAgent) {
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
            const deals = await ajax.fetchDetailedAgent(this.state.Page,(user.lang == 'ar'),user.selectedAgentYear,user.selectedAgentCountry,user.selectedAgentId);
                
                user.lastPageAgent = deals.lastPage;
           
         for (var i = 0; i < deals.Agents.length; i++) {
                deals.Agents[i].key = deals.Agents[i].Id + "";
            }
            this.FlatListData = [...this.FlatListData, ...deals.Agents];
            this.props.onMore();
        this.setState({ isFetching: false });


        //alert(JSON.stringify(this.FlatListData.length,null,4));
    }
    async getApiData(){
        const deals = await ajax.fetchDetailedAgent(1,(user.lang == 'ar'),user.selectedAgentYear,user.selectedAgentCountry,user.selectedAgentId);
        for (var i = 0; i < deals.Agents.length; i++) {
            deals.Agents[i].key = deals.Agents[i].Id + "";
        }
        this.FlatListData = deals.Agents;
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

export default AgentList;