import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { OperationsVariableValue } from "../utils/TypeVariableValue.js";

const prisma = new PrismaClient();


//@desc 
//@right
//@ route

const getAllCalls = asyncHandler( async(req,res) => {
    try {
        
        const calls = await prisma.call.findMany({
            include : {
                user : {
                    select : {
                        userImgUrl : true,
                        firstName :  true,
                        lastName : true,
                        mobileNumber : true,
                        email : true
                    }
                    
                }
            }
        })
       
        res.status(200).json(calls)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})





//@desc 
//@right
//@ route

const createCall = asyncHandler( async(req,res) => {
    
    try {
        const call =  await prisma.call.create({
            data : {
                fromTime : req.body.fromTime,
                endTime : req.body.endTime,
                userId : req.body.userId,
                callDate : new Date(req.body.callDate)
            }
          })
    
        //   get user  
          const user = await prisma.user.findUnique({
            where : {
                id : req.body.userId
            },
            select : {
                lastName : true,
                firstName : true,
                
            }
          })
// send notification
        const notificationContent = {
            userId: req.body.userId,
            parentId : call.id,
            type : OperationsVariableValue.callType ,
            notificationContent : ` ${user.firstName + " " + user.lastName}  requested a call on ${req.body.callDate.split("-").reverse().join("-") } from : ${req.body.fromTime} to : ${req.body.endTime} `
        }

        await prisma.adminNotification.create({
            data : notificationContent
        })
         
          res.status(201).json({message: "call succesfully created "})
    } catch (error) {
        console.log(error)
res.json({error })
    }
 
})


//@ desc
//@ endpoint 
//@ right
const markCallAsMade = asyncHandler( async(req,res) => {
  try {
    // change the status of call
    await prisma.call.update({
        where : {
            id : Number(req.params.callId)
        },
        data : {
            status : true
        }
    })
    // change the status of adminNotification
 try {
    await  prisma.adminNotification.updateMany({
        where : {
            type : OperationsVariableValue.callType,
            parentId :  Number(req.params.callId)
        },
        data : {
            notificationStatus : true
        }
    })
    res.status(200).json({message : "call correctly modified"})
 } catch (error) {

    res.status(500).json({message : "something went wrong"})
    console.log(error)
 }

  } catch (error) {
    console.log(error)
    res.status(500).json({message  : "something went wrong" })
  }

 
})




















export {getAllCalls,createCall,markCallAsMade}