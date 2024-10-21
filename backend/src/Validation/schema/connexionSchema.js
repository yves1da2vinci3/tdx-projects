import Joi from "joi";

// un numero de telephone and mot de passe

const phoneNumberSchema =  Joi.string().min(10).max(20).required().messages({

    "string.empty" : "veuillez entrer votre numero de telephone",
    "string.min": " veuillez entrer un numero a 10 chiffres ",
    "string.max": " veuillez entrer un numero a 10 chiffres ",
}
)

const passwordSchema = Joi.string().min(8).alphanum().messages({
  "string.empty" : "veuillez entrer votre mot de passe",
    "string.min" : "le mote de passe doit comporter au moins 8 caractèrs",
    "string.alphanum" : "le mote de passe doit comporter au moins 8 caractèrs",
})



const connexionSchema = Joi.object({
  phoneNumber : phoneNumberSchema,
  password : passwordSchema
})



export default connexionSchema