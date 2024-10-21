import {Router} from "express"
import {getUsers,createUser,authUser,modifyPassword,getUserDepositsAndWithDrawals,makeWithDrawal,makeDeposit,getUserOrders,getSingleUser,resetPassword,verifyOTPByContent,getTrade,
     getUserTickers,getUserNotification, RemoveUserNotification,getUserAlerts,addTickerToAlerts, RemoveTickerToAlerts, ModifyTickerToAlerts, verifyOTP, resendOTP,forgotPassword} from '../controller/userController.js'
const router = Router()
import multer from "multer"
const upload = multer()

router.route('/').get(getUsers).post(upload.single("file"), createUser)
router.get('/:userId/notifications',getUserNotification)
router.get('/:userId/transactions',getUserDepositsAndWithDrawals)
router.post("/withdrawal",makeWithDrawal)
router.post("/deposit",upload.single("file"),makeDeposit)
router.get("/:userId",getSingleUser)
router.get("/:userId/trade",getTrade)
router.route('/:userId/alerts').get(getUserAlerts).post(addTickerToAlerts).put(ModifyTickerToAlerts)
router.delete("/:alertId/alerts",RemoveTickerToAlerts)
router.delete('/:userId/notifications/:notificationId',RemoveUserNotification)
router.route('/login').post(authUser)
router.put('/:userId/password',modifyPassword)
router.put('/:userId/resetPassword',resetPassword)
router.post('/forgotpassword',forgotPassword)
router.post("/verifyCode",verifyOTP)
router.post("/verifyCodeByContent",verifyOTPByContent)
router.post("/resendCode",resendOTP)
router.post("/assets",getUserTickers)
router.get("/:userId/orders",getUserOrders)
router.post("/:userId/orders/cancel",getUserOrders)



export default router;