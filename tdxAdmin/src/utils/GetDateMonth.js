const getDateMonth = (date) => { 
    return  Number(date.split('T')[0].split("-")[1]) -1;
 }


 export default getDateMonth;