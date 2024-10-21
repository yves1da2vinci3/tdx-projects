import {Router} from "express"
import {getAllBasicOrders,createBasicOrder, getOneOrder, addNewSuborder,getAllSubBasicOrders,addBasicFee,getAllAdvancedSuborders,addAdvancedFee,
     getAllAdvancedOrders, createAdvancedOrder, getOneAdvancedOrder, addNewSubAdvancedOrder,getFeeDetails} from '../controller/orderController.js'
const router = Router()

router.post("/fee/basic",addBasicFee)
router.post("/fee/advanced",addAdvancedFee)
router.get("/:OrderId/basic/suborders",getAllSubBasicOrders)
router.route("/:OrderId/basic").get(getOneOrder).post(addNewSuborder)
router.route("/basic").get(getAllBasicOrders).post(createBasicOrder)

router.route("/:OrderId/advanced/suborders").get(getAllAdvancedSuborders)
router.route("/:OrderId/advanced").get(getOneAdvancedOrder).post(addNewSubAdvancedOrder)
router.route("/advanced").get(getAllAdvancedOrders).post(createAdvancedOrder)

router.post("/fee",getFeeDetails)




export default router;