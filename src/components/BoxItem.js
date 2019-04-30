import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard,
    AsyncStorage, ImageBackground, ActivityIndicator, BackHandler, StatusBar
} from 'react-native';
import { Container, Header, Content, Item, Row, Accordion,Icon } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import user from "../data/userLanguage";
import LocalizedStrings from 'react-native-localization';

export default class BoxItem extends Component<{}> {
    constructor(props) {
        super(props);
        this.strings = new LocalizedStrings(user.words);
        this.strings.setLanguage(user.lang);
        this.state = {};
        this.iconUrls = [require('../images/icon1.png'),require('../images/icon2.png'),
                         require('../images/icon3.png'),require('../images/icon4.png')];
        this.colors = ['#204677','#F86241','#01D76B','#969696'];
    }
    render() {
        return (
            <ImageBackground
                        source={require('../images/boxIcon.png')} style={styles.box}>
                        <View style={{alignItems:'flex-start'}}>
                        <Image
                        source={this.iconUrls[this.props.iconNum]} style={{height:20,width:20,marginTop:15,marginLeft:15}} />
                        </View>
                        <View style={styles.progress}>
                            <View style={{paddingLeft:10}}>
                            {/* <ProgressCircle
                                percent={parseInt(parseInt(this.props.text)*100/parseInt(this.props.total))}
                                radius={35 + 2}
                                borderWidth={6}
                                color={this.colors[this.props.iconNum]}
                                shadowColor="#F9F9F9"
                                bgColor="#fff"
                                style={{overflow: 'hidden'}}
                            >
                                <Text style={{ fontSize: 18,textAlign:'center' }}>{this.props.text}</Text>
                            </ProgressCircle> */}
                        <AnimatedCircularProgress
                            size={85}
                            rotation={0}
                            width={10}
                            fill={parseInt(parseInt(this.props.text)*100/parseInt(this.props.total))}
                            tintColor={this.colors[this.props.iconNum]}
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="#F9F9F9" >
                            {
                                (fill) => (
                                    <Text style={{ fontSize: 16,textAlign:'center' }}>{this.props.text}</Text>
                                )
                            }
                            </AnimatedCircularProgress>
                            </View>
                            <Text style={styles.label}>{this.props.label}</Text>
                        </View>
                    </ImageBackground>
        );
    };
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, height: undefined, width: undefined
    },
    box:{
        width:160,
        height:130,
        margin:5,
        justifyContent:'space-between',
        flex:1,
        flexDirection:'row',
    },
    progress:{
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
        flexDirection:'column',
    },
    label:{
        color:'#000',
        textAlign:'center',
        width:100,
        paddingRight:0,
        paddingLeft:0,
        fontSize:11
    }
});