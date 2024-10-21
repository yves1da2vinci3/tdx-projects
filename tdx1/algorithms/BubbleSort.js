
 function bubbleSort (arraysOfOrders) {
    // variable temporaire
    let temp;

    for (let index = 0; index < arraysOfOrders.length-1; index++ ){
        // convert date into timeStamp 
       for (let index2 = 0; index2 < (arraysOfOrders.length - index -1 ) ;index2++ ) { 
         if( (new Date(arraysOfOrders[index2].createdAt)).getTime() > (new Date(arraysOfOrders[index2+1].createdAt)).getTime() ){
         temp =  arraysOfOrders[index2]
        arraysOfOrders[index2] = arraysOfOrders[index2+1]
        arraysOfOrders[index2+1] = temp
         }
    }
}
    return  arraysOfOrders

 }



 export default bubbleSort;