import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Accordion, Icon } from 'native-base';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';
import RNFetchBlob from 'rn-fetch-blob';
import InboxProfile from '../data/InboxData';
import Toast, { DURATION } from 'react-native-easy-toast';



class InboxItem extends React.Component {
    handlePress = () => {
        this.props.onPress(this.props.deal.key);
    };
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = { showLoading: true, fieldLoading: true, AccordionKey: -1 };
        this.ExpandedItem = -1;
        this.dataArray = [];
        this.dataArray.push({ title: this.props.deal });
        this.loadedViews = [];
        this.boxCnt = 5;
        this.selectedItem = null;
    }
    _renderHeader(item, expanded) {
        return (
            <View style={[styles.accordionHeader2, item.title.Readed ? { backgroundColor: '#FEFEFE' } : { backgroundColor: '#E4E8F0' }]}>
                <View style={{ flex: .15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={InboxProfile.find(x => x.id == user.InboxType).url} style={{ height: 55, width: 55 }} />
                </View>
                <View style={{ flex: .7 }}>
                    <View>
                        <Text style={{ fontWeight: "600", color: '#204677' }}>
                            {" "}{item.title.Subject.substring(0, 50)}...
                    </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 0.05, marginTop: 2 }} >
                            <Icon ios='ios-person' android="md-person" style={{ fontSize: 10, color: '#3389DB' }} />
                        </View>
                        <Text style={{ fontWeight: "600", color: '#3389DB', fontSize: 10, flex: 0.95 }}>
                            {" "}{item.title.FromUser} | {item.title.SentOn}
                        </Text>
                    </View>

                </View>
                <View style={{ flex: .15, justifyContent: 'center', alignItems: 'center' }}>
                    {expanded
                        ? <Image source={require('../images/inbox-09.png')} style={{ height: 35, width: 35 }} />
                        : <Image source={require('../images/inbox-10.png')} style={{ height: 35, width: 35 }} />}
                </View>
            </View>
        );
    }
    _renderContent = (item) => {
        return (
            <View style={{ marginHorizontal: 10, marginTop: 3 }}>
                <View style={[styles.accordionContent2, { backgroundColor: '#F3F3F3' }]}>
                    <Text>{" "}{item.title.Subject}</Text>
                    <TouchableOpacity onPress={() => {
                        this.download(item.title.AttachedFileUrl);
                    }}><View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 50, marginTop: 20, alignItems: 'center', backgroundColor: '#12467B', padding: 5, marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#fff', flex: 0.8 }}>Download File</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    download(url) {
        let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/pdfurl-guide.pdf';
        RNFetchBlob
            .config({
                addAndroidDownloads: {
                    useDownloadManager: true,
                    mime: 'application/pdf',
                    mediaScannable: true,
                    notification: true,
                    overwrite: true,
                    path: RNFetchBlob.fs.dirs.DownloadDir + "/download.pdf"
                }
            })
            .fetch('GET', url)
            .then((resp) => {
                //this.refs.toast.show('File Downloaded Successfully', DURATION.LENGTH_LONG);
            })
            .catch(() => {
               // this.refs.toast.show('Please Confirm your download source', DURATION.LENGTH_LONG);
            })
    }
    render() {
        const { deal } = this.props;
        return (
            <View>
                <Accordion
                    dataArray={this.dataArray}
                    animation={true}
                    key={this.state.AccordionKey}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    expanded={this.ExpandedItem}
                />
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#1E4276' }}
                    position='bottom'
                    positionValue={250}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={0.8}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, height: undefined, width: undefined
    },
    box: {
        width: 160,
        height: 130,
        margin: 5,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    accordionHeader: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        // borderBottomColor: expanded
        //     ? '#FFF' : '#FFF'
    },
    accordionHeader2: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 8
    },
    accordionContent2: {
        borderWidth: 1,
        borderRadius: 3,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderColor: '#ddd',
        borderTopWidth: 0,
        shadowColor: '#A3A3A3',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: -10,
        marginBottom: 8,
        padding: 10
    }
});

export default InboxItem;