import React, { useContext, useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity,StyleSheet } from 'react-native';
import orderIcon from '../assets/Images/using-phone.png'
import TradeIcon from '../assets/Images/exchange-rate.png'
import CommodotieIcon from '../assets/Images/commodity.png'
import Notification from '../assets/Images/notification.png'
import NewsIcon from '../assets/Images/application.png'
import tw from 'twrnc'
import Colors from '../Constants/Colors';
import { HomeContext } from '../Contexts/HomeContext';
const OnboardingScreen = (props) => {
  const { SetFirstTimeToFalse} = useContext(HomeContext)
  const [screen, setScreen] = useState(1);

  return (
    <View style={tw `flex-1 flex p-4 pt-20 relative bg-white justify-center items-center`}>
      
      {screen === 1 && (
        <View style={tw `flex-1`}>
          <View style={tw `w-80 h-80 bg-green-200 rounded-full self-center flex justify-center items-center`}>
          <Image source={orderIcon} style={tw`h-40 w-40`} />
          
          </View>
          <Text style={tw `text-2xl mt-8 mb-8 font-bold text-center`}>The most convenient app for Trading</Text>

            <Text style={tw `text-center text-lg font-semibold text-gray-700`}>
                        We are constantly improving our application and take into account the wishes of our users to keep you statisfied.
            </Text>
        </View>
      )}
      {screen === 2 && (
        <View style={tw `flex-1`}>
        <View style={tw `w-80 h-80 bg-green-200 rounded-full self-center flex justify-center items-center`}>
        <Image source={TradeIcon} style={tw`h-40 w-40`} />
        
        </View>
        <Text style={tw `text-2xl mt-8 mb-8 font-bold text-center`}>Discover a new way of trade</Text>

          <Text style={tw `text-center text-lg font-semibold text-gray-700`}>
                     Traderex offer you a new looking design
          </Text>
      </View>
      )}
      {screen === 3 && (
           <View style={tw `flex-1`}>
           <View style={tw `w-80 h-80 bg-green-200 rounded-full self-center flex justify-center items-center`}>
           <Image source={CommodotieIcon} style={tw`h-40 w-40`} />
           
           </View>
           <Text style={tw `text-2xl mt-8 mb-8 font-bold text-center`}>Your Commodities , The Most reliable Assets.</Text>
   
             <Text style={tw `text-center text-lg font-semibold text-gray-700`}>
                         Trading Commodities ,a sure way of making money.
             </Text>
         </View>
      )}
      {screen === 4 && (
           <View style={tw `flex-1`}>
           <View style={tw `w-80 h-80 bg-green-200 rounded-full self-center flex justify-center items-center`}>
           <Image source={Notification} style={tw`h-40 w-40`} />
           
           </View>
           <Text style={tw `text-2xl mt-8 mb-8 font-bold text-center`}>Track Your Actions</Text>
   
             <Text style={tw `text-center text-lg font-semibold text-gray-700`}>
                      You are going to notify for each action . 
             </Text>
         </View>
      )}
      {screen === 5 && (
           <View style={tw `flex-1`}>
           <View style={tw `w-80 h-80 bg-green-200 rounded-full self-center flex justify-center items-center`}>
           <Image source={NewsIcon} style={tw`h-40 w-40`} />
           
           </View>
           <Text style={tw `text-2xl mt-8 mb-8 font-bold text-center`}>Keep in Touch with the Trade World</Text>
   
             <Text style={tw `text-center text-lg font-semibold text-gray-700`}>
                       You are going to be aware of trade which occurs in the Market.
             </Text>
         </View>
      )}
      {/* options */}

<View style={tw`w-[90] self-center px-4 mr-4 absolute bottom-4`}>
<TouchableOpacity onPress={()=> screen !== 5 ? setScreen(screen+1) : SetFirstTimeToFalse() } style={ tw `bg-[${Colors.greenColor}] h-14 flex justify-center  items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >{ screen !== 5 ?"Next" : "sign in"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>SetFirstTimeToFalse()} style={ tw `bg-[#f5f5f5] h-14 mt-4 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-[${Colors.greenColor}] text-xl font-semibold`} >skip</Text>
      </TouchableOpacity>
</View>
      
    </View>
  );
};

const styles = StyleSheet.create ({
 
});

export default OnboardingScreen;