import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
import { getDownloadURL, ref,uploadBytesResumable} from 'firebase/storage'
import { storage} from '../Firebase.js'
const prisma = new PrismaClient();


//@desc 
//@right
//@ route

const getHarvests = asyncHandler( async(req,res) => {
    try {
        const harvests = await prisma.haverst.findMany()
        res.status(200).json(harvests)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const CreateHarvest = asyncHandler( async(req,res) => {
    const {year} = req.body
    try {
        const harvest = await prisma.haverst.create({data : {year}})
        res.status(201).json(harvest)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const createCommodityType = asyncHandler( async(req,res) => {
  
    try {
        const commodityType = await prisma.commodityType.create({data : {...req.body}})
        res.status(201).json(commodityType)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const getCommodityType = asyncHandler( async(req,res) => {
    const commodityId = req.query.commodityId
    try {
        const commodityTypes = await prisma.commodityType.findMany({
            where : {
                commodityId : commodityId
            }
        })
        res.status(201).json(commodityTypes)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})



//@desc 
//@right
//@ route



const getGrades = asyncHandler( async(req,res) => {
    try {
        const grades = await prisma.grade.findMany()
        res.status(200).json(grades)
    } catch (error) {
     console.log(error)   
    }

})


//@desc 
//@right
//@ route



const getSeasons = asyncHandler( async(req,res) => {
    try {
        const seasons = await prisma.season.findMany()
        res.status(200).json(seasons)
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const getCommodityCategories = asyncHandler( async(req,res) => {
    try {
        const CommodityCategories = await prisma.commodityCategory.findMany()
        res.status(200).json(CommodityCategories)
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const createCommodityCategory = asyncHandler( async(req,res) => {

    try {
        const CommodityCategory = await prisma.commodityCategory.create({data : {...req.body}})
        res.status(200).json(CommodityCategory)
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const getCountries = asyncHandler( async(req,res) => {
    try {
        const coutries = await prisma.country.findMany()
        res.status(200).json(coutries)
    } catch (error) {
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const createCountry = asyncHandler( async(req,res) => {
    
    try {
        const country = await prisma.country.create({data :{...req.body}})
        res.status(201).json(country)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const getRoles = asyncHandler( async(req,res) => {
    try {
        const roles = await prisma.role.findMany()
        res.status(200).json(roles)
    } catch (error) {
     console.log(error)   
    }

})

const createCommodity = asyncHandler( async(req,res) => {
    // console.log(req.file)
    const imageRef = ref(storage,`/commoditiesImage/${req.body.commodityName.toLowerCase()+"."+req.file.originalname.split(".")[1] }`)
    const uploadTask =  uploadBytesResumable(imageRef,req.file.buffer)
    uploadTask.on("state_changed",
    (snapshot) =>{

    },
    (error) =>{
        console.log(error)
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(ImageUrl => {
          prisma.commodity.create({
            data : {
                commodityUrl : ImageUrl,
                commodityName : req.body.commodityName,
                categoryId : Number(req.body.categoryId),

            }
          }).then( success =>  res.status(201).json({message : "commodity created"})  ).catch(error => {
            console.log(error)
        res.status(500).json(error)

        })

        })
    }
    )
})
//@desc 
//@right
//@ route

const getcommodities = asyncHandler( async(req,res) => {
    try {
        const commodities = await prisma.commodity.findMany()
        res.status(200).json(commodities)
    } catch (error) {
     console.log(error)   
    }

})
const CreateWarehouse = asyncHandler( async(req,res) => {
    
    try {
        const warehouse = await prisma.warehouse.create({data :{...req.body}})
        res.status(201).json(warehouse)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route

const getWarehouse = asyncHandler( async(req,res) => {
    try {
        const warehouses = await prisma.warehouse.findMany()
        res.status(200).json(warehouses)
    } catch (error) {
     console.log(error)   
    }

})






const getCommoditiesTypesByCommoditId =  asyncHandler( async (req,res) => { 

    const commodityId = Number(req.params.commodotyId)

    try {

        const [commodityTypes,warehouses] = await Promise.all([
            prisma.commodityType.findMany({
            where : {
                commodityId : commodityId
            }
        }),
        prisma.warehouse.findMany({ select : {
            warehouseLocation : true, id : true
        } })   
    
    ])
        
        res.status(200).json({warehouses,commodityTypes})
    } catch (error) {
        console.log(error)
    }

 })











export {getHarvests,getGrades,getSeasons,getCommodityCategories,createCommodityCategory,CreateWarehouse,getWarehouse,getCommoditiesTypesByCommoditId,
    getRoles,getCountries,CreateHarvest,createCountry,createCommodityType,getCommodityType,createCommodity,getcommodities}