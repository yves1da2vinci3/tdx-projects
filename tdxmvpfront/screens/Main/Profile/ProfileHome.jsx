import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, Divider, Icon } from '@rneui/base'
import tw from 'twrnc'
import { AuthContext } from '../../../Context/AuthContext'
const ProfileHome = (props) => {
  const {user,logout} = useContext(AuthContext)
  return (
    <View style={ tw `flex-1 relative bg-white pt-10`}>

     <View style={tw`flex flex-row mt-10 px-10`}>
     <Avatar size={90} rounded={true} source={{ uri :  user.imageUrl ? user.imageUrl : "https://www.greativaconsulting.com/wp-content/themes/greativa1/assets/images/user.png"  } } />
       <View style={ tw `flex justify-center pl-2 `} >
        <Text style={tw `text-xl font-semibold`}>{ `${user.firstName}  ${user.lastName} ` }</Text>
       </View>
     </View>
     <Divider style={tw `mt-4`} />

{/* settings options  */}
<View style={ tw `px-3 h-auto mt-12`}>

  <TouchableOpacity onPress={()=> props.navigation.navigate("modifyProfile")}  style={ tw `flex flex-row  items-center p-2 h-auto justify-between`} >
    <View style={ tw`items-center flex flex-row`}>
    <View style={ tw `flex justify-center bg-green-200 items-center h-12 w-12 rounded-lg`}>
    <Icon type='font-awesome' name='user'  />
    </View>
    <Text style={tw`pl-2`}>Personal Data</Text>
    </View>
  <Icon type='ionicon' name='chevron-forward-circle-outline' />
  </TouchableOpacity>

  <TouchableOpacity  style={ tw `flex flex-row  items-center p-2 h-auto justify-between`} >
    <View style={ tw`items-center flex flex-row`}>
    <View style={ tw `flex justify-center bg-green-200 items-center h-12 w-12 rounded-lg`}>
    <Icon type='font-awesome' name='trash'  />
    </View>
    <Text style={tw`pl-2`}>Delete the account</Text>
    </View>
  <Icon type='ionicon' name='chevron-forward-circle-outline' />
  </TouchableOpacity>
  <TouchableOpacity  onPress={()=> logout()} style={ tw `flex flex-row  items-center p-2 h-auto justify-between`} >
    <View style={ tw`items-center flex flex-row`}>
    <View style={ tw `flex justify-center bg-green-200 items-center h-12 w-12 rounded-lg`}>
    <Icon type='ionicon' name='log-out-outline'  />
    </View>
    <Text style={tw`pl-2`}>Logout</Text>
    </View>
  <Icon type='ionicon' name='chevron-forward-circle-outline' />
  </TouchableOpacity>
</View>

   
    </View>
  )
}

export default ProfileHome