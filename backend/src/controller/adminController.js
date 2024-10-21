import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { genSalt } from "bcrypt";
const prisma = new PrismaClient();
import {OperationsVariableValue,WithdrawalTypeVariable}  from '../utils/TypeVariableValue.js'

//@desc 
//@right
//@ route

const getAllAdmins = asyncHandler( async(req,res) => {
    try {
        const admins = await prisma.admin.findMany({
            include : {
                role: true
            }
        })
        res.status(200).json(admins)
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const suspendAdmin = asyncHandler( async(req,res) => {
    const adminId = req.params.adminId
    try {
        const updateAdmin = await prisma.admin.update({
            where: {
              id: adminId,
            },
            data: {
              status: false,
            },
          })

        res.status(200).json({message : "admin successfully suspend",admin : updateAdmin})
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const ActiveAdmin = asyncHandler( async(req,res) => {
    const adminId = req.params.adminId
    try {
        const updateAdmin = await prisma.admin.update({
            where: {
              id: adminId,
            },
            data: {
              status: true,
            },
          })

        res.status(200).json({message : "admin successfully actived",admin : updateAdmin})
    } catch (error) {
     console.log(error)   
    }

})



//@desc 
//@right
//@ route

const authAdmin = asyncHandler( async(req,res) => {
    
    const {email,password} = req.body
    console.table([email,password])
//     const { value, error } = connexionSchema.validate(req.body);
// // console.table({phoneNumber,password})
//     // faire la validation
      
//     if (error !== undefined)
//     return res.status(400).json(parseValidationError(error));
 

    // verfication du email et du mot de passe

    const admin = await prisma.admin.findUnique({
        where : {
            email : req.body.email
        },
        include : {
            role :true
        }
    })

    if (!admin) return res.status(402).json({ message: "admin not found" });

    const passwordComparaison = compareSync(password,admin.password);

    if (!passwordComparaison)
      return res.status(400).json({ message: "Incorrect password" });
     if(!admin.status){
        res.status(401).json({message : " admin was suspended by the super Admin,plase contact him"})
     }else{
        const {password,...adminData} = admin
        res.status(200).json(adminData)
      
     }
     

})

//@desc 
//@right
//@ route

const createAdmin = asyncHandler( async(req,res) => {
    
    const {password,roleId,email,firstName,lastName,adminImageUrl} = req.body
    const role = await prisma.role.findUnique( {
        where : {
            id : roleId
        }
    })
    console.log(role)
//     const { value, error } = connexionSchema.validate(req.body);
// // console.table({phoneNumber,password})
//     // faire la validation
      
//     if (error !== undefined)
//     return res.status(400).json(parseValidationError(error));
 //hasher the password
 const salt = genSaltSync(10)
 const hashPassword = hashSync(password,salt)

    // verfication du email et du mot de passe

    try {
        const admin = await prisma.admin.create({ data : {
         email : email,
         firstName : firstName,
         lastName:lastName,
         adminImageUrl : adminImageUrl,
            password : hashPassword,
            roleId: roleId 
        }
        })
        res.status(201).json(admin)
    } catch (error) {
       res.status(500).json(error)
        console.log(error)
    }
   


     

})
//@ route

const getDashboardData = asyncHandler( async(req,res) => {
    
const [depositsCount,withdrawalCount,basicOrderCount,advancedOrderCount,adminNotifications] = await Promise.all([
    prisma.deposit.count(),
    prisma.withdrawal.count(),
    prisma.basicOrder.count(),
    prisma.advancedOrder.count(),
   prisma.adminNotification.findMany({
    where : {
        notificationStatus : false
    }
   })
])
   const ordersCount = basicOrderCount + advancedOrderCount
  
   
res.status(200).json({
    ordersCount,depositsCount,withdrawalCount,adminNotifications
})

     

})
//@ route

const getWithdrawals = asyncHandler( async(req,res) => {
    
const withdrawals = await prisma.withdrawal.findMany({
    include : {
        user : true,
        ticker : {
            select : {title : true,id : true }
        }
    }
})

  
   
res.status(200).json(withdrawals)

     

})
//@ route

const getDeposits = asyncHandler( async(req,res) => {
    
const deposits = await prisma.deposit.findMany({
    include : {
        user : true
    }
})

  
   
res.status(200).json(deposits)

     

})
//@ route

const approveWithDrawal = asyncHandler( async(req,res) => {

    //if it is a commodity withdrawal
 if(req.body.type === WithdrawalTypeVariable.commodityWithDrawal){
try {
    const userTicker = await prisma.userTicker.findUnique({
        where : {
            userId_tickerId :{
                userId : req.body.userId,
                tickerId : req.body.tickerId
            }
        },
        include :{
            ticker : {
               select : {
                title :true
               }
            }
        }
    })
    // update userTicker Value
    try {
        await prisma.userTicker.update({
            where : {
                userId_tickerId :{
                    userId : req.body.userId,
                    tickerId : req.body.tickerId
                }
            },
            data :{
                qty : (userTicker.qty - req.body.qty )
            }
        })
        //modify withdrawal status to approved
        await prisma.withdrawal.update({
            where : {
                id : Number(req.params.withdrawalId)
            },
            data : {
                status : 1
            }
         })
        //send notification
        const notification = {
            notificationTitle : "Withdrawal FeedBack",
            notificationContent : `Dear client due to your withdrawal ${req.body.qty} MT for Ticker ${userTicker.ticker.title} ,  has been approved therefore ${req.body.qty} MT
             deducted to your commodities assests`,
            userId : req.body.userId
         }
         await prisma.notification.create({
            data : notification
         })
          // modify adminNotfication
        await prisma.adminNotification.updateMany({
            where :{
                type : OperationsVariableValue.WithdrawalType ,
                parentId :   Number(req.params.withdrawalId)
            },
            data : {
                notificationStatus : true
            }
        })
         res.status(200).json({message : "withdrawal successfully approved"})
    } catch (error) {
        console.log(error)
    }
} catch (error) {
    console.log(error)
}
 }
 //if it is a cash withdrawal
 else{

    // get user and modify
    //* get user
    try {
       const user = await prisma.user.findUnique({ where : {
        id : req.body.userId
       } ,
    select : {
        moneyAccount : true
    }
    }) 
       //* modify user
       const PercentageChange = req.body.GHSInUSD? req.body.GHSInUSD : 1 
       await prisma.user.update({
        where : {id :req.body.userId  },
        data : {
            moneyAccount : user.moneyAccount - (req.body.amount*PercentageChange)
        }
       })
       await prisma.withdrawal.update({
        where : {
            id : Number(req.params.withdrawalId)
        },
        data : {
            status : 1
        }
     })
    //send notification
    const notificationContent = req.body.GHSInUSD ? `Dear client  your withdrawal request for ${req.body.amount} USD   has been approved ,kindly check your  Cash balance` : `Dear client  your withdrawal request for ${req.body.amount} GHS   has been approved ,kindly check your  Cash balance`

    const notification = {
        notificationTitle : "Withdrawal FeedBack",
        notificationContent :notificationContent ,
        userId : req.body.userId
     }
     await prisma.notification.create({
        data : notification
    })
     // modify adminNotfication
     await prisma.adminNotification.updateMany({
        where :{
            type : OperationsVariableValue.WithdrawalType,
            parentId :   Number(req.params.withdrawalId)
        },
        data : {
            notificationStatus : true
    }
    })
    res.status(200).json({message : "withdrawal successfully approved"})
    } catch (error) {
       console.log(error) 
    }
 }
      

     

})
//@ route

const DeclineWithDrawal = asyncHandler( async(req,res) => {
    // change withdrawal status
  const user = await prisma.user.findUnique({
    where : {
        id : req.body.userId
    },
    select : {
        id : true
    }
  })  
  try {
    await prisma.withdrawal.update({
        where : {
            id : Number(req.params.withdrawalId)
        },
        data : {
            status : 2
        }
     })
     // create notification
     const notification = {
        notificationTitle : "Withdrawal FeedBack",
        notificationContent : req.body.reason,
        userId : user.id
     }
    
    try {
        
        await prisma.notification.create({
            data : notification
        })
        // modify adminNotfication
        await prisma.adminNotification.updateMany({
            where :{
                type : OperationsVariableValue.WithdrawalType ,
                parentId :   Number(req.params.withdrawalId)
            },
            data : {
                notificationStatus : true
            }
        })
        res.status(201).json({message : "withdrawal successfully declined"})
    } catch (error) {
        console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
})
//@ route

const DeclineDeposit = asyncHandler( async(req,res) => {
    // change withdrawal status
    console.log(req.body.userId)
  const user = await prisma.user.findUnique({
    where : {
        id : req.body.userId
    },
    select : {
        id : true
    }
  })  
  try {
    await prisma.deposit.update({
        where : {
            id : Number(req.params.depositId)
        },
        data : {
            status : 2
        }
     })
     // create notification
     const notification = {
        notificationTitle : "Deposit FeedBack",
        notificationContent : req.body.reason,
        userId : user.id
     }
    
    try {
        
        await prisma.notification.create({
            data : notification
        })
        // modify adminNotfication
        await prisma.adminNotification.updateMany({
            where :{
                type : OperationsVariableValue.DepositType ,
                parentId :   Number(req.params.depositId)
            },
            data : {
                notificationStatus : true
            }
        })
        res.status(201).json({message : "deposit successfully declined"})
    } catch (error) {
        console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
})

const approveDeposit = asyncHandler( async(req,res) => {
    // get user and modify
    //* get user
    try {
       const user = await prisma.user.findUnique({ where : {
        id : req.body.userId
       } ,
    select : {
        moneyAccount : true
    }
    }) 
       //* modify user
       const PercentageChange = req.body.GHSInUSD? req.body.GHSInUSD : 1 
       await prisma.user.update({
        where : {id :req.body.userId  },
        data : {
            moneyAccount : user.moneyAccount + (req.body.amount*PercentageChange)
        }
       })
       // update deposit
       await prisma.deposit.update({
        where : {
            id : Number(req.params.depositId)
        },
        data : {
            status : 1
        }
     })
    //send notification to the user
    const notificationContent = req.body.GHSInUSD ? `Dear client  your deposit request for ${req.body.amount} USD   has been approved, ,kindly check your  Cash balance` : `Dear client  your deposit request for ${req.body.amount} GHS   has been approved ,kindly check your  Cash balance`
    const notification = {
        notificationTitle : "Deposit FeedBack",
        notificationContent : notificationContent,
        userId : req.body.userId
     }
     await prisma.notification.create({
        data : notification
    })
     // modify adminNotfication status
     await prisma.adminNotification.updateMany({
        where :{   
            type : OperationsVariableValue.DepositType ,
            parentId :   Number(req.params.depositId)
        },
        data : {
            notificationStatus : true
        }
    })
    res.status(200).json({message : "deposit successfully approved"})
    } catch (error) {
       console.log(error) 
    }
})



















export {getAllAdmins,authAdmin,createAdmin,suspendAdmin,ActiveAdmin,getDeposits,DeclineDeposit,approveDeposit,
    getWithdrawals,getDashboardData,approveWithDrawal,DeclineWithDrawal}