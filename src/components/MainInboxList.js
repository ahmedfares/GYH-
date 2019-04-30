import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MainInboxItem from './MainInboxItem';
import ajax from '../ajax';
import user from "../data/userLanguage";

class MainInboxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFetching: false, Page: 1 }
        this.FlatListData = this.props.deals;
        this
    }

    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.FlatListData}
                    renderItem={({ item }) => <MainInboxItem deal={item} iconNum={1} onPress={this.props.onItemPress} />}
                />
            </View>
        );
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

export default MainInboxList;