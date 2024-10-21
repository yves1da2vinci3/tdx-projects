import multer from "multer"
import path, {dirname, join} from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
const imgFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('image/png') ||
    file.mimetype.includes('image/jpeg') 
  ) {
    cb(null, true);
  } else {
    cb("please dowload ", false);
  }
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(fs.existsSync(path.resolve(__dirname,`../uploads/users/${req.body.userId}/bankDepositImage/`)))
 if(!fs.existsSync(path.resolve(__dirname,`../uploads/users/${req.body.userId}/bankDepositImage/`))){
fs.writeFileSync(path.resolve(__dirname,`../uploads/users/${req.body.userId}/bankDepositImage/`))
 } 
cb(null, path.resolve(__dirname,`../uploads/users/${req.body.userId}/bankDepositImage/`) )

   
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}`
    )
  },
})
      
      const upload = multer({ storage: storage ,fileFilter :imgFilter})



 export default upload