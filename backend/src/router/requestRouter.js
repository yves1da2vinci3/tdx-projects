import {Router} from "express"
import { getAllRequests,getOneRequest,approveCancellation,rejectCancellation,createRequest} from '../controller/requestController.js'
const router = Router()


router.route('/').get(getAllRequests).post(createRequest)
router.route('/:requestId').get(getOneRequest)
router.route('/:requestId/approve').put(approveCancellation)
router.route('/:requestId/reject').put(rejectCancellation)




export default router;