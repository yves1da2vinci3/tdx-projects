import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Colors from '../Constants/Colors'
import ArticleItem from '../Components/ArticleItem'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../Components/Loader'
import { httpClient } from '../apis/Api'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useToast } from 'react-native-toast-notifications'
import { Linking } from 'react-native'
const NewScreen = () => {
  const toast = useToast()
  const [articles,setArticles] = useState([])
const [commodties,setCommodities] = useState([])
const [isLoading,setIsLoading] = useState(true)

     const findCommodityName = (id) => { 
      const commodityArray =  commodties.filter(commodity => commodity.id === id)
      return  commodityArray[0].commodityName
   }
     useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true)
            getNews()
        }, [])
    )
    const getNews = async () => {
      try {
           const {data} = await httpClient.get('/api/articles')
           setArticles(data.articles)
           console.log(data.commodities)
           setCommodities(data.commodities)
          
           setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
          console.log(error)
      }
      // let data = {}
      // data["token"] = userToken;
  }
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const openLink = (link) => {
    let check = validURL(link)
    if (check) {
        Linking.openURL(link.includes("http")? link : "https://"+link)
    } else {
      toast.show(`Link is not Valid`, {
        type: "error",
        placement: "bottom",
        duration: 2000,
        offset: 60,
        animationType: "slide-in",
      })
    }
}

function articleItem ({item}){

  return   <TouchableOpacity onPress={()=> openLink(item.link)} style={tw `min-h-40 bg-[${Colors.TextInputBackgroundColor}]  rounded-lg mt-2 flex flex-row p-2 `} >
  <View style={tw `w-40  p-1`}>
   <Image style={tw `h-24 w-34  `} source={{ uri :item.articleImgUrl }} />
    <View style={tw` w-full flex flex-row items-center mt-2 flex-wrap`}>
    {item.commoditiesLinked.map(id => (
        <View style={tw ` h-8 w-auto px-2 items-center justify-center rounded-full m-1 bg-[${Colors.greenColor}]`} >
        <Text style={tw`text-sm text-white font-semibold`} >{isLoading? "..." : findCommodityName(id)}</Text>
      </View>
                            ))}
    
      
    </View>
  </View>
  {/* Title and Date */}
  <View style={tw `flex-1 flex p-2`}>
    <Text style={tw`flex-1 text-lg `}>{item.title}</Text>
    <Text style={tw`self-end relative bottom-0 justify-end italic`}>{moment(item?.publishDate).format('DD MMM YYYY')}</Text>
  </View>
</TouchableOpacity>
}
  return (
    <View style={tw `pt-15 px-2 flex-1 bg-white`}>
   
      <FlatList  showsVerticalScrollIndicator={false} data={articles}  ListEmptyComponent={<View style={tw`flex-1  h-200 flex justify-center items-center`}>
        <Text style={tw `font-semibold`}> Nothing found</Text>
      </View>}  renderItem={articleItem} />
      <Loader isLoading={isLoading} />
    </View>
  )
}

export default NewScreen