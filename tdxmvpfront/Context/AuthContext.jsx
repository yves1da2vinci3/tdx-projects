import React, {createContext,useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

 function AuthProvider({children}) {
    const [isLogin,setIsLogin] = useState(false)
    const [user,setUser] = useState({})
    const [Token,setToken] = useState ("")
    const [userId,setUserId] = useState({})
     
    const checkLogin = async () => { 
        const userStringfied = await AsyncStorage.getItem("userInfo")
        const user = JSON.parse(userStringfied)
        if(user){
            setIsLogin(true)
            setUser(user) 
        }
     }
    useEffect(() =>{
        checkLogin()
        CheckToken()
    },[])

    const setSession = async (data) => { 
        console.log( "from context :", data)
        setIsLogin(true)
        setUser(data)
       await  AsyncStorage.setItem("userInfo",JSON.stringify(data))
     }
    const setTokenHandler = async (Token) => { 
        setToken(Token)
       await  AsyncStorage.setItem("userToken",Token)
     }
    const logout = async () => { 
        setIsLogin(false)
        setUser({})
        setToken("")
        await AsyncStorage.removeItem("userInfo")
     }
    const getUser = async () => {  
        return user
     }
     const CheckToken = async() => { 
        const token = await AsyncStorage.getItem("userToken")
        if(token){
            setTokenHandler(token)
            setIsLogin(true)
            
        }else{
            setIsLogin(false)
            setUser({})
        }
      }
  return (
    <AuthContext.Provider value={{user,setSession,logout,getUser,isLogin,CheckToken,setTokenHandler,Token}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider