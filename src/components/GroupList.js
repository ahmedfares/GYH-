import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import GroupItem from './GroupItem';
import ajax from '../ajax';
import user from "../data/userLanguage";

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        //this.strings = new LocalizedStrings({ "ar": {}, "en-US": {} });
        //this.strings.setLanguage("ar");
        this.state = { isFetching: false, Page: 1 }
        this.FlatListData = this.props.deals;
    }

    handleLoadMore = () => {
        if (!user.lastPageGroup) {
            this.setState({ isFetching: true }, function() { 
            this.setState({ Page: this.state.Page + 1 },
                () => {
                    this.makeRemoteRequest();
                });

            });
        }
    }
    makeRemoteRequest = async () => {
        // alert(this.state.Page);
            const deals = await ajax.fetchSearchedGroups(user.selectedGroup,this.state.Page,(user.lang == 'ar'),user.selectedGroupName,
                user.selectedGroupCountryId,user.selectedGroupAgentId);
                user.lastPageGroup = deals.lastPage;
                
            for (var i = 0; i < deals.Groups.length; i++) {
                deals.Groups[i].key = deals.Groups[i].Id + "";
            }
            this.FlatListData = [...this.FlatListData, ...deals.Groups];
            this.props.onMore();
        this.setState({ isFetching: false });


        //alert(JSON.stringify(this.FlatListData.length,null,4));
    }
    goToDetailed(key) {
        alert(key);
    }
    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.FlatListData}
                    renderItem={({ item }) => <GroupItem deal={item} onPress={this.props.onItemPress} />}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.7}
                />
            </View>
        );
    }
    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getApiData() });
    }
    async getApiData() {
        //alert('refreshing');
        const deals = await ajax.fetchSearchedGroups(user.selectedGroup,1,(user.lang == 'ar'),user.selectedGroupName,
            user.selectedGroupCountryId,user.selectedGroupAgentId);
        for (var i = 0; i < deals.Groups.length; i++) {
            deals.Groups[i].key = deals.Groups[i].Id + "";
        }
        this.FlatListData = deals.Groups;
        this.setState({ isFetching: false });
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 40,
        color: 'black'
    }
});

export default GroupList;