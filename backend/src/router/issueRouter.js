import {Router} from "express"
import { getAllIssues, createIssue,getOneIssue,solveIssue} from '../controller/issueController.js'
const router = Router()


router.route('/').get(getAllIssues).post(createIssue)
router.route('/:issueId').get(getOneIssue).put(solveIssue)




export default router;