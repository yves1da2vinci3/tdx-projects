import multer from "multer"
import path, {dirname, join} from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("svp telecharger un fichier excel.", false);
  }
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination(req, file, cb) {

cb(null, path.resolve(__dirname,"../uploads/",) )

   
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}`
    )
  },
})
      
      const upload = multer({ storage: storage ,fileFilter :excelFilter})



 export default upload