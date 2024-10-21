import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import tdxlogo from '../../../assets/Images/Logo.png'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

const UserHome = (props) => {

  return (
    <View style={tw `flex-1 pt-10  bg-gray-50`} >
        <View style={tw `self-center flex items-center flex-row`} >
        <Image source={tdxlogo} style={tw `h-24 w-24  `} />   

        </View>
        <Text style={tw `text-xl text-center font-medium`} >Choose your commodity</Text>

<View style={tw `flex-row flex-1 flex-wrap  flex p-4`} >
    <TouchableOpacity onPress={()=> props.navigation.navigate("aggregation",{commodityId: 1401,commodityName :"Soya Beans"})} style={tw ` m-4 h-36 w-36 shadow bg-white flex  justify-center items-center`} >
        <Image source={{ uri : "https://static.vecteezy.com/system/resources/thumbnails/006/692/267/small/soy-beans-peas-line-icon-template-black-color-editable-soy-beans-peas-line-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg"}} style={tw `h-20 w-20`}  />
        <Text style={tw `text-xl text-center font-medium`} >Soya Bean</Text>
        
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> props.navigation.navigate("aggregation",{commodityId: 2})} style={tw ` m-4 h-36 w-36 shadow bg-white flex  justify-center items-center`} >
        <Image source={{ uri : "https://img.freepik.com/vecteurs-premium/icone-mais-icone-epi-mais-symbole-vegetal-dans-style-glyphe-produit-frais-ferme_288189-659.jpg"}} style={tw `h-20 w-20`}  />
        <Text style={tw `text-xl text-center font-medium`} >Maize</Text>
        
    </TouchableOpacity>
    <View style={tw ` m-4 h-36 w-36 shadow bg-white flex  justify-center items-center`} >
        <Image source={{ uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDSxh_cDpfN2NeWNE8opPXd0lXfgBcRgt0SnBMw-15g&s"}} style={tw `h-20 w-20`}  />
        <Text style={tw `text-xl text-center font-medium`} >Rice</Text>
        
    </View>
</View>
        
    </View>
  )
}

export default UserHome