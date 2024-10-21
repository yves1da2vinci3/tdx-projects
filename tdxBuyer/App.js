
import { StyleSheet, Text, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'
import Colors from './Constants/Colors';
import { Icon } from '@rneui/base';
import tw from 'twrnc'

import BasketProvider from './Context/Basket';
import AuthProvider from './Context/AuthContext';

import AppNavigator from './Navigators/AppNavigator';
export default function App() {
  return (
   <AuthProvider>

<BasketProvider>


<ToastProvider  renderToast={(toastOptions) => <View style={tw `h-17   shadow   border-l-[${ toastOptions.type === "success"? Colors.greenColor : Colors.redColor}] border-l-8 min-w-70 flex  px-3 justify-center rounded-lg bg-white pl-4  `}><Text style={tw `font-semibold `}> {toastOptions.message}</Text></View> }  dangerIcon={<Icon color="white" type="ionicon" name="alert-circle" /> }   > 
<AppNavigator />
  
</ToastProvider>
</BasketProvider>
</AuthProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
