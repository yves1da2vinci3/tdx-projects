import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import GenerateVerificationCode from "../utils/generateVerificationCode.js";
const prisma = new PrismaClient();
import path, { dirname } from "path"
import { fileURLToPath } from "url";
import fs from "fs"
import { storage } from "../Firebase.js";
import { getDownloadURL, uploadBytesResumable,ref } from "firebase/storage";
import { ResendOTPMail, SendSignupMail } from "../utils/gmailSender.js";
import { ParentOrderStatusVariables } from "../Constants/StatusVariables.js";
//@desc  get all the users
//@right private admin
//@ route GET api/users/
const __dirname = dirname(fileURLToPath(import.meta.url));
const getUsers = asyncHandler( async(req,res) => {
    try {
        const users = await prisma.user.findMany({
        })
        const countries = await prisma.country.findMany({
          select  :{
            id : true,
            countryName : true
          }
        })
        res.status(200).json({countries,users})
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc  create an user
//@right  private
//@ route POST /api/users/

const createUser = asyncHandler( async(req,res) => {
   const password = req.body.password
    const hashPassword = hashSync(password,genSaltSync(10))
    const imageRef = ref(storage,`/userImages/${ Math.random()}`)
    const uploadTask =  uploadBytesResumable(imageRef,req.file.buffer)
    uploadTask.on("state_changed",
    (snapshot) =>{

    },
    (error) =>{
        console.log(error)
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(ImageUrl => {
          prisma.user.create({
            data : {
              password : hashPassword,
              userImgUrl : ImageUrl,
              lastName : req.body.lastName,
              email : req.body.email,
              firstName : req.body.firstName,
              mobileNumber : req.body.mobileNumber,
              bankAccountNumber : Number(req.body.bankAccountNumber),
              phoneCode : "123456",
              countryId : Number(req.body.countryId)

            }
          }).then( success => {
            console.log("userid",success.id)
            const OTP = GenerateVerificationCode()
            prisma.verificationCode.create({
              data : {
                content : Number(OTP),
                userId : success.id
              }
            }).then(suceess => {
           console.log("OTP code :",OTP)

            SendSignupMail(req.body.firstName,req.body.lastName,password,req.body.email,OTP,res)

           }).catch(err=> console.log(err))
             res.status(201).json({message : "user successfully created"})
            }  ).catch(error => {
            console.log(error)
        res.status(500).json(error)

        })

        })
    }
    )
 
 

})


//@desc Add price for ticker
//@right private
//@ route POST /api/users/login



const authUser = asyncHandler( async(req,res) => {
    
    const {email,password} = req.body
    console.table([email,password])
//     const { value, error } = connexionSchema.validate(req.body);
// // console.table({phoneNumber,password})
//     // faire la validation
      
//     if (error !== undefined)
//     return res.status(400).json(parseValidationError(error));
 

    // verfication du email et du mot de passe

    const user = await prisma.user.findUnique({
        where : {
            email : req.body.email
        }
    })

    if (!user) return res.status(402).json({ message: "user not found" });

    const passwordComparaison = compareSync(password,user.password);

    if (!passwordComparaison)
      return res.status(400).json({ message: "Incorrect password" });
     else{

          res.status(200).json(user)
        
      }
    
})
//@desc 
//@right
//@ route



const modifyPassword = asyncHandler( async(req,res) => {
   
  // verify if this is the same password 
  try {
    const  user = await prisma.user.findUnique( { where : { id : Number(req.params.userId)}})
   
    if(compareSync(req.body.currentPassword,user.password)){
      try {
        const updateUser = await prisma.user.update({
            where: {
              id: Number(req.params.userId) ,
            },
            data: {
              password: hashSync(req.body.newPassword,genSaltSync(10)) ,
            },
          })
          res.status(201).json({message : "password modified with success",updateUser})
      } catch (error) {
       console.log(error)
       res.status(500).json({error : error}) 
      }
    }else{
      res.status(401).json({message : " old password entered is not right"})
      
    }
  } catch (error) {
    res.status(500).json({message : "something went wrong"})
    console.log(error)
  }
  // validate the password
 
   
})

//@desc 
//@right
//@ route



const verifyOTP = asyncHandler( async(req,res) => {
   const {content,userId} = req.body
  //   verify OTP
    try {
      const verfications  = await prisma.verificationCode.findMany({
          where: {
            userId: Number(userId) ,
            content : Number(content),
            status : false
          },
   
        })
        if(verfications.length > 0) {
          try {
            const [verificationCode,UpdateedUser,user] = await Promise.all([prisma.verificationCode.updateMany({
              where : {
                userId : Number(userId),
                content : Number(content)
              },
              data : {
                status : true
              }
            }), prisma.user.update({
              where : {
                id : Number(userId)
              },
              data : {
                isVerified : true
              }
            }), prisma.user.findUnique({where : { id : Number(userId)}}) ])
            res.status(200).json(user)
          } catch (error) {
            console.log(error)
          }
        } else{
          res.status(404).json({message : "OTP not found"})
        }

       
    } catch (error) {
     console.log(error)
     res.status(500).json({error : error}) 
    }
     
  })
//@desc 
//@right
//@ route



const verifyOTPByContent = asyncHandler( async(req,res) => {
   const {content} = req.body
  //   verify OTP
  console.log(content)
    try {
      const verficationCode  = await prisma.verificationCode.findFirst({
          where: {
            content : Number(content),
            status : false
          },
   
        })
        if(verficationCode) {
          try {
            await prisma.verificationCode.updateMany({
              where : {
                userId : verficationCode.userId,
                content : Number(content)
              },
              data : {
                status : true
              }
            })
            res.status(200).json({userId : verficationCode.userId})
          } catch (error) {
            console.log(error)
          }
        } else{
          res.status(404).json({message : "OTP not found"})
        }

       
    } catch (error) {
     console.log(error)
     res.status(500).json({error : error}) 
    }
     
  })

//@desc 
//@right
//@ route



const resendOTP = asyncHandler( async(req,res) => {
   const {userId,email} = req.body
  
  // generate OTP & save it into the DB
  const OTP = GenerateVerificationCode()
      await prisma.verificationCode.create({
        data : {
          userId : userId,
          content : OTP
        }
      })
  // sending the OTP on the email
  ResendOTPMail(email,OTP,res)

      // erase all OTP 
      await prisma.verificationCode.deleteMany({
        where : {
          userId : userId
        }
      }) 



     
  })
//@desc 
//@right
//@ route



const getUserTickers = asyncHandler( async(req,res) => {
 
   const {userId} = req.body
   const currentDate = new Date()
   // recuperer les informations de today et construire une date 3mois en arriere
   let LastThreeTimeStamp = (currentDate.getTime()-604800*6*24*90)
       
           const LastThreeMonthDate = new Date(
              LastThreeTimeStamp
           )
   const user = await prisma.user.findUnique({where: { id : Number(userId) }, select : {
    moneyAccount : true
   }})
   // retreive commodity 
   const commodities = await prisma.commodity.findMany({ select : {
    id : true, commodityName : true,commodityUrl : true
   } })
    try {
         const userTickers = await prisma.userTicker.findMany({
          where : {
            userId
          },
          include : {
         ticker:{
          include :{
            prices :{
              orderBy  :{
                createdAt : "asc"
              },
              where :{
                createdAt : {
                  lte: currentDate ,
                  gte: LastThreeMonthDate,
              }
              }
            }
          }
         }
          }
         })
         res.status(200).json({user,userTickers,commodities})
    } catch (error) {
     console.log(error)
     res.status(500).json({error : error}) 
    }
     
  })

//@desc 
//@right
//@ route
const getUserNotification = asyncHandler( async(req,res) => {
  // const {userId} = req.body 
   try {
    const notifications = await  prisma.notification.findMany({
      where : {
        userId : Number( req.params.userId)
      }
    })
        res.status(200).json(notifications)
   } catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })

//@desc 
//@right
//@ route
const RemoveUserNotification = asyncHandler( async(req,res) => {
  
   try {
    const notifications = await  prisma.notification.delete({
      where : {
        id : Number(req.params.notificationId)
      }
    })
    res.status(200).json(notifications)
      }
       
    catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const getUserAlerts = asyncHandler( async(req,res) => {
  
   try {
    const alerts = await  prisma.alert.findMany({
      where : {
        userId : Number(req.params.userId)
      },
      include : {
        ticker : {
          include : {
            prices : true
          }
        }
      }
    })
    res.status(200).json(alerts)
      }
       
    catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const addTickerToAlerts = asyncHandler( async(req,res) => {
  const  userId = Number(req.params.userId)
  console.log(req.body)
  console.log(userId)

   try {
    const alerts = await prisma.alert.findMany({
      where : {
        userId : userId,
        tickerId : req.body.tickerId
      }
    })
    console.log(alerts)
    if(alerts.length === 0){
      await  prisma.alert.create({
        data : {
          userId : userId,
         tickerId :req.body.tickerId,
         price : req.body.price
        }
       })
       res.status(200).json({message : "alert succesfully added"})
    }else{
      res.status(401).json({message : "you already have an alert for this ticker"})
    }
    
      }
       
    catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const RemoveTickerToAlerts = asyncHandler( async(req,res) => {
  console.log(req.body)
   try {
  
     await  prisma.alert.delete({
     where : {
      id : Number(req.params.alertId)
     }
    })
    res.status(200).json({message : "alert succesfully deleted"})
      }
       
    catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const ModifyTickerToAlerts = asyncHandler( async(req,res) => {
   try {
  
     await  prisma.alert.update({
     where : {
      id : req.body.alertId
     },
     data : {
     price : req.body.price
     }
    })
    res.status(200).json({message : "alert succesfully modified"})
      }
       
    catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const getUserDepositsAndWithDrawals = asyncHandler( async(req,res) => {
  console.log(req.query.transactionType.trim() )
   try {
    if(req.query.transactionType === "deposit"){
     const deposits = await   prisma.deposit.findMany({
        where : {
          userId : Number(req.params.userId)
        }
      })
    res.status(200).json(deposits)

    }else{
    const withdrawals = await prisma.withdrawal.findMany({
      where : {
        userId : Number(req.params.userId)
      },
      include : {
        ticker : {
          select : {
            title : true
          }
        }
      }
    }) 
    res.status(200).json(withdrawals)
    }       
  }catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
    
 })
//@desc 
//@right
//@ route
const makeWithDrawal = asyncHandler( async(req,res) => {
  let notificationContent = {

  }
  // decide of a structre of notfifcation
  if(req.body.type ===2){
    const [ticker,user] = await Promise.all([prisma.ticker.findUnique({
      where : {
        id : req.body.tickerId
      },select :{
        title : true
      }
    }),prisma.user.findUnique({
      where : {
        id : req.body.userId
      },
      select : {
        firstName : true,
        lastName : true
      }
    })])
    notificationContent = {
      userId: req.body.userId,
      type : 3,
      notificationContent : `${user.firstName} ${user.lastName} requested  a withdrawal for the ticker ${ticker.title} `,
  }
  }else{
    const user = await prisma.user.findUnique({
      where : {
        id : req.body.userId
      },select : {
        firstName : true,
        lastName : true
      }
    })
    notificationContent = {
      userId: req.body.userId,
      type : 3,
      notificationContent : `${user.firstName} ${user.lastName} requested  a withdrawal for ${req.body.amount} GHS`,
  }

  }
  // create withdrawal
  // if it is a commodity withdrawal
  if(req.body.type === 2){
    try {
      prisma.withdrawal.create({
      data : {
       amount :req.body.amount,
       tickerId : req.body.tickerId,
       type : req.body.type,
       userId : req.body.userId,
       qty : req.body.qty,
       dateToWithdrawal : new Date(req.body.dateToWithdrawal)
      }
     }).then(suceess => {
      //make admin notification
       notificationContent.parentId = suceess.id
       prisma.adminNotification.create({
        data : notificationContent
       }).then(suceess =>{
  
       }).catch(err =>{
        console.log(err)
       })
     }).catch(err =>{
      console.log(err)
     })
  
      res.status(201).json({message : "the withdrawal was successfully submitted"})
         
    }catch (error) {
      console.log(error)
      res.status(500).json({error : error}) 
     }
  }
  // cash commodity
  else{
    try {
      prisma.withdrawal.create({
      data : {
       amount :req.body.amount,
       type : req.body.type,
       userId : req.body.userId,
       withDrawalTo : req.body.withDrawalTo.toString(),
      }
     }).then(suceess => {
      //make admin notification
       notificationContent.parentId = suceess.id
       prisma.adminNotification.create({
        data : notificationContent
       }).then(suceess =>{
  
       }).catch(err =>{
        console.log(err)
       })
     }).catch(err =>{
      console.log(err)
     })
  
      res.status(201).json({message : "the withdrawal was successfully submitted"})
         
    }catch (error) {
      console.log(error)
      res.status(500).json({error : error}) 
     }
  }
  
    
 })
//@desc 
//@right
//@ route
const makeDeposit = asyncHandler( async(req,res) => {
  // console.log(req.body.type)
  // console.log(  parseInt(req.body.type))
  // console.log( typeof Number(req.body.type))
  let notificationContent = {

  }
  // this is a bank Deposit
  if(parseInt(req.body.type) ===1 ){
    console.log(req.file)
    const user = await prisma.user.findUnique({
      where : {
        id : parseInt(req.body.userId) 
      },select : {
        firstName : true,
        lastName : true
      }
    })
   
    const imageRef = ref(storage,`/depositImages/${ req.file.originalname}`)
    const uploadTask =  uploadBytesResumable(imageRef,req.file.buffer)
   uploadTask.on("state_changed",
   (snapshot)=>{
      
   },(error)=>{
    console.log(error)
    res.status(500).json({message : 'something went wrong'})
   },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(url => {
      let depositStructure  = {
        type : 1,
        userId : parseInt(req.body.userId), 
        amount : parseInt(req.body.amount),
        fileUploadUrl : `${url}`
     }
    //  deposit structure
     prisma.deposit.create({
      data : depositStructure
    }).then(deposit => { 
      notificationContent = {
        userId: parseInt(req.body.userId),
        type : 1,
        notificationContent : `${user.firstName} ${user.lastName} requested  a deposit for ${req.body.amount} GHS`,
        parentId : deposit.id
    }
    // create admin Notifications

    prisma.adminNotification.create({
      data : notificationContent
     }).then(suceess =>{
      res.status(201).json({message : "the deposit was successfully submitted"})
     }).catch(err =>{
      console.log(err)
     })
    }).catch(err => res.status(500).json({message : "something went wrong"}))
    }).catch(err => {
    res.status(500).json({message : 'something went wrong'})
      console.log(err)
    })

   })

  }else{


    const user = await prisma.user.findUnique({
      where : {
        id : req.body.userId
      },select : {
        firstName : true,
        lastName : true
      }
    })
    notificationContent = {
      userId: req.body.userId,
      type : 1,
      notificationContent : `${user.firstName} ${user.lastName} requested  a deposit for ${req.body.amount} GHS`,
  }
  
   try {
    console.log(req.body)
    prisma.deposit.create({
    data : {
      userId : req.body.userId,
      amount : req.body.amount,
      transactionId : parseInt(req.body.transactionId) ,
      type : req.body.type
    }
   }).then(suceess => {
    //make admin notification
     notificationContent.parentId = suceess.id
     prisma.adminNotification.create({
      data : notificationContent
     }).then(suceess =>{
      res.status(201).json({message : "the deposit was successfully submitted"})
     }).catch(err =>{
      console.log(err)
     })
   }).catch(err =>{
    console.log(err)
   })

    
       
  }catch (error) {
    console.log(error)
    res.status(500).json({error : error}) 
   }
  } 
 })




// @descr
//@ endpoint /
//@ right 

const getUserOrders =  asyncHandler( async (req,res) => {
  try {
      const [basicOrders,advancedOrders] =  await  Promise.all([ prisma.basicOrder.findMany({
        orderBy : {
            createdAt : "asc"
        },
        where : {
          userId :    Number(req.params.userId),
          status : {
          not : ParentOrderStatusVariables.completed
           }
        },
        include : {
          commoditType : {
            include : {
              commodity : {
                select : {
                  commodityName : true
                }
              }
            }
           
          }
        }
      }) , prisma.advancedOrder.findMany({
        orderBy : {
          createdAt : "asc"
      },
        where : {
          userId : Number(req.params.userId),
          isAttached : false,
          status : {
            not : ParentOrderStatusVariables.completed
          }
        },
        include : {
          ticker :{
            include : {
              commodity : {
               select : {
                commodityName : true
               }
              },
              warehouse : {
                select : {
                  warehouseLocation : true
                }
              },
              prices : {
                orderBy : {
                  createdAt : "desc",
                },
                take  : 1
              }
            },
            
          }
        }
      }) ])
      res.status(200).json({basicOrders,advancedOrders})
    
    
  } catch (error) {
    res.status(500).json({message : "something went wrong"})
    console.log(error)
  }

} )




const getSingleUser = asyncHandler(async  (req,res) => {
// fetch user detait and the pending operations

try {
   const user = await prisma.user.findUnique( { 
    where : {
      id : Number(req.params.userId)
    }
   })
   if(!user)
   return res.status(404).json({ message : "user not found"})
   res.status(200).json(user)
} catch (error) {
  console.log(error)
  res.status(500).json({message : "something went wrong"})
}

} )
const forgotPassword = asyncHandler(async  (req,res) => {
// fetch user detait and the pending operations
// **  generate an OTP code and send to gmail
const {email} = req.body
console.log(email)
try {
   const user = await prisma.user.findUnique( { 
    where : {
      email : email
    }
   })
   if(!user){
    return res.status(404).json({ message : "user not found"})

   }else{
    const OTPcode = GenerateVerificationCode()
    await prisma.verificationCode.create({ data : { userId : user.id , content : OTPcode} })
    ResendOTPMail(email,OTPcode,res)
    res.status(200).json({message :"OTP sent"})
   }
   
} catch (error) {
  console.log(error)
  res.status(500).json({message : "something went wrong"})
}

} )



const resetPassword =  asyncHandler(  async (req,res) => { 
  try {
    const updateUser = await prisma.user.update({
        where: {
          id: Number(req.params.userId) ,
        },
        data: {
          password: hashSync(req.body.newPassword,genSaltSync(10)) ,
        },
      })
      res.status(201).json({message : "password modified with success",updateUser})
  } catch (error) {
   console.log(error)
   res.status(500).json({error : error}) 
  }
 }    ) 





 const getTrade = asyncHandler(async (req,res)=>{


  // fetch userAssets & commdotiinfot
  try {
    const [userAssets,commodities,commodityTypes,tickers,warehouses] =  await Promise.all([
      prisma.userTicker.findMany( { where : {  userId : Number(req.params.userId)  } ,select : { tickerId : true, qty : true,  ticker : { select : {  commodityTypeId : true } } } } ),
      prisma.commodity.findMany({ select :  {   id  :true, commodityName : true }}),
      prisma.commodityType.findMany({ select : { id : true , commodityTypeName : true, commodityId : true} }),
      prisma.ticker.findMany({ select : { id : true , title : true , commodityId : true, commodityTypeId : true, warehouseId : true} }),
      prisma.warehouse.findMany({ select : { id : true, warehouseLocation : true } })
    ])
  res.status(200).json({ userAssets, commodities,commodityTypes,tickers,warehouses})

  } catch (error) {
    console.log(error)
    res.status(500).json({ message : " something went wrong "})
  }
  

 })




export {getUsers,createUser,authUser,modifyPassword,verifyOTP,addTickerToAlerts,makeDeposit,getUserOrders,getSingleUser,forgotPassword,resetPassword,verifyOTPByContent,getTrade,
  RemoveTickerToAlerts,ModifyTickerToAlerts,getUserDepositsAndWithDrawals,makeWithDrawal,
  getUserTickers,getUserNotification,RemoveUserNotification,getUserAlerts,resendOTP}