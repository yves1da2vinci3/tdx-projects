import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { ChildrenOrderStatusVariables, ParentOrderStatusVariables } from "../Constants/StatusVariables.js";
import { OperationsVariableValue } from "../utils/TypeVariableValue.js";

const prisma = new PrismaClient();


//@desc 
//@right
//@ route

const getAllRequests = asyncHandler( async(req,res) => {
    try {
        const requests = await prisma.request.findMany({
            include : {
                user : {
                    select : {
                        firstName : true,
                        lastName : true,
                        userImgUrl : true
                    }
                }
            }
        })
        res.status(200).json(requests)
    } catch (error) {
     console.log(error)   
     res.status(500).json({message: "error happenned"})
    }

})





//@desc 
//@right
//@ route

const createRequest = asyncHandler( async(req,res) => {
    console.log(req.body)
    try {
        const user  = await prisma.user.findUnique({
            where : {
                id : req.body.userId
            },
            select : {
                firstName : true,
                lastName : true
            }
        })
        const request =   await prisma.request.create({
            data : {
               userId : req.body.userId,
               type : req.body.type,
               parentId : req.body.parentId

            }
        })
    
        
    /*
    send notification to the admin panel
    */ 
        await prisma.adminNotification.create({
            data : {
                type : OperationsVariableValue.request,
                notificationContent : `${user.firstName + " " + user.lastName } requested a cancellation`,
                parentId : request.id,
                userId: req.body.userId
            }
        })
        res.status(201).json({ message: "the request was succesfully sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
 
})
//@desc 
//@right
//@ route

const getOneRequest = asyncHandler( async(req,res) => {
    
    try {
        const request = await prisma.request.findUnique({
            where:{
                id : Number(req.params.requestId)
            },
            include : {
                user : true
            }
        }
        )
        if(!issue) return     res.status(200).json({message: " request not found"})
         res.status(200).json(request)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
 
})
//@desc 
//@right
//@ route

const approveCancellation = asyncHandler( async(req,res) => {
    
    try {
        
        // cancel order
        //* basic order
        if(req.body.type ===1){
            // change status of every suborder and the main
            await Promise.all([prisma.basicOrder.updateMany({
                where : {
                    id : req.body.parentId
                },
                data : {
                    status : ParentOrderStatusVariables.canceled
                }
             }),prisma.advancedOrder.updateMany({
        
                where : {
                    AND : [
                        {
                            basicOrderId : req.body.parentId
                        },
    
                        {
                            status : ChildrenOrderStatusVariables.pending
                        }
                        
                    ]
                },
                data : { 
                    status : ChildrenOrderStatusVariables.canceled
                 }
             }) ])
          
        }
        //*advanced order
        else{

            await Promise.all([prisma.advancedOrder.updateMany({
                where : {
                    id : req.body.parentId
                },
                data : {
                    status : ParentOrderStatusVariables.canceled
                }
             }), prisma.advancedSubOrder.updateMany({
        
                where : {
                    AND : [
                        {
                            orderId : req.body.parentId
                        },
    
                        {
                            status : ChildrenOrderStatusVariables.pending
                        }
                        
                    ]
                },
                data : { 
                    status : ChildrenOrderStatusVariables.canceled
                 }
             })  ])
           

        }
        const notfifcationStructure = {
            notificationContent : `Dear client , your cancellation  request about the ${req.body.type === 1 ? "basic" : "advanced"} order with Id : ${req.body.orderId.toString().padStart(10,"0")} has been apprvoed `,
            notificationTitle : "Order FeedBack",
            userId : req.body.userId
        }
        await Promise.all([
 // change the status of the notification
            await prisma.adminNotification.updateMany({
            where : {
                type : OperationsVariableValue.request,
                parentId :  Number(req.params.requestId)
            },
            data : {
                notificationStatus : true
            }
        })
        // mark the request as approved

    ,  await prisma.request.update({
        where :{
            id :  Number(req.params.requestId)
        },
        data : {
            status : 2
        }
    }),
    await prisma.notification.create({
       data : notfifcationStructure  
    }),
    ])
       
        
      
res.status(200).json({message : "notification marked as approved"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'notification  not update'})
    }
 
})
//@desc 
//@right
//@ route

const rejectCancellation = asyncHandler( async(req,res) => {
    
    try {
        
        // cancel order
        
       
        const notfifcationStructure = {
            notificationContent : `Dear client , your cancellation  request about the ${req.body.type === 1 ? "basic" : "advanced"} order with Id : ${req.body.orderId.toString().padStart(10,"0")} has been declined `,
            notificationTitle : "Order FeedBack",
            userId : req.body.userId
        }
        await Promise.all([
 // change the status of the notification
            await prisma.adminNotification.updateMany({
            where : {
                type : OperationsVariableValue.request,
                parentId :  Number(req.params.requestId)
            },
            data : {
                notificationStatus : true
            }
        })
        // mark the request as approved

    ,  await prisma.request.update({
        where :{
            id :  Number(req.params.requestId)
        },
        data : {
            status : 3
        }
    }),
    await prisma.notification.create({
       data : notfifcationStructure  
    }),
    ])
       
        
      
res.status(200).json({message : "request  marked as rejected"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'request   not update'})
    }
 
})






















export {getAllRequests,createRequest,getOneRequest,approveCancellation,rejectCancellation}