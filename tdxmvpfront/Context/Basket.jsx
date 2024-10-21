import { createContext, useEffect, useState } from "react";

export const BasketContext  = createContext()

import { commodities, commoditTypes, Offers } from "../dummyData";

import React from 'react'



function BasketProvider({children}) {
  // Commodity URl
  var commoditUrls = new Map()
   commoditUrls.set("Soya Beans","https://static.vecteezy.com/system/resources/thumbnails/006/692/267/small/soy-beans-peas-line-icon-template-black-color-editable-soy-beans-peas-line-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg")
   commoditUrls.set("Maize","https://img.freepik.com/vecteurs-premium/icone-mais-icone-epi-mais-symbole-vegetal-dans-style-glyphe-produit-frais-ferme_288189-659.jpg")
   commoditUrls.set("Rice","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDSxh_cDpfN2NeWNE8opPXd0lXfgBcRgt0SnBMw-15g&s")
  
    const [Cart,setCart] = useState([])
    const [OffersPicked,setOffersPicked] = useState([])

    useEffect(()=>{
       setCart([])
       setOffersPicked([])
    },[])
    const addToCart = (offer) => { 
    //    test if the commodity which offer belongs to exist
    const commodityIndex = Cart.findIndex(cartItem => cartItem.commodityId === offer.commodity.id )
    const copyCart = [...Cart]
    const offersPicked = [...OffersPicked]
// if commodityId exists
    if(commodityIndex !== -1){
        
      //  Verify offer belong to the specific location 
      const locationIndex = copyCart[commodityIndex].items.findIndex(item => item.cityName === offer.city.cityName)
      if(locationIndex !== -1){
        copyCart[commodityIndex].items[locationIndex].offerItems.push(offer)
      }
      else{
        const location ={
          cityName : offer.city.cityName,
          offerItems : [offer]
        }
        copyCart[commodityIndex].items.push(location)
      }
    }
// if commodityId not exists
  
    else{
      const location ={
        cityName : offer.city.cityName,
        offerItems : [offer]
      }
        const cartItem = {
            commodityId : offer.commodity.id,
            commodityName : offer.commodity.commodityName,
            commodityUrl : commoditUrls.get(offer.commodity.commodityName),
            items : [location]
        }

          copyCart.push(cartItem)
    }
    // Update the state
    setCart(copyCart)
    console.log("Add to Cart : ",copyCart)
    offersPicked.push(offer.id)
    setOffersPicked(offersPicked)
    console.log(copyCart)
     }


  
  
    const deleteFromCart = (offerId) => {
      const newCart = Cart.map((cartItem) => {
        const newItems = cartItem.items.map((item) => {
          const newOfferItems = item.offerItems.filter((offerItem) => offerItem.id !== offerId);
          return { ...item, offerItems: newOfferItems };
        }).filter((item) => item.offerItems.length > 0);
        return { ...cartItem, items: newItems };
      }).filter((cartItem) => cartItem.items.length > 0);
      const newOffersPicked = OffersPicked.filter((pickedId) => pickedId !== offerId);
    console.log("Delete from Cart : ",newCart)

      setCart(newCart);
      setOffersPicked(newOffersPicked);
    };
    

      const isAlaredyPicked = (offerId) => { 
        return OffersPicked.some(id => id ===offerId)
       }

       const ClearCart = () => { 
        setCart([])
        setOffersPicked([])
        }
  return (
    <BasketContext.Provider value={{ addToCart,deleteFromCart,isAlaredyPicked,Cart ,ClearCart}} >
        {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider

