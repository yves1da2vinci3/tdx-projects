import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { useToast } from 'react-native-toast-notifications'
import { httpClient } from '../../apis/Api'
import Loader from '../../Components/Loader'
import { wp} from '../../helpers/Responsiveness'
const VerficationCode = (props) => {
    const [otpValue,setOtpValue] = useState("")
    const navigation = useNavigation()
    const [isLoading,setIsLoading] =useState(false)
    useEffect(()=>{
        navigation.setOptions({title : 'Verification code',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
        ,      })
        },[])
        const toast = useToast()
        const verifyOTPcode = async () => {
            if (otpValue.length < 4) {
                toast.show("Please Enter OTP Code", {
                    type: "custom",
                    dangerColor :`${Colors.redColor}`,
                    placement: "bottom",
                    duration: 2500,
                    offset: 60,
                    animationType: "slide-in",
                  })
            }
            else {
                setIsLoading(true)
                try {
                   const response =   await httpClient.post('/api/users/verifyCodeByContent',{content :  otpValue})
                   props.navigation.navigate("newpassword", { userId: response.data.userId })
                    setIsLoading(false)
                } catch (error) {
                    toast.show("OTP Code not found", {
                        type: "custom",
                        dangerColor :`${Colors.redColor}`,
                        placement: "bottom",
                        duration: 2500,
                        offset: 60,
                        animationType: "slide-in",
                      })
                    setIsLoading(false)
                    console.log(error)
                }
            
            }
        }
  return (
    <View style={tw `relative flex flex-1 bg-white p-4`}>
      <View style={{ width: "auto", alignSelf: "center", marginTop: 10 }}>
                    <CodeField
                        // ref={useBlurOnFulfill({value: otp, cellCount: 6})}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={otpValue}
                        onChangeText={(txt) => setOtpValue(txt)}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            // onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                </View>
      <Text style={tw`text-[${Colors.black}] text-center mt-8`}>didn't receive the code ? clik the button below</Text>
                
      <TouchableOpacity onPress={()=> resendOTPcode()}  style={ tw `  self-center bg-[${Colors.greenColor}] h-14 mt-8 flex justify-center items-center  w-45`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >resend the code</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> verifyOTPcode()}  style={ tw ` absolute bottom-8 self-center bg-[${Colors.greenColor}] h-14 mt-36 flex justify-center items-center rounded-lg w-full`} >
        <Text style={tw `capitalize text-white text-xl font-semibold`} >Continue</Text>
      </TouchableOpacity>
      <Loader isLoading={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    codeFieldRoot: { marginTop: 10, },
    cell: {
        width: wp(12),
        height: 45,
        fontSize: 20,
        borderWidth: 1,
        marginHorizontal : 10,
        borderColor: Colors.greenColor,
        textAlign: 'center',
        borderRadius: 5,
        color: Colors.black,
       display : "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        paddingTop: 12
    },
    focusCell: {
        borderColor: Colors.greenColor,
        color: Colors.greenColor,
    },

})

export default VerficationCode