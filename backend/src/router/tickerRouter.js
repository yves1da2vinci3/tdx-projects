import {Router} from "express"
import { addTickerPrice, createTicker, getAllTickers ,getOneTicker,getTickersByCommoditiesAndLocation,
    getTickersForUser,getTickerForUser,getTickerPriceForUser,importPrice,getTickerByName

} from '../controller/tickerController.js'
const router = Router()
import uploadExcel from '../utils/uploadExcel.js'
router.route('/').get(getAllTickers).post(createTicker)
router.post('/:tickerId/users',getTickerForUser)
router.post('/:tickerId/import',uploadExcel.single("file"),importPrice)
router.get('/:tickerId/price',getTickerPriceForUser)
router.get('/users',getTickersForUser)
router.post('/byName',getTickerByName)
router.post('/searchByCommoditiesTypesAndLocation',getTickersByCommoditiesAndLocation)
router.post('/:tickerId/price',addTickerPrice)
router.get('/:tickerId',getOneTicker)





export default router;