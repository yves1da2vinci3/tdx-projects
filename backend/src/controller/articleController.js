import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase.js";

const prisma = new PrismaClient();


//@desc 
//@right
//@ route

const getAllArticles = asyncHandler( async(req,res) => {
    try {
        
        const articles = await prisma.article.findMany({
        })
        const commodities = await prisma.commodity.findMany({
            select : {
                id : true,
                commodityName : true
            }
        })
        res.status(200).json({articles,commodities})
    } catch (error) {
     console.log(error)   
    }

})





//@desc 
//@right
//@ route

const createArticle = asyncHandler( async(req,res) => {
    const imageRef = ref(storage,`/ArticlesImage/${Math.random()+"."+req.file.originalname.split(".")[1] }`)
    const uploadTask =  uploadBytesResumable(imageRef,req.file.buffer)
    uploadTask.on("state_changed",
    (snapshot) =>{

    },
    (error) =>{
        console.log(error)
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(ImageUrl => {
            let commoditiesLinked = []
            
             for( let index =0; index < req.body.commoditiesLinked.length ; index++){
                commoditiesLinked.push(Number( req.body.commoditiesLinked[index] ) )
     }
            console.log(req.body.commoditiesLinked)
          prisma.article.create({
            data : {
                articleImgUrl : ImageUrl,
                title : req.body.title,
                link : req.body.link,
                commoditiesLinked : commoditiesLinked

            }
          }).then( success =>  res.status(201).json({message : "Article created"})  ).catch(error => {
            console.log(error)
        res.status(500).json(error)

        })

        })
    }
    )
 
})




















export {getAllArticles,createArticle}