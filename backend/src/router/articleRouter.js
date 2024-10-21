import {Router} from "express"
const router = Router()
import {getAllArticles,createArticle} from '../controller/articleController.js'
import multer from 'multer'
const upload = multer()
router.route("/").get(getAllArticles).post(upload.single("file") ,createArticle)




export default router;