
/**
 * It takes an array of price objects and returns a string that indicates the number of days since the
 * price has changed
 * @param priceArray - an array of objects that contain the price value and the date of the price.
 * @returns the number of days that the price has been the same.
 */
 function pricePercentage (priceArray){
  let indicatorVariation = 0 ; 
  const lastPrice = priceArray[priceArray.length-1].priceValue
for(let index = priceArray.length-2 ; index >=0 ;index-- ){
  if(lastPrice !== priceArray[index].priceValue){ 
    indicatorVariation = index
    // console.log(indicatorVariation)
    break;
  }
}
  
  // console.log(priceArray[priceArray.length -indicatorVariation].priceValue)
  // console.log(priceArray[indicatorVariation].createdAt)
  const percentage = (((  priceArray[priceArray.length-1].priceValue -priceArray[indicatorVariation].priceValue  )/priceArray[indicatorVariation].priceValue)*100).toFixed(2)
// console.log(percentage)
  return percentage
}




export default pricePercentage