import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


//@desc 
//@right
//@ route

const getAllIssues = asyncHandler( async(req,res) => {
    try {
        const issues = await prisma.issue.findMany({
            include : {
                user : true
            }
        })
        res.status(200).json(issues)
    } catch (error) {
     console.log(error)   
     res.status(500).json({message: "error happenned"})
    }

})





//@desc 
//@right
//@ route

const createIssue = asyncHandler( async(req,res) => {
    console.log(req.body)
    try {
        const issue =   await prisma.issue.create({
            data : {
               userId : req.body.user.id,
               content : req.body.content,

            }
        })
    
        
    /*
    send notification to the admin panel
    */ 
        await prisma.adminNotification.create({
            data : {
                type : 5,
                notificationContent : `${req.body.user.firstName + " " + req.body.user.lastName } report a issue`,
                parentId : issue.id,
                userId: req.body.user.id
            }
        })
        res.status(201).json({ message: "the issue was succesfully sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
 
})
//@desc 
//@right
//@ route

const getOneIssue = asyncHandler( async(req,res) => {
    
    try {
        const issue = await prisma.issue.findUnique({
            where:{
                id : Number(req.params.issueId)
            },
            include : {
                user : true
            }
        }
        )
        if(!issue) return     res.status(200).json({message: " issue not found"})
         res.status(200).json(issue)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
 
})
//@desc 
//@right
//@ route

const solveIssue = asyncHandler( async(req,res) => {
    
    try {
        // mark the issue as resolve
        await prisma.issue.update({
            where :{
                id :  Number(req.params.issueId)
            },
            data : {
                status : true
            }
        })
        // change the status of the order
        await prisma.adminNotification.updateMany({
            where : {
                type : 5,
                parentId :  Number(req.params.issueId)
            },
            data : {
                notificationStatus : true
            }
        })
res.status(200).json({message : "issue marked as resolved"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'isssue  not update'})
    }
 
})






















export {getAllIssues,createIssue,getOneIssue,solveIssue}