
/**
 * It takes an array of price objects and returns a string that indicates the number of days since the
 * price has changed
 * @param priceArray - an array of objects that contain the price value and the date of the price.
 * @returns the number of days that the price has been the same.
 */
const dateDiff = (lastDate,DateWeNeed) => { 
  const dateInMilliseconds1 = new Date(lastDate)
  const dateInMilliseconds2 = new Date(DateWeNeed)
  const diffTime = Math.abs(dateInMilliseconds1 - dateInMilliseconds2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
 }
/**
 * It takes an array of objects as an argument, and returns a string that represents the percentage
 * change in price over the last day, week, or month
 * @param priceArray - an array of objects containing the price and date of the price.
 */
function priceVariation (priceArray){
    let indicatorVariation = 0 ; 
    const lastPrice = priceArray[priceArray.length-1].priceValue
    const lastDate = priceArray[priceArray.length-1].createdAt
  for(var index = priceArray.length -2 ; index >=0 ;index-- ){
    if(lastPrice !== priceArray[index].priceValue){ 
      indicatorVariation = index
      break;
    }
  }
  const dateDifference = dateDiff(lastDate,priceArray[indicatorVariation].createdAt)
if( dateDifference   > 31  ){
  return ``
}else if(dateDifference ===1) {
 return `24%`
}else{
 return `${dateDifference}d%`
} 
}




export default priceVariation