import {Router} from "express"
const router = Router()
import {ActiveAdmin, authAdmin,createAdmin,getAllAdmins, approveWithDrawal,DeclineWithDrawal,
    suspendAdmin,getDashboardData,getWithdrawals,getDeposits, DeclineDeposit, approveDeposit} from '../controller/adminController.js'

router.route("/").get(getAllAdmins).post(createAdmin)
router.get("/dashboard",getDashboardData)
router.post("/login",authAdmin)
router.get('/withdrawals',getWithdrawals)
router.put('/:withdrawalId/withdrawals/approve',approveWithDrawal)
router.put('/:withdrawalId/withdrawals/decline',DeclineWithDrawal)
router.get('/deposits',getDeposits)
router.put('/:depositId/deposits/approve',approveDeposit)
router.put('/:depositId/deposits/decline',DeclineDeposit)
router.put('/:adminId/suspend',suspendAdmin)
router.put('/:adminId/active',ActiveAdmin)




export default router;