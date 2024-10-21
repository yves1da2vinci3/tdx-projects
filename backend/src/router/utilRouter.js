import {Router} from "express"
const router = Router()
import { getHarvests,getGrades,getSeasons,getCommodityCategories,getRoles,getCountries,createCommodityType,
    CreateHarvest,createCommodityCategory,createCountry,getCommodityType,createCommodity,getcommodities,getWarehouse,CreateWarehouse, getCommoditiesTypesByCommoditId
} from '../controller/utilController.js'
import multer from 'multer'
const upload = multer()
router.route("/grades").get(getGrades)
router.route("/roles").get(getRoles)
router.route("/harvests").get(getHarvests).post(CreateHarvest)
router.route("/warehouses").get(getWarehouse).post(CreateWarehouse)
router.get("/seasons",getSeasons)
router.get("/grades",getGrades)
router.route("/commodityCategories").get(getCommodityCategories).post(createCommodityCategory)
router.route("/commodities").get(getcommodities).post(upload.single("file") ,createCommodity)
router.route("/commodityTypes").get(getCommodityType).post(createCommodityType)
router.route("/:commodotyId/commodityTypes").get(getCommoditiesTypesByCommoditId)
router.route("/countries").get(getCountries).post(createCountry)






export default router;