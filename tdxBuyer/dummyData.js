const Offers = [
    {
       offerId : 1,
       orderPrice : 4000,
       warehouseLocation : "Bolga , Sandema",
       bags : 20,
       commodityTypeId : 1
    },
    {
       offerId : 2,
       orderPrice : 6000,
       warehouseLocation : "  Tamale , Karaga",
       bags : 40,
       commodityTypeId : 2
    },
    {
       offerId : 3,
       orderPrice : 2900,
       warehouseLocation : " Kumasi, Ejura ",
       bags : 10,
       commodityTypeId : 3
    },
    {
       offerId : 4,
       orderPrice : 4050,
       warehouseLocation : " Kumasi, Nsuta ",
       bags : 23,
       commodityTypeId : 4
    },
    {
       offerId : 5,
       orderPrice : 3200,
       warehouseLocation : " Bolga , Sandema",
       bags : 20,
       commodityTypeId : 1
    },
    {
       offerId : 6,
       orderPrice : 5300,
       warehouseLocation : "  Tamale , Karaga",
       bags : 10,
       commodityTypeId : 5
    },
    {
       offerId : 7,
       orderPrice : 3600,
       warehouseLocation : " Kumasi, Ejura ",
       bags : 14,
       commodityTypeId : 2
    },
    {
       offerId : 8,
       orderPrice : 4050,
       warehouseLocation : " Kumasi, Nsuta ",
       bags : 18,
       commodityTypeId : 1
    },
    {
       offerId : 9,
       orderPrice : 4000,
       warehouseLocation : " Bolga , Sandema",
       bags : 20,
       commodityTypeId : 1
    },
    {
       offerId : 10,
       orderPrice : 6000,
       warehouseLocation : "  Tamale , Karaga",
       bags : 40,
       commodityTypeId : 3
    },
    {
       offerId : 11,
       orderPrice : 3900,
       warehouseLocation : " Kumasi, Ejura ",
       bags : 12,
       commodityTypeId : 3
    },
    {
       offerId : 12,
       orderPrice : 5650,
       warehouseLocation : " Kumasi, Nsuta ",
       bags : 27,
       commodityTypeId : 6
    },
]



const commodities = [
    {
        id : 1,
        commodityName : "Soya Bean",
        commodityUrl : "https://static.vecteezy.com/system/resources/thumbnails/006/692/267/small/soy-beans-peas-line-icon-template-black-color-editable-soy-beans-peas-line-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg"
    },
    {
        id : 2,
        commodityName : "Maize ",
        commodityUrl : "https://img.freepik.com/vecteurs-premium/icone-mais-icone-epi-mais-symbole-vegetal-dans-style-glyphe-produit-frais-ferme_288189-659.jpg"
    },
    {
        id : 3,
        commodityName : "Rice ",
        commodityUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDSxh_cDpfN2NeWNE8opPXd0lXfgBcRgt0SnBMw-15g&s"
    },
]


const commoditTypes = [
    { 
        id : 1,
        commodityId : 1,
        commoditTypeName : "yellow soya Bean"
     },
    { 
        id : 2,
        commodityId : 1,
        commoditTypeName : "white soya Bean"
     },
    {
        id : 3,
        commodityId : 2,
        commoditTypeName : "white Maize"
     },
    {
        id : 4,
        commodityId : 2,
        commoditTypeName : "Yellow Maize"
     },
    {
        id : 5,
        commodityId : 3,
        commoditTypeName : "Kernel Rice"
     },
    {
        id : 6,
        commodityId : 3,
        commoditTypeName : "Carnel Rice"
     },
]


export { commoditTypes,commodities,Offers }