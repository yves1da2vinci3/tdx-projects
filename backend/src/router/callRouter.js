import {Router} from "express"
const router = Router()
import {getAllCalls,createCall,markCallAsMade} from '../controller/callController.js'

router.route("/").get(getAllCalls).post(createCall)
router.put('/:callId',markCallAsMade)



export default router;