import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";

const prisma = new PrismaClient();
const salt = genSaltSync(10);
const Administrator = [
  {
    id: 1,
    email: "edward.mensah@gmail.com",
    firstName : "Edward",
    lastName : "Mensah",
    adminImageUrl :"https://media-exp1.licdn.com/dms/image/C4E03AQGNtaOAlhbsyw/profile-displayphoto-shrink_200_200/0/1655818886828?e=2147483647&v=beta&t=gaDGEh_AYL-bX7Wiol03CmifzS2gsSwMmFhsYbUFSDU",
    password : hashSync("thanksLord", salt) ,
    roleId :1
  },
  {
    id: 2,
    email: "sonia.Jackson@gmail.com",
    firstName : "Sonia",
    lastName : "Jackson",
    adminImageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFCvdE9labUo3q9g_Q4v55msO-H8h9pYC5cH0i2_RBMw6fGpsBKchhc0L4gLh6ammBEU&usqp=CAU",
    password : hashSync("maygodhelpus", salt) ,
    roleId : 2
  },
];
const seasons = [
    {
    seasonValue :"1"
},
    {
    seasonValue :"2"
},
    { 
    seasonValue :"3"
},
    {
    seasonValue :"4"
},
]


const grades = [
  {
    gradeValue: 1,
  },
  {
    gradeValue: 2,
  },
  {
    gradeValue: 3,
  },
  { gradeValue: 4},
  { gradeValue: 5},
];


const commodityCategories = [
    {
        commodityCategoryName :"Agriculutural"
    },
    {
        commodityCategoryName :"Energic"
    }
]
const countries = [
  {
    countryNumber: 233,
    countrySymbol : "G",
    countryName : "Ghana"
  },
  {
    countryNumber:225,
    countrySymbol :"CIV",
    countryName : "IvoryCoast"
  },
];


const roles = [
  {
    id : 1,
    roleName : "super admin"
  },
  {
    id : 2,
    roleName : "Senior Broker"
  },
  {
    id : 3,
    roleName : "Associate Broker"
  },
  {
    id : 4,
    roleName : "Asssistant Broker"
  },
]





const seed = async () => {
    await prisma.commodityCategory.createMany({data : commodityCategories})
    await prisma.grade.createMany({data : grades})
    await prisma.country.createMany({data : countries})
     await prisma.season.createMany({data : seasons})
     await prisma.role.createMany({data : roles})
    await prisma.admin.createMany({ data : Administrator })
};

export default seed;
 