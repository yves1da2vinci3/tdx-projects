import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { ChildrenOrderStatusVariables, ParentOrderStatusVariables } from "../Constants/StatusVariables.js";
import { OperationsVariableValue } from "../utils/TypeVariableValue.js";

const prisma = new PrismaClient();


//@desc
//@right
//@ route

const getAllBasicOrders = asyncHandler( async(req,res) => {
    try {
        const basicOrders = await prisma.basicOrder.findMany({
            orderBy : {
                 createdAt : "asc"
            },
          include :{
            user : {
    select : {
        firstName : true,
        lastName : true
    }
            },
            commoditType : {

                include : {
                    commodity :{
           select : {
            commodityName : true
           }
                    }
                }
            },


          }
        })
        res.status(200).json(basicOrders)
    } catch (error) {
     console.log(error)
     res.status(500).json({message: "error happenned"})
    }

})





//@desc
//@right
//@ route

const createBasicOrder = asyncHandler( async(req,res) => {
    console.log(req.body)
    const [user,commodityType] = await Promise.all([prisma.user.findUnique({
        where : {
            id : req.body.userId
        },
        select : {
            firstName : true,
            lastName : true,
            moneyAccount : true
        }
    }), prisma.commodityType.findUnique({
        where : {
            id : req.body.commodityTypeId
        },
        select : {
            commodityTypeName : true
        }
    })  ])
    try {
        const newBasicOrder = await prisma.basicOrder.create({
            data : {
                ...req.body
            }
        })
        try {
            const notificationContent = {
                type : OperationsVariableValue.BasicOrderType,
                notificationContent : `${user.firstName} ${user.lastName} has placed a new order on ${commodityType.commodityTypeName}`,
                parentId : newBasicOrder.id,
                userId: req.body.userId
            }
            await prisma.adminNotification.create({
                data : notificationContent
            })
        } catch (error) {
            console.log(error)
        }
        res.status(201).json({ message: "the orders was succesfully sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})
//@desc
//@right
//@ route

const getOneOrder = asyncHandler( async(req,res) => {
    console.log(req.params.OrderId)
    let tickers;
    try {
        const basicOrder = await prisma.basicOrder.findUnique({
            where:{
                id : Number(req.params.OrderId)
            },
            include : {
                user : {
                    select : {
                        id : true,
                        userImgUrl : true,
                        lastName :true,
                        firstName : true,
                        email :true,
                        mobileNumber : true
                    }
                },
                commoditType : {

                    include : {
                        commodity :{
               select : {
                commodityName : true
               }
                        }
                    }
                },
            }
        }
        )
        const subBasicOrders = await prisma.advancedOrder.findMany({
            where : {
                basicOrderId : basicOrder.id,
                isAttached : true
            },
            include : {
                ticker : {
                include : {
                    commodityType : { select : {
                        commodityTypeName : true
                    }},
warehouse : {
select : {
    warehouseLocation : true
}
},
                    commodity :{
                    select : {
                        commodityName : true
                    }
                    },
                    prices : {
                        orderBy : {
                            createdAt : "desc"
                        },
                   take : 1
                    }
                }
                }
            }
        })
        // check if it is buy order
        if(basicOrder.orderCategory ===1){
         tickers = await prisma.ticker.findMany({
                select : {
                    id : true,
                    title : true
                },
                where : {
                    commodityTypeId : basicOrder.commodityTypeId
                }
            })
        }
        // check if it sell order , retrieve user Ticker
        else{
        tickers = await prisma.userTicker.findMany({
            where : {
                userId : basicOrder.user.id
            },
            include : {
              ticker : {
                select :{
                    id: true,
                    title : true,
                    commodityTypeId : true
                }
              }
            }
        })
        }
        const requests =  await prisma.request.findMany({
            where : {
                parentId : basicOrder.id,
                type : 1
            }
        })
        if(!basicOrder) return     res.status(200).json({message: " suborders not found"})
         res.status(200).json(
            {
                requests,
                tickers,
                basicOrder,
                subBasicOrders
            }
         )
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})
//@desc
//@right
//@ route

const addNewSuborder = asyncHandler( async(req,res) => {
// find if the are already a subOrder   for sending notification
try {
    const subBasicOrders = await prisma.advancedOrder.findMany({
        where : {
            basicOrderId : Number(req.params.OrderId),
            isAttached : true
        }

    })
    if(subBasicOrders.length === 0 ){
        try {

            await prisma.advancedOrder.create({ data  : {
                ...req.body
            } })
    // update the main oders
            try {
                 await prisma.basicOrder.update({
                    where : {
                        id : Number(req.params.OrderId)
                    },
                    data : {
                        status : 1
                    }
                 })
                 // create the notifications
            const notification = {
                notificationTitle : "Order FeedBack",
                notificationContent : `Dear client , your ${req.body.orderCategory ==1 ? "Buy" : "Sell"} order has been taken in charge by the TDX , there is the your  order Id : ${req.params.OrderId.padStart(10,"0")}   `,
                userId : req.body.userId
             }

             await Promise.all([ prisma.adminNotification.updateMany({
                where : {
                    type : OperationsVariableValue.BasicOrderType,
                    parentId : Number(req.params.OrderId),
                    notificationStatus : false
                },
                data : {
                    notificationStatus : true
                }
             }),prisma.notification.create({
                data : notification
             })  ])
            
             res.status(201).json({ message : "new order has been submitted" })
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message : 'problem during suborders creation '})
        }
    }else{
        try {

            await prisma.advancedOrder.create({ data  : {
                ...req.body
            } })
    // update the main oders
            try {
                 await prisma.basicOrder.update({
                    where : {
                        id : Number(req.params.OrderId)
                    },
                    data : {
                        status : 2
                    }
                 })
             res.status(201).json({ message : "new order has been submitted" })
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message : 'problem during suborders creation '})
        }
    }
} catch (error) {
    console.log(error)
}


})

//@desc
//@right
//@ route

const getAllAdvancedOrders = asyncHandler( async(req,res) => {
    try {
        const advancedOrders = await prisma.advancedOrder.findMany({
            where  : {
isAttached : false
            },
          include :{
            user : {
    select : {
        firstName : true,
        lastName : true
    }
            },
        ticker : {
            select : {
                title : true
            }
        }



          }
        })
        res.status(200).json(advancedOrders)
    } catch (error) {
     console.log(error)
     res.status(500).json({message: "error happenned"})
    }

})





//@desc
//@right
//@ route

const createAdvancedOrder = asyncHandler( async(req,res) => {

    try {
        const [user,ticker] = await Promise.all([
            prisma.user.findUnique({ where : { id : req.body.userId} , select : { firstName : true, lastName : true } }),
            prisma.ticker.findUnique({ where : { id : req.body.tickerId} ,select : { title : true } })
        ])
        const advancedOrder =  await prisma.advancedOrder.create({
            data : {
                ...req.body
            }
        })
        const notificationContent = {
            type : OperationsVariableValue.advancedOderType,
            notificationContent : `${user.firstName} ${user.lastName} has placed a new order on ${ticker.title}`,
            parentId : advancedOrder.id,
            userId: req.body.userId
        }
        await prisma.adminNotification.create({
            data : notificationContent
        })
        res.status(201).json({ message: "the order was succesfully created"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})
//@desc
//@right
//@ route

const getOneAdvancedOrder = asyncHandler( async(req,res) => {
console.log(req.params.OrderId)
    try {
        const advancedOrder = await prisma.advancedOrder.findUnique({
            where:{
                id : Number(req.params.OrderId)
            },
            include : {
                user : {
                    select : {
                        id : true,
                        userImgUrl : true,
                        lastName :true,
                        firstName : true,
                        email :true,
                        mobileNumber : true
                    }
                },
                ticker : {
                    include : {
                        warehouse: {
                            select : {
                                warehouseLocation : true
                            }
                        },
                        commodityType : {
                            select : {
                                commodityTypeName : true
                            }
                        },
                        commodity : {
                          select : {
                            commodityName : true
                          }
                        },
                        prices : {
                            orderBy : {
                                createdAt : "desc"
                            },
                       take : 1
                        }
                    }
                    }
            }
        }
        )
        //  Bring subAdvancedOrders and Requests attach to this particular advanced
        const [subAdvancedOrders,requests] = await Promise.all([ prisma.advancedSubOrder.findMany({
            where : {
                orderId : advancedOrder.id
            }
        }), prisma.request.findMany({
            where : {
                type : 2,
                parentId: advancedOrder.id
            }
        })  ]) 
       
        if(!advancedOrder) return     res.status(200).json({message: " order not found"})
         res.status(200).json(
            {
                advancedOrder,
                subAdvancedOrders,requests
            }
         )
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})
//@desc
//@right
//@ route

const addNewSubAdvancedOrder = asyncHandler( async(req,res) => {
    try {
        await prisma.advancedSubOrder.create({ data  : { qty : Number(req.body.qty),
            price : Number(req.body.price),
            status : ChildrenOrderStatusVariables.pending,
            orderId :  Number(req.params.OrderId) } })
       const subAdvancedOrders = await prisma.advancedSubOrder.findMany({
        where : {
            id : Number(req.params.OrderId)
        },

    })
    // change status of the advanced order
    await prisma.advancedOrder.update({
        where : {
            id : Number(req.params.OrderId)
        },
        data : {
            status : ParentOrderStatusVariables.placed
        }
    })
    // send notification to the user
    const notification = {
        notificationTitle : "Order FeedBack",
        notificationContent : `Dear client , your ${req.body.orderCategory ===1 ? "Buy" : "Sell"} advanced ,for the ticker ${req.body.title} order has been taken in charge by the TDX , there is the your  order Id : ${req.params.OrderId.padStart(10,"0")}   `,
        userId : req.body.userId
     }
     await Promise.all([ prisma.adminNotification.updateMany({
        where : {
            type : OperationsVariableValue.advancedOderType,
            parentId : Number(req.params.OrderId),
            notificationStatus : false
        },
        data : {
            notificationStatus : true
        }
     }),prisma.notification.create({
        data : notification
     })  ])
    
//
        res.status(201).json({ message :  "the  new subOrder has been submitted succesfully" ,subAdvancedOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'suborder not added'})
    }

})
//@desc
//@right
//@ route

const getAllSubBasicOrders = asyncHandler( async(req,res) => {
    try {
        const subBasicOrders = await prisma.advancedOrder.findMany({
            where : {
                basicOrderId : Number(req.params.OrderId),
                isAttached : true
            },
            include : {
                ticker : {
                include : {
                    commodityType : { select : {
                        commodityTypeName : true
                    }},
warehouse : {
select : {
    warehouseLocation : true
}
},
                    commodity :{
                    select : {
                        commodityName : true
                    }
                    },
                    prices : {
                        orderBy : {
                            createdAt : "desc"
                        },
                   take : 1
                    }
                }
                }
            }
        })
        res.status(200).json(subBasicOrders)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'suborder not found'})
    }

})
//@desc
//@right
//@ route

const addBasicFee = asyncHandler( async(req,res) => {
    const {Grading,Weighing,centralDepository,Storage,Handling,brokerCommission,tradingFee,regulatoryFee,
        Drying,Cleaning,reBagging,fumigation,
        moistureLoss,receiptingFee} = req.body
    // get the suborder
console.log(req.body.parentId)
    const advancedOrder = await prisma.advancedOrder.findUnique({
        where: {
            id: req.body.parentId
        },
        include: {
            basicOrder: {
                
                select: {
                    id : true,
                    orderCategory: true
                }
            },
            user: {
                select: {
                    id: true,
                    moneyAccount: true
                }
            },
            ticker: {
                include: {
                    prices: {
                        orderBy: {
                            createdAt: "desc"
                        },
                        take: 1
                    }
                }
            }
        },
    })
    // calculate the charges
const totalCharges = Grading + Weighing +centralDepository +Storage +Handling +brokerCommission +tradingFee +regulatoryFee +receiptingFee +Drying + Cleaning +
reBagging + fumigation + moistureLoss
console.log(advancedOrder.user)
    // check if this is buy or  sell order

    //* if a buy add the ticker qty to the user commodities assets and  deducted to the user cash balance
    const userTicker =  await prisma.userTicker.findUnique({
        where : {
            userId_tickerId : {
                userId : advancedOrder.user.id,
                tickerId : advancedOrder.ticker.id
            }
        }
    })
    if(advancedOrder.orderCategory === 1){

// check if the user has this ticker particular ticker if he has add ,but if he has not
if(userTicker){
try {
    await prisma.userTicker.update({
        where : {
            userId_tickerId : {
                tickerId : userTicker.tickerId,
                userId : userTicker.userId
            }
        },
        data : {
            qty : userTicker.qty + advancedOrder.qty
        }
    })
} catch (error) {
    console.log(error)

}

}else{
    // add the ticker to the user commodities assets
try {
    await  prisma.userTicker.create({
        data : {
            userId : advancedOrder.user.id,
            tickerId :  advancedOrder.ticker.id,
            qty : advancedOrder.qty
        }
    })

} catch (error) {
    console.log(error)
}
}
//~ deducted the charges price and sending notifications
const newUserAmount =  advancedOrder.user.moneyAccount - ((advancedOrder.qty * advancedOrder.ticker.prices[0].priceValue) + totalCharges)
console.log("new Amount")
await prisma.user.update({
    where : {
        id : advancedOrder.user.id
    },
    data : {
        moneyAccount :  newUserAmount
    }
})
//~sending notification
const notification = {
    notificationTitle : "Order FeedBack",
    notificationContent : `Dear client , your    Buy order with the id : ${advancedOrder.id.toString().padStart(10,"0")}  for the ticker ${advancedOrder.ticker.title} has been partially filled by the ${advancedOrder.qty} MT ,kindly check your commodity assets   `,
    userId : advancedOrder.user.id
 }
 await prisma.notification.create({
    data : notification
 })

    }
     //* if a sell order remove the ticker qty to the user commodities assets and  deducted to the user cash balance
    else{
        // remove ticker from the user
        await  prisma.userTicker.update({
            where : {
                userId_tickerId : {
                    userId : advancedOrder.user.id,
                    tickerId : advancedOrder.ticker.id
                },
            },
            data : {
                qty : userTicker.qty - advancedOrder.qty
            }
        })
    //~ deducted the charges price and sending notifications
    await prisma.user.update({
        where : {
            id : advancedOrder.user.id
        },
        data : {
            moneyAccount :  advancedOrder.user.moneyAccount + ((advancedOrder.qty * advancedOrder.ticker.prices[0].priceValue) - totalCharges)         }
    })
    //~sending notification
    const notification = {
        notificationTitle : "Order FeedBack",
        notificationContent : `Dear client , your Sell order with the id : ${advancedOrder.id.toString().padStart(10,"0")}  has been partially filled,therefore  ${advancedOrder.qty} MT has been deducted to your assets ,kindly check your commodity assets   `,
        userId : advancedOrder.user.id
     }
     await prisma.notification.create({
        data : notification
     })

    }
    // change the subooder status and  parent order
    await prisma.advancedOrder.update({
        where : {
            id : req.body.parentId
        },
        data : {
            status : ChildrenOrderStatusVariables.completed
        }
    })
    await prisma.fee.create({
        data : {
            tradingFee,
            rattachedOrderId : req.body.parentId,
            Weighing ,
            receiptingFee,
            regulatoryFee,
            reBagging,
            Cleaning,
            centralDepository,
            Drying,
            brokerCommission,
            moistureLoss,
            Grading,
            Storage,
            Handling

        }
    })
    // make the basic go to partial
    await prisma.basicOrder.update({
        where : {
          id :  advancedOrder.basicOrder.id
        },
        data : {
            status : ParentOrderStatusVariables.partial
        }
    })
res.status(201).json({message : "fee successfully added"})
})
//@desc
//@right
//@ route

const addAdvancedFee = asyncHandler( async(req,res) => {
    const {Grading,Weighing,centralDepository,Storage,Handling,brokerCommission,tradingFee,regulatoryFee,
        Drying,Cleaning,reBagging,fumigation,
        moistureLoss,receiptingFee} = req.body
    // get the suborder
console.log(req.body.parentId)
    const advancedSubOrder = await prisma.advancedSubOrder.findUnique({
        where: {
            id: req.body.parentId
        },
        include: {
            advancedOrder: {
                include :{
                    user: {
                        select: {
                            id: true,
                            moneyAccount: true
                        }
                    },
                    ticker:  true
                }
            },
            
        },
    })
    // calculate the charges
const totalCharges = Grading + Weighing +centralDepository +Storage +Handling +brokerCommission +tradingFee +regulatoryFee +receiptingFee +Drying + Cleaning +
reBagging + fumigation + moistureLoss
console.log(advancedSubOrder.advancedOrder.user)
    // check if this is buy or  sell order

    //* if a buy add the ticker qty to the user commodities assets and  deducted to the user cash balance
    const userTicker =  await prisma.userTicker.findUnique({
        where : {
            userId_tickerId : {
                userId : advancedSubOrder.advancedOrder.user.id,
                tickerId : advancedSubOrder.advancedOrder.ticker.id
            }
        }
    })
    if(advancedSubOrder.advancedOrder.orderCategory === 1){

// check if the user has this ticker particular ticker if he has add ,but if he has not
if(userTicker){
try {
    await prisma.userTicker.update({
        where : {
            userId_tickerId : {
                tickerId : userTicker.tickerId,
                userId : userTicker.userId
            }
        },
        data : {
            qty : userTicker.qty + advancedSubOrder.qty
        }
    })
} catch (error) {
    console.log(error)

}

}else{
    // add the ticker to the user commodities assets
try {
    await  prisma.userTicker.create({
        data : {
            userId : advancedSubOrder.advancedOrder.user.id,
            tickerId :  advancedSubOrder.advancedOrder.ticker.id,
            qty : advancedSubOrder.qty
        }
    })

} catch (error) {
    console.log(error)
}
}
//~ deducted the charges price and sending notifications
const newUserAmount =  advancedSubOrder.advancedOrder.user.moneyAccount - ((advancedSubOrder.qty * advancedSubOrder.price) + totalCharges)
console.log("new Amount")
await prisma.user.update({
    where : {
        id : advancedSubOrder.advancedOrder.user.id
    },
    data : {
        moneyAccount :  newUserAmount
    }
})
//~sending notification
const notification = {
    notificationTitle : "Order FeedBack",
    notificationContent : `Dear client , your    advanced Buy order with the id : ${advancedSubOrder.advancedOrder.id.toString().padStart(10,"0")}  for the ticker ${advancedSubOrder.advancedOrder.ticker.title} has been partially filled by the ${advancedSubOrder.qty} MT ,kindly check your commodity assets   `,
    userId : advancedSubOrder.advancedOrder.user.id
 }
 await prisma.notification.create({
    data : notification
 })

    }
     //* if a sell order remove the ticker qty to the user commodities assets and  deducted to the user cash balance
    else{
        // remove ticker from the user
        await  prisma.userTicker.update({
            where : {
                userId_tickerId : {
                    userId : advancedSubOrder.advancedOrder.user.id,
                    tickerId : advancedSubOrder.advancedOrder.ticker.id
                },
            },
            data : {
                qty : userTicker.qty - advancedSubOrder.advancedOrder.qty
            }
        })
    //~ deducted the charges price and sending notifications
    await prisma.user.update({
        where : {
            id : advancedSubOrder.advancedOrder.user.id
        },
        data : {
            moneyAccount :  advancedSubOrder.advancedOrder.user.moneyAccount + ((advancedSubOrder.qty * advancedSubOrder.price) - totalCharges)         }
    })
    //~sending notification
    const notification = {
        notificationTitle : "Order FeedBack",
        notificationContent : `Dear client , advanced your Sell order with the id : ${advancedSubOrder.advancedOrder.id.toString().padStart(10,"0")}  has been partially filled,therefore  ${advancedSubOrder.qty} MT has been deducted to your assets ,kindly check your commodity assets   `,
        userId : advancedSubOrder.advancedOrder.user.id
     }
     await prisma.notification.create({
        data : notification
     })

    }
    // change the subooder status and  parent order
    await prisma.advancedSubOrder.update({
        where : {
            id : req.body.parentId
        },
        data : {
            status : ChildrenOrderStatusVariables.completed
        }
    })
    await prisma.fee.create({
        data : {
            tradingFee,
            rattachedOrderId : req.body.parentId,
            rattachedType : 2,
            Weighing ,
            receiptingFee,
            regulatoryFee,
            reBagging,
            Cleaning,
            centralDepository,
            Drying,
            brokerCommission,
            moistureLoss,
            Grading,
            Storage,
            Handling

        }
    })
    // make the basic go to partial
    await prisma.advancedOrder.update({
        where : {
          id :  advancedSubOrder.advancedOrder.id
        },
        data : {
            status : ParentOrderStatusVariables.partial
        }
    })
res.status(201).json({message : "fee successfully added"})
})






const getAllAdvancedSuborders = asyncHandler( async(req,res) => {
    try {
        const subBasicOrders = await prisma.advancedSubOrder.findMany({
            where : {
                orderId : Number(req.params.OrderId)
            },
        })
        res.status(200).json(subBasicOrders)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'suborder not found'})
    }

})
/* *|CURSOR_MARCADOR|* */
const getFeeDetails = asyncHandler( async(req,res) => {
    console.log(req.body)
    if( req.body.type ===1){
        const fee = await prisma.fee.findMany({
            where : {
                rattachedType : 1,
                rattachedOrderId : req.body.orderId
            }
        })
        res.status(200).json(fee[0])
    }else{
        const fee = await prisma.fee.findMany({
            where : {
                rattachedType : 2,
                rattachedOrderId : req.body.orderId
            }
        })
        res.status(200).json(fee[0])
    }

})
















export {getAllBasicOrders,createBasicOrder,getOneOrder,addNewSuborder,getAllAdvancedOrders,addAdvancedFee,createAdvancedOrder,getAllSubBasicOrders,addBasicFee,getAllAdvancedSuborders
    ,getOneAdvancedOrder,addNewSubAdvancedOrder,getFeeDetails}