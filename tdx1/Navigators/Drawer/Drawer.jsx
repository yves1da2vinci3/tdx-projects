import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Content from './DrawerContent';
import BottomNav from '../BottomNav';
import { wp } from '../../helpers/Responsiveness';
import RequestCall from '../../Screens/Drawer/RequestCall';
import ReportIssue from '../../Screens/Drawer/ReportIssue';
// import DrawerStack from '../Stack/DrawerStack';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true,
      drawerStyle: {
        width: wp(80),
        // swipeEnabled : false,
      }, }}
      // initialRouteName="MainScreen"
      // contentComponent={Content}
      swipeEdgeWidth={0}
      // EdgeWidth={0}
      // swipeEnabled={false}
      gestureEnabled={true}
      drawerContent={props => <Content {...props} />}>
      {/* <Drawer.Screen name="Splash" component={Splash} /> */}
      <Drawer.Screen options={{ headerShown: false }} name="BottomNav" component={BottomNav} />
      <Drawer.Screen name="requestCall" component={RequestCall} />
      <Drawer.Screen options={{ headerShown: true }} name="reportIssue" component={ReportIssue} />
    </Drawer.Navigator>
  );
}

