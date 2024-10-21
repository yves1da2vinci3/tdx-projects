import React, {createContext,useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeContext = createContext()

 function HomeProvider({children}) {
    const [watchList,setWatchList] = useState([])
    const [currency,setCurrency] = useState()
    const [FirstTime,setFirstime] = useState(true)
    const basicCurrency = {
        label : "GHS",
        currencyRate : 1
    }
    const checkCurrency =  async () => {
   const currencyStringified = await AsyncStorage.getItem("currency")
  const currency = JSON.parse(currencyStringified)
   if(currency){
    setCurrency(currency)
    await AsyncStorage.setItem("currency",JSON.stringify(currency))
   }else{
    setCurrency(basicCurrency)
   }
    }
    const checkWatchList =  async () => {
   const watchListStringified = await AsyncStorage.getItem("watchList")
   const watchList = JSON.parse(watchListStringified)
   if(watchList){
     if(watchList.length !== 0){
      setWatchList(watchList)
     }
   }
    }
    const checkFirstTime =  async () => {
        const FirstTimeInAppStrinigfied = await AsyncStorage.getItem("firstTimeInApp")
        const FirstTimeInApp = JSON.parse(FirstTimeInAppStrinigfied)
        setFirstime(FirstTimeInApp)

     
         }
    useEffect(() =>{
        checkCurrency()
 checkWatchList()
 checkFirstTime()
    },[])

    
   
    async function  SetCurrentcurrency (id) {
      let Currency = {
        label : "GHS",
        currencyRate : 1
      }
      console.log("je crois toujours pas")
        if(id===1){
            setCurrency(Currency)
            await AsyncStorage.setItem("currency",JSON.stringify(Currency) )
        }else{
             Currency.label = "USD"
             Currency.currencyRate = 0.6
             setCurrency(Currency)
             await AsyncStorage.setItem("currency",JSON.stringify(Currency) )
            }
           
        }
     

  

    async function  addItemToWatchList (tickerId) {
      const OldwatchList = watchList 
      const newWatchList = [...OldwatchList,tickerId]
      setWatchList(newWatchList)
     await  AsyncStorage.setItem("watchList", JSON.stringify(newWatchList) )

    }
    async function  removeItemToWatchList (tickerId)  {
      const newWatchList = watchList.filter( id => id !== tickerId)
      setWatchList(newWatchList)
    await  AsyncStorage.setItem("watchList", JSON.stringify(newWatchList) )

    }

    function isInTheCheckList (id){
      return  watchList.some(tickerId => tickerId ===id)
    }

    async function  SetFirstTimeToFalse () {
              setFirstime(false)
              await AsyncStorage.setItem("firstTimeInApp",JSON.stringify(false) )
         
          }
  return (
    <HomeContext.Provider value={{watchList,currency,SetCurrentcurrency,addItemToWatchList,removeItemToWatchList,isInTheCheckList,FirstTime,SetFirstTimeToFalse}}>
        {children}
    </HomeContext.Provider>
  )
  }

export default HomeProvider