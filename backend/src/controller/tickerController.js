import asyncHandler from "express-async-handler"
import {  PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

import Path, { dirname } from 'path'
import {fileURLToPath} from 'url'
import path from 'path';
import XLSX from 'node-xlsx'
import findDate from "../utils/findDate.js";

import xlsx from 'xlsx'
import excelToIsoString from "../utils/excelToIsoTring.js";

const thirteenAndOneArraysMonth = [0,2,4,6,7,9,11]
//@desc  get all the stickers
//@right private admin
//@ route GET api/tickers/

const getAllTickers = asyncHandler( async(req,res) => {
    try {
        const tickers = await prisma.ticker.findMany({
            include :{
                commodity : true,
                commodityType : true,
                grade : true,
                warehouse : true,
                country : true
            }
        })
        res.status(200).json(tickers)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})
//@desc  create a ticker
//@right  private
//@ route POST /api/tickers/

const createTicker = asyncHandler( async(req,res) => {
    try {
        const ticker = await prisma.ticker.create({data : {...req.body}})
        res.status(201).json(ticker)
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})


//@desc Add price for ticker
//@right private
//@ route POST /api/tickers/:tickerId/price



const addTickerPrice = asyncHandler( async(req,res) => {
    const tickerId = Number(req.params.tickerId);
    const {priceValue,createdAt} = req.body;
 
    try {
        const [price,ticker] = await Promise.all([await prisma.price.create({
            data : { priceValue,tickerId,
            createdAt : new Date(createdAt)  }
        }) , await prisma.ticker.findUnique({
            where : {
                id : Number(req.params.tickerId)
            },
            select : {
                title : true
            }
        })])
        // 1 :  get the alerts , 2:  send notifications
        //1-get every alerts who met  this quantity and a notification
        const alerts  =  await prisma.alert.findMany({
            where : {
                price : priceValue,
                tickerId : tickerId
            }
        })
        // 2 - send notifications
        //** group the notifications */
        let notifications = []
        for (let index = 0; index < alerts.length; index++ ){
            // **notification notifiction
            const notification = {
                notificationTitle : "Alerts",
                userId : alerts[index].userId,
                notificationContent : `Dear client your ticker ${ticker.title} reached  your price alert , price alert : ${priceValue} GHS `
            }
            notifications.push(notification)
        }
       await prisma.notification.createMany( {
        data : notifications
       })
            //* send push notifications

        res.status(201).json({message : " price saved successfully", price})
    } catch (error) {
        res.json(error)
     console.log(error)   
    }

})
//@desc 
//@right
//@ route



const getOneTicker = asyncHandler( async(req,res) => {
    // information relatives to one ticker ,the current Price compared to the last day price, all the prices, prices past 6month
    const tickerId = Number(req.params.tickerId);

    try {
        //bring the last 2 days price
        const fromYesterdayToTodayPrices = await prisma.price.findMany({
            where : {
                tickerId :tickerId
            },
        
            take :2,
            orderBy: {
                createdAt : "desc"
            }
            
        })
        // // get ticker with price
        const ticker = await prisma.ticker.findUnique({
            where :{
                id : tickerId
            },
            include : {
                prices :{
                    orderBy : {
                        createdAt : "desc"
                    }
                },
                warehouse : {select : { warehouseName : true }},
                grade : {select : { gradeValue : true}},
                commodity : {select : { commodityName : true}},
                commodityType : {select : { commodityTypeName : true}},
                country : {select : { countryName : true}}
            }
        })
// last 6 months price
// const prices = await prisma.$queryRaw ` SELECT * FROM public."Price" `

const last6MonthsPrices = await prisma.$queryRaw `SELECT DATE_TRUNC('month',"createdAt") as priceMonth, AVG("priceValue") AS AvgPrice from public."Price" where "createdAt" >  CURRENT_DATE - INTERVAL '6 months' AND  "tickerId" =${tickerId}
GROUP BY DATE_TRUNC('month',"createdAt") ORDER BY DATE_TRUNC('month',"createdAt") ASC;

`;
        res.status(200).json({fromYesterdayToTodayPrices,ticker,last6MonthsPrices})
    } catch (error) {
        res.json
     console.log(error)   
    }

})







const getTickersForUser = asyncHandler( async(req,res) => {
    const currentDate = new Date()
   // recuperer les informations de today et construire une date 3mois en arriere
   let LastThreeTimeStamp = (currentDate.getTime()-604800*6*24*90)
       
           const LastThreeMonthDate = new Date(
              LastThreeTimeStamp
           )
    const [commodities,warehouses ] = await Promise.all([prisma.commodity.findMany({ select : { id: true, commodityName : true ,commodityUrl :true } }),
        prisma.warehouse.findMany({ select : { id: true, warehouseLocation : true, warehouseSymbol:true }}), 
      ]  )
     
   const commoditiesTickers  = await prisma.commodity.findMany({
include :{
   tickers: {
  include : {
    prices :{
        orderBy : {
            createdAt : "asc"
        } ,
        where: {
            createdAt : {
                lte: currentDate ,
                gte: LastThreeMonthDate ,
            }
        }
    }
  }
   }
}
   })
 
    
    try {
        res.status(200).json({commoditiesTickers,warehouses,commodities})
    } catch (error) {
        res.status(500).json(error)
     console.log(error)   
    }

})


const getTickerForUser = asyncHandler( async(req,res) => {
    let data ;
    let LastWeek;
    const userId = req.body.userId
    const tickerId = Number(req.params.tickerId)
    let ticker ;
    let userTicker;
    let articles;
    try {
        ticker = await prisma.ticker.findUnique({where : {id: tickerId},include :{ commodity : {
            select : {
                commodityUrl : true,
                commodityName : true
            }
        },
    warehouse : {
        select : {
            warehouseSymbol : true,
            warehouseLocation : true
        }
    },
    commodityType : {
        select : {
        id : true,
            commodityTypeSymbol : true,
            commodityTypeName : true
        }
    },
    grade : {
        select : {
            gradeValue : true
        }
    },
    country : {
        select : {
            countryName : true,
            countrySymbol : true
        }
    }
    }
         })
        userTicker = await prisma.userTicker.findUnique({where :{ userId_tickerId : {userId : userId , tickerId :tickerId }} })
        articles = await prisma.article.findMany({ where: {
            commoditiesLinked :{
               has : ticker.commodityId
            }
        }})
             const currentDate = new Date()
            //  console.log(currentDate)
            //  console.table(currentDate.getMonth())
            //  console.table(currentDate.getDate())
            //  console.table(currentDate.getFullYear())
             // determine we are in january firstWeek 
          
            console.log( "current date :",currentDate)
            console.log( "current date timeStamp :",currentDate.getTime())
        let LastWeekTimeStamp = (currentDate.getTime()-604800*6*24*7)
          LastWeek = new Date(LastWeekTimeStamp)
          console.log("from last week :",LastWeek)
            data = await prisma.price.findMany({
            
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        lte: currentDate,
                        gte: LastWeek,
                    }
                }
            })
            res.status(200).json({data,ticker,userTicker,articles})
    } catch (error) {
     return console.log(error)   
    }
   
       
})

const getTickerPriceForUser = asyncHandler( async(req,res) => {
    let data ;
    const tickerId = Number(req.params.tickerId)
    const dateFilter = Number(req.query.dateFilter) 
   
    //all
    if(dateFilter === 5){
        try {
            data = await prisma.price.findMany({where : {
                tickerId : tickerId
            }})
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }
    //one year
    if(dateFilter === 4){
        const currentDate = new Date()

        // recuperer les informations de today et construire une date 3mois en arriere
           // recuperer les informations de today et construire une date 3mois en arriere
           let LastYearMonthsTimeStamp = (currentDate.getTime()-604800*6*24*360)
       
           const LastYearDate = new Date(
              LastYearMonthsTimeStamp
           )
        try {
            data = await prisma.price.findMany({
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        lte: currentDate ,
                        gte: LastYearDate,
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }
    // six months
    if(dateFilter === 3){
        const currentDate = new Date()
        // recuperer les informations de today et construire une date 3mois en arriere
           // recuperer les informations de today et construire une date 3mois en arriere
           let LastSixMonthsTimeStamp = (currentDate.getTime()-604800*6*24*180)
       
           const LastSixMonthDate = new Date(
              LastSixMonthsTimeStamp
           )
        try {
            data = await prisma.price.findMany({
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        lte: currentDate ,
                        gte: LastSixMonthDate,
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }
    // three months
    if(dateFilter === 2){
        const currentDate = new Date()
        // recuperer les informations de today et construire une date 3mois en arriere
        let LastThreeMonthsTimeStamp = (currentDate.getTime()-604800*6*24*90)
       
         const LastThreeMonthDate = new Date(
            LastThreeMonthsTimeStamp
         )
        try {
            data = await prisma.price.findMany({
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        lte: currentDate ,
                        gte: LastThreeMonthDate,
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }
    // one month
    if(dateFilter === 1){
        const currentDate = new Date()
        // recuperer les informations de today et construire une date 1mois en arriere
        //  const year = currentDate.getFullYear()
         const month = currentDate.getMonth()
       
        try {
            data = await prisma.price.findMany({
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        date_part : "month",
                        equals : month,
                    
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }
    // oone week 
    if(dateFilter === 0){
        const currentDate = new Date()
        // recuperer les informations de today et construire une date 1semaine en arriere
         
         let LastWeekTimeStamp = (currentDate.getTime()-604800*6*24*7)
         const LastWeekDate = new Date(
            LastWeekTimeStamp
         )
        try {
            data = await prisma.price.findMany({
                  orderBy : {
            createdAt : "asc"
        } ,
                where : {
                    tickerId : tickerId,
                    createdAt : {
                        lte: currentDate ,
                        gte: LastWeekDate,
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message : "erreur"})
        }
    }

})




const importPrice = asyncHandler( async(req,res) => {
const file = req.file
const workbook = xlsx.readFile(file.path)
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const dataWithExcelDateNumber = xlsx.utils.sheet_to_json(sheet)
const data = [];
  for(var index =1; index < dataWithExcelDateNumber.length; index++){
    data.push({ tickerId : Number(req.params.tickerId) , createdAt : excelToIsoString(dataWithExcelDateNumber[index].Date), priceValue : dataWithExcelDateNumber[index].Price   })
  }
console.log(data)
   try {
    console.log(data)
    await prisma.price.createMany({
        data : data
    })
    res.status(201).json({message : "file successfully imported"})
   } catch (error) {
    console.log(error)
    res.status(500).json({message : "error during importation",error})
   }

})



const getTickerByName =  asyncHandler( async (req,res) => { 
    const currentDate = new Date()
 
    // recuperer les informations de today et construire une date 3mois en arriere
    let LastThreeTimeStamp = (currentDate.getTime()-604800*6*24*90)
        
            const LastThreeMonthDate = new Date(
               LastThreeTimeStamp
            )
    try {
        const tickers = await prisma.ticker.findMany({
            where : {
                
                title : {
                    contains : req.body.searchText.toUpperCase()
                },
                
            },include : {
                prices :{
                    orderBy : {
                        createdAt : "asc"
                    } ,
                    where: {
                        createdAt : {
                            lte: currentDate ,
                            gte: LastThreeMonthDate ,
                        }
                    }
                }
            }
        })
        if(tickers.length>0) {
            res.status(200).json(tickers)
        }else{
            res.status(404).json({message : "nothing found"})
        } 
    } catch (error) {
        res.status(500).json({message : "something went wrong"})
        console.log(error)
    }

 })


const getTickersByCommoditiesAndLocation =  asyncHandler( async (req,res) => { 
    const currentDate = new Date()
    // recuperer les informations de today et construire une date 3mois en arriere
    let LastThreeTimeStamp = (currentDate.getTime()-604800*6*24*90)
       
    const LastThreeMonthDate = new Date(
       LastThreeTimeStamp
    )
     console.log(req.body)
    try {
        const tickers = await prisma.ticker.findMany({
            where : {
                commodityTypeId : req.body.commodityTypeId,
                warehouseId : req.body.warehouseId
            },
            include : {
                prices :{
                    orderBy : {
                        createdAt : "asc"
                    } ,
                    where: {
                        createdAt : {
                            lte: currentDate ,
                            gte: LastThreeMonthDate ,
                        }
                    }
                }
            }
        })
        if(tickers.length >0) return res.status(200).json(tickers)
        res.status(404).json({message: "tickers not found"})
    } catch (error) {
        console.log(error)
    }
 })



export {getAllTickers,createTicker,addTickerPrice,getOneTicker,getTickersForUser,getTickerForUser,getTickerPriceForUser,importPrice,getTickersByCommoditiesAndLocation,
    getTickerByName}