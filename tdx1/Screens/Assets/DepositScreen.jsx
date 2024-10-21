import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc'
import Colors from '../../Constants/Colors'
import { Image } from '@rneui/themed';
import ModalDropdown from 'react-native-modal-dropdown';
import Loader from '../../Components/Loader';
import { useToast } from 'react-native-toast-notifications';
import { httpClient } from '../../apis/Api';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { ScrollView } from 'react-native';
const DepositScreen = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [transactionId,setTransactionId] = useState("")
  const [amount,setAmount] = useState("")
  const toast = useToast()
  const {user} = useContext(AuthContext)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({ uri : result.assets[0].uri,name: `bankdeposit_${user.id}_${Math.random()}.jpg`, type : result.assets[0].type});
    }
  };
  const navigation = useNavigation()
  useEffect(()=>{
      navigation.setOptions({title : 'Deposit',headerLeft: ()=>       <Icon onPress={()=> props.navigation.goBack()} size={30} type="ionicon" name='arrow-back-outline'  />
      ,      })
      },[])
  const [ selectedId,setSelectedId ] = useState(1)
  
//  make deposit

const SubmitTransation = async () => {
  if (selectedId === 1) {
      BankDeposit()
  } else {
      OtherTransation()
  }
}

const OtherTransation = async () => {

  if (amount === '') {
    toast.show(`Please enter the amount`, {
      type: "error",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  } else if (transactionId === '') {
    toast.show(`Please enter the transactionId`, {
      type: "error",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  } else {
      // toastRef.current.show('Hello!', 2500);
      let data = {}
      data["amount"] = Number(amount)
      data["type"] = selectedId
      data["transactionId"] = Number(transactionId)
      data["userId"] = user.id
      try {
          setisLoading(true)
          const config = {
              headers: {
                  'Accept': 'application/json',
              },
            }
        await  httpClient.post("/api/users/deposit/",data,config)
        setisLoading(false)
        toast.show(`deposit successfully added`, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 60,
          animationType: "slide-in",
        })
        props.navigation.navigate("userAssets")
      } catch (error) {
          console.log(error)
        setisLoading(false)
      }
      setAmount('')
      setTransactionId("")
  }
}

const BankDeposit = async () => {

  if (amount === '') {
    toast.show(`Please enter the amount`, {
      type: "error",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  } else if (image === '') {
    toast.show(`Please pick an image`, {
      type: "error",
      placement: "bottom",
      duration: 4000,
      offset: 60,
      animationType: "slide-in",
    })
  } else {
      // toastRef.current.show('Hello!', 2500);
      let data = {}
      const formData = new FormData()
      formData.append("amount",Number(amount))
      formData.append("userId",user.id)
      formData.append("file",image)
      formData.append("type",1)
      // alert(JSON.stringify(data))
      try {
          setisLoading(true)
          const config = {
              headers: {
                  'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            }
        await  httpClient.post("/api/users/deposit",formData,config)
        setisLoading(false)
        toast.show(`deposit successfully added`, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 60,
          animationType: "slide-in",
        })
        props.navigation.navigate("userAssets")
      } catch (error) {
          console.log(error)
        setisLoading(false)
      }
      setAmount('')
      setImage('')
  }

}
// Manage Dropdwon
const DisplayIcon = ({Status}) => {
  return (
    <View style={tw `flex-1  items-end `}>
      <Icon style={tw ``} type='ionicon' name={`caret-${Status? "up" : "down"}`}  />
       </View>
  )
}

    // Handle DropdownIcon
    const [depositDropStatus,setdepositDropStatus] = useState(false)
  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={tw `flex-1 bg-white p-2 `}>
      <Text style={tw `mt-7 text-gray-400 mb-4 font-semibold`}>Choose Deposit Type</Text>
      
     
                                <ModalDropdown  options={ ["Bank Deposit","MTN Mobile money","Wire Transfer"] } onSelect={(idx, DropDownItem) => {
        const selectedId = DropDownItem === "Bank Deposit" ? 1 : DropDownItem  === "MTN Mobile money" ? 2 : 3
        setSelectedId(selectedId)
      }}  showsVerticalScrollIndicator={false} renderRow={(option)=>(<View style={tw `flex-1   p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>)} onDropdownWillHide={()=> setdepositDropStatus(false)}  onDropdownWillShow={()=> setdepositDropStatus(true)} renderRightComponent={ ()=> <DisplayIcon Status={depositDropStatus} /> } dropdownStyle={tw`min-h-24 w-70  border-2  border-gray-100  rounded-lg `}  style={ tw `h-17 bg-[${Colors.TextInputBackgroundColor}] text-lg justify-center rounded-xl p-2`} textStyle={ { fontSize : 20 }} />
     
      <Text style={tw `mt-7 text-gray-400 font-semibold`}>Enter Amount Deposited/Transfered</Text>
     
    <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>
<Text style={tw `font-semibold text-lg mx-2  `}>{selectedId === 3 ? "$" : "GHS"}</Text>

          <TextInput onChangeText={(txt)=> setAmount(txt) } style={tw`flex-1 px-3 border-l-2`} keyboardType="number-pad" />
          </TouchableOpacity>

    {  selectedId !== 1 && <>
      <Text style={tw `mt-7 text-gray-400 font-semibold`}>Enter Transaction Id</Text>
     
    <TouchableOpacity  style={tw `h-15 bg-[#DEDEDE] mt-2 flex-row items-center flex px-3 justify-between rounded-lg w-full`}>

          <TextInput onChangeText={(txt)=> setTransactionId(txt) } style={tw`flex-1 px-3 `} keyboardType="number-pad" />
          </TouchableOpacity>
    </>  }
    

        {selectedId === 1 && <View style={tw `flex`}>
    <Text style={tw `mt-7 text-gray-400 font-semibold`}>Upload Pictures of Deposit slip /Confirmation Document</Text>
    {image && <Image source={{ uri: image.uri }} style={{ width: 180, height: 100,alignSelf: "center" }} />}
          <TouchableOpacity  onPress={()=> pickImage()}  style={ tw `bg-[#455154] h-14 mt-6 flex flex-row justify-center items-center rounded-lg w-full`} >
    <Icon  type='ionicon' name='cloud-upload-outline' color="white" />
        <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >Upload</Text>
      </TouchableOpacity>
        </View>  }

    
    <View style={tw `flex items-center  ${Image ?"mb-10" : "mb-0" } mt-10 md:mt-25 justify-center flex-row`}>
    <TouchableOpacity onPress={()=> props.navigation.goBack()}   style={ tw `bg-[#00000066] h-14 mt-6 flex flex-row justify-center items-center rounded-lg w-42`} >
    <Icon  type='ionicon' name='close-circle-outline' color="white" />
        <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >Cancel</Text>
      </TouchableOpacity>
    <TouchableOpacity  onPress={()=> SubmitTransation()}   style={ tw `bg-[#455154] h-14 mt-6 flex flex-row justify-center ml-4 items-center rounded-lg w-42`} >
    <Icon  type='ionicon' name='checkmark-circle-outline' color="white" />
        <Text style={tw `capitalize text-white text-xl font-semibold ml-3`} >submit</Text>
      </TouchableOpacity>
    </View>
    <Loader  isLoading={isLoading} />
    </ScrollView>
  )
}

export default DepositScreen