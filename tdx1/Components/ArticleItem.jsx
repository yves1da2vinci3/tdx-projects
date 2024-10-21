import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import moment from 'moment'
const ArticleItem = ({item}) => {
  console.log(item)
  return (
    <View style={tw `min-h-40 bg-[${Colors.TextInputBackgroundColor}]  rounded-lg mt-2 flex flex-row p-2 `} >
        <View style={tw `w-40  p-1`}>
         <Image style={tw `h-24 w-34  `} source={{ uri :item.articleImgUrl }} />
          <View style={tw` w-full flex flex-row items-center mt-2 flex-wrap`}>
            <View style={tw ` h-8 w-auto px-2 items-center justify-center rounded-full m-1 bg-[${Colors.greenColor}]`} >
              <Text style={tw`text-sm text-white font-semibold`} >Soya bean</Text>
            </View>
            <View style={tw ` h-8 w-auto px-2 items-center justify-center rounded-full m-1 bg-[${Colors.greenColor}]`} >
              <Text style={tw`text-sm text-white font-semibold `} >Cashew nuts</Text>
            </View>
          </View>
        </View>
        {/* Title and Date */}
        <View style={tw `flex-1 flex p-2`}>
          <Text style={tw`flex-1 text-lg `}>{item.title}</Text>
          <Text style={tw`self-end relative bottom-0 justify-end italic`}>{moment(item?.createdAt).format('DD MMM YYYY')}</Text>
        </View>
      </View>
  )
}

export default ArticleItem