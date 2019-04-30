/** @format */
import React from 'react';
import {AppRegistry,View,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
import { Icon } from 'native-base';
import App from './src/components/LoadPage';
import App2 from './src/components/PreparePage';
import Login from './src/components/LoginPage';
import MainScreen from './src/components/MainPage';
import Mo3tamereenScreen from './src/components/Mo3tamereen';
import TafweejScreen from './src/components/Tafweej';
import VoucherScreen from './src/components/Voucher';
import GroupsScreen from './src/components/Groups';
import InboxScreen from './src/components/Inbox';
import TafweejListScreen from './src/components/TafweejListPage';
import VoucherListScreen from './src/components/VoucherListPage';
import AgentListScreen from './src/components/AgentListPage';
import Mo3tamereenListScreen from './src/components/Mo3tamereenList';
import Mo3tamereenSearchListScreen from './src/components/Mo3tamereenSearchList';
import VoucherSearchListScreen from './src/components/VoucherSearchListPage';
import TafweejSearchScreen from './src/components/TafweejSearch';
import VoucherSearchScreen from './src/components/VoucherSearch';
import AgentSearchScreen from './src/components/AgentSearch';
import Mo3tamerSearchScreen from './src/components/Mo3tamerSearch';
import GroupSearchScreen from './src/components/GroupSearch';
import GroupsListScreen from './src/components/GroupsList';
import AllInboxDetailsScreen from './src/components/AllInboxDetails';
import ReadInboxDetailsScreen from './src/components/ReadInboxDetails';
import UNReadInboxDetailsScreen from './src/components/UNReadInboxDetails';
import GroupsSearchListScreen from './src/components/GroupsSearchList';
import Mo3tamerDetailsScreen from './src/components/Mo3tamerDetails';
import TafweejDetailsScreen from './src/components/TafweejDetails';
import VoucherDetailsScreen from './src/components/VoucherDetails';
import ReportSearchScreen from './src/components/ReportSearch'
import ReportSearchListScreen from './src/components/ReportSearchList'
import {name as appName} from './app.json';
import { createStackNavigator,createMaterialTopTabNavigator, createAppContainer,createDrawerNavigator, SafeAreaView } from 'react-navigation';
import Drawer from './src/components/Drawer';
import LocalizedStrings from 'react-native-localization';
import user from './src/data/userLanguage';
import Langs from './src/components/LangPage';
import Language from './src/components/LanguagePage';

const CustomerDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
  <Drawer {...props} />
  </SafeAreaView>
  </ScrollView>
)
let strings = new LocalizedStrings({
  "en-US":{
    how:"How do you want your egg today?",
  },
  en:{
    how:"How do you want your egg today?"
  },
  it: {
    how:"Come vuoi il tuo uovo oggi?"
  }
 });
 let lang = strings.getInterfaceLanguage();
 //alert(lang);
 if (lang.substring(0,2) == 'ar')
    lang = 'ar';
  else
    lang = 'en-US'
user.defaultLang = lang;
//user.lang = await AsyncStorage.getItem('lang');
// if(user.lang == null)
//  user.lang = user.defaultLang;
 this.strings = new LocalizedStrings(user.words);
 this.strings.setLanguage(lang);
 export const Tabs = createMaterialTopTabNavigator({
  AllInboxDetailsScreen: {
    screen: AllInboxDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontFamily: 'GESS',fontSize:20 },
      headerTintColor: '#204677',
      headerLeft: <View></View>,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
          style={{ marginRight: 10 }}

        ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>),
      // tabBarLabel: this.strings.All,
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} />,
      tabStyle: {}
    }),

  },
  UNReadInboxDetailsScreen: {
    screen: UNReadInboxDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#D1D9E5',
      },
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontFamily: 'GESS',fontSize:20 },
      headerTintColor: '#204677',
      headerLeft: <View></View>,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
          style={{ marginRight: 10 }}

        ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>),
      // tabBarLabel: this.strings.Unread,
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} />,
      tabStyle: {}
    }),

  },
  ReadInboxDetailsScreen: {
    screen: ReadInboxDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#000',

      },
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontFamily: 'GESS',fontSize:20 },
      headerTintColor: '#204677',
      headerLeft: <View></View>,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
          style={{ marginRight: 10 }}

        ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>),
      // tabBarLabel: this.strings.Read,
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} />,
      tabStyle: {}
    }),

  }
}, {
    tabBarOptions: {
      activeBackgroundColor: '#000',
      labelStyle: {
        fontSize: 16,
        fontWeight:'500',
        color:'#204677',
        backgroundColor: '#D1D9E5',
        //borderRadius: 8,
        padding: 0,
        margin: 0,
        fontFamily: 'GESS'
      },
      style: {
        backgroundColor: '#D1D9E5'
      },
      indicatorStyle:{
        backgroundColor:'#204677'
      },
    }
  });
export const myApp =createStackNavigator({
    LoadScreen: {
      screen: App,
      navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    LangScreen: {
      screen: Langs,
      navigationOptions: {
        header: null
      }
    },
  screen: createDrawerNavigator({
  HomePage: {
    screen: createStackNavigator({
      PrepareScreen: {
        screen: App2,
        navigationOptions: {
          header: null
        }
      },
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          title: (user.lang == 'ar')?'التفاصيل':'Details',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            fontWeight: "200",
            flex: 1,
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerStyle: {
            backgroundColor: '#204677',
          },
          
        }
      },
      MainScreen: {
        screen: MainScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            //marginLeft:-50
          },
          
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamereenScreen: {
        screen: Mo3tamereenScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamereenListScreen: {
        screen: Mo3tamereenListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamereenSearchListScreen: {
        screen: Mo3tamereenSearchListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      ReportSearchListScreen: {
        screen: ReportSearchListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      TafweejScreen: {
        screen: TafweejScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      LanguageScreen: {
        screen: Language,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      VoucherScreen: {
        screen: VoucherScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      TafweejListScreen: {
        screen: TafweejListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      VoucherListScreen: {
        screen: VoucherListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      AgentListScreen: {
        screen: AgentListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      GroupsScreen: {
        screen: GroupsScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      InboxScreen: {
        screen: InboxScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10 }}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamereenSearchListScreen: {
        screen: Mo3tamereenSearchListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      
      VoucherSearchListScreen: {
        screen: VoucherSearchListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center' }}

          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      ReportSearchScreen: {
        screen: ReportSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10}}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      GroupSearchScreen: {
        screen: GroupSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamerSearchScreen: {
        screen: Mo3tamerSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      VoucherSearchScreen: {
        screen: VoucherSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      TafweejSearchScreen: {
        screen: TafweejSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      AgentSearchScreen: {
        screen: AgentSearchScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS',
            marginLeft:-50
          },
          headerLeft: <View>
             <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 10}}

            ><Icon ios='ios-menu' android="md-menu" style={{ fontSize: 30, color: 'white' }} />
            </TouchableOpacity>
        </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      GroupsListScreen: {
        screen: GroupsListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center'  }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      GroupsSearchListScreen: {
        screen: GroupsSearchListScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10,flex:0.5,height:50,alignItems:'center',textAlign:'center',justifyContent:'center'  }}
          >
          <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
          </View>,
          headerStyle: {
            backgroundColor: '#204677',
          }
        })
      },
      Mo3tamerDetailsScreen: {
        screen: Mo3tamerDetailsScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
        <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
      </View>,
          headerStyle: {
            backgroundColor: '#204677'
          }
        })
      },
      TafweejDetailsScreen: {
        screen: TafweejDetailsScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
        <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
      </View>,
          headerStyle: {
            backgroundColor: '#204677'
          }
        })
      },
      VoucherDetailsScreen: {
        screen: VoucherDetailsScreen,
        navigationOptions: ({ navigation }) => ({
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 22,
            marginTop: 5,
            textAlign: "center",
            flex: 1,
            fontWeight: "200",
            fontFamily: 'GESS'
          },
          headerLeft: <View>
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
        <View>
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{ fontSize: 25, color: 'white' }} />
          </View>
          </TouchableOpacity>
      </View>,
          headerStyle: {
            backgroundColor: '#204677'
          }
        })
      }
    })
  },
}, {
    initialRouteName: 'HomePage',
    contentComponent: CustomerDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloaseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerPosition: (lang == 'en-US')?"left":"right",
    drawerBackgroundColor: "red",
  })
    
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
AppRegistry.registerComponent(appName, () => createAppContainer(myApp));
