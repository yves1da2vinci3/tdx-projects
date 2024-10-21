import React, { Component, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Share,
  Pressable,
  ScrollView
} from 'react-native';
import Logo from '../../assets/Images/Logo.png'
import { Colors } from "../../Constants/Colors";
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { Icon } from '@rneui/base';
import { wp } from '../../helpers/Responsiveness';
import { AuthContext } from '../../Contexts/AuthContext';

const DATA = [
  {
    id: '1',
    title: 'Settings',
    iconName: "settings-outline",
  },
  {
    id: '2',
    title: 'Request A Call',
    iconName: "call-outline",

  },
  {
    id: '3',
    title: 'Report an issue',
    iconName: "pencil",

  },
  {
    id: '4',
    title: 'Help',
    iconName: "information-circle-outline",

  },
  {
    id: '5',
    title: 'Terms & Services',
    iconName: "reader-outline",

  },
  {
    id: '6',
    title: 'Logout',
    iconName: "log-out-outline",

  },
];


function Content(props) {
  const { logout } = useContext(AuthContext)
  const Navigate = useNavigation()
//   const {logout} = useContext(AuthContext)
  function navigate  (item) {
    if (item.id === '1') {
      // this.props.navigatioFunction n.navigate("HomeStack")
      // this.props.navigation.navigate("HomeStack")
      props.navigation.navigate("account");
    }
    else if (item.id === "2") {
      // props.navigation.navigate("BinStack")
      props.navigation.navigate("requestCall");
    }
    else if (item.id === "3") {
      props.navigation.navigate('reportIssue');

      // this.props.navigation.navigate('DrawerStack', { screen: 'Store' });
    }
    else if (item.id === "4") {
      console.log("nothing")
    }
    else if (item.id === "5") {
console.log("nothing")
    }
    else if (item.id === "6") {
      logout()
      // Navigate.navigate('signin')
    }
    else if (item.id === "7") {
      // this.props.navigation.closeDrawer()
      // this.props.navigation.navigate('DrawerStack', { screen: 'Orders' });
    }
    else {
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4),paddingTop : 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: wp(5) }}>
          <Pressable onPress={() => props.navigation.closeDrawer()}>
            <Icon type='ionicon' name='arrow-back-outline' />
          </Pressable>
          <Image source={Logo} style={{ width: wp(42), height: wp(16), resizeMode: "contain", marginLeft: wp(9) }} />
        </View>



        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          extraData={DATA}
          style={{ marginTop: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10, marginHorizontal:wp(1) }}>
              <Pressable style={{
                flexDirection: "row", backgroundColor: "#EEEEEE", paddingHorizontal: 4, justifyContent: "space-between",
                alignItems: "center", paddingVertical: 12, borderRadius: 9
              }}
                onPress={() => navigate(item)}
              >
                <View style={tw `flex items-center pl-4 flex-row`}>
                    <Icon type='ionicon' name={item.iconName} /> 
                  <Text style={tw `mx-4`} >{item.title}</Text>
                </View>
              </Pressable>
            </View>
          )} />
      </View>
  )
}

export default Content


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  drawerbg: {
    width: 280,
    height: 230
  },
  dp: {

    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#000'
  },
  text: {
    color: '#6D6D6D',
    position: 'absolute',
    bottom: 37,
    left: 20,
    fontSize: 20
  },
  text2: {
    color: '#6D6D6D',
    position: 'absolute',
    bottom: 12,
    left: 20,
    fontSize: 17
  },
  subConatainer: {
    marginLeft: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 60
  },
  drawerIcon: {
    // marginLeft: 50,
    height: 28,
    width: 28,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: "center",
  }
});