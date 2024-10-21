
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';
import DrawerNav from './Drawer/Drawer';
import AuthStack from './stack/AuthStack';
import OnboardingScreen from '../Screens/OnBoarding';
import { AuthContext } from '../Contexts/AuthContext';
import { HomeContext } from '../Contexts/HomeContext';
const AppNavigator = () => {
    const { isLogin} = useContext(AuthContext)
    const { FirstTime} = useContext(HomeContext)
  
    const Stack = createNativeStackNavigator()
  return (
 <>
  {FirstTime ?
                <OnboardingScreen />
                :
                <NavigationContainer
                    
                >
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {isLogin ?
                                <Stack.Screen name="Drawer" component={DrawerNav} />
                            :
                            <Stack.Screen name="AuthStack" component={AuthStack} />
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            }
 </>
  )
}

export default AppNavigator