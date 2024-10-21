import { View, Text } from 'react-native'
import React from 'react'
import ModalDropdown from 'react-native-modal-dropdown';
import tw from 'twrnc'
import { useState } from 'react';
import { Icon } from '@rneui/base';
import { Image } from 'react-native';
const DropDown = ({data,onSelect,bgColor,withDropdownImage,placeholder,shadow,shadowValue}) => {
    const [DropDownStatus,setDropDownStatus] = useState(false)

    function renderRow (option)  { 
        return <View style={tw `flex-1 justify-center  mt-2   h-12 border-gray-200 p-2`} >
        <Text style={tw `font-semibold`}>{option}</Text>
      </View>
     }
    function renderRowIcon (option)  { 
        return <View style={tw `flex-1  border-b-[0.2] flex-row items-center mt-2  h-12 border-gray-200 p-2`} >
           <View style={tw `mr-4`}>
           <Image source={{ uri : option.uri }} style={tw `h-8 w-8 rounded-full`} />  
            </View> 
          
        <Text style={tw `font-semibold`}>{option.value}</Text>
      </View>
     }
    function renderButtonTextIcon (option)  { 
        return <View style={tw `flex-1   flex-row items-center mt-2  h-12  p-2`} >
           <View style={tw `mr-4`}>
           <Image source={{ uri : option.uri }} style={tw `h-8 w-8 rounded-full`} />  
            </View> 
          
        <Text style={tw `font-semibold`}>{option.value}</Text>
      </View>
     }
     
  return (
    <View style={tw `h-15  flex-row border-1 ${bgColor ? bgColor === "white" ? "bg-white" : `bg-${bgColor}-100` : "bg-gray-100" }  border-[0.2] border-gray-200 px-2 ${shadow ? `shadow-${shadowValue ? shadowValue : "md"}` : "" }  items-center`}>
    <ModalDropdown  renderButtonText={(optionData)=> withDropdownImage ? renderButtonTextIcon(optionData) : renderRow(optionData) } defaultValue={placeholder ? placeholder : "please select..."} options={ data} onSelect={onSelect} showsVerticalScrollIndicator={false} renderRow={(option) => withDropdownImage ? renderRowIcon(option) : renderRow(option)} dropdownStyle={tw`min-h-10 w-70   shadow border-2 border-gray-100  `}  style={ tw `h-15   w-30    text-lg justify-center rounded p-2`}  textStyle={ { fontSize : 30 }}  
                   onDropdownWillHide={()=> setDropDownStatus(false)}
                   onDropdownWillShow={()=> setDropDownStatus(true)}
                   /> 
                      
<Icon type='ionicon' name={`caret-${ DropDownStatus ? "up" : "down"}`} />
                      </View>
  )
}

export default DropDown