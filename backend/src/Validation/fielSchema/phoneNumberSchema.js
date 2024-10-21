import Joi from "joi"
const phoneNumberSchema =  Joi.string().min(10).max(20).required().messages({

    "string.empty" : "veuillez entrer votre numero de telephone",
    "string.min": " veuillez entrer un numero a 10 chiffres ",
    "string.max": " veuillez entrer un numero a 10 chiffres ",
}
)

export default phoneNumberSchema