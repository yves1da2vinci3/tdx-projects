
import Joi from 'joi'
const passwordSchema = Joi.string().min(8).alphanum().messages({
    "string.empty" : "veuillez entrer votre mot de passe",
      "string.min" : "le mote de passe doit comporter au moins 8 caractèrs",
      "string.alphanum" : "le mote de passe doit comporter au moins 8 caractèrs",
  })

  export default passwordSchema