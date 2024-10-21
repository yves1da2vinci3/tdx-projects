const secRate = 86400000
const seventhyYearSeconds = (-2208988800000 +(secRate*2))


// returnNumber()




function findDate (numDays){
const epochNumberSeconds = ((numDays*secRate) -seventhyYearSeconds)


const date = new Date(epochNumberSeconds)
const year = date.getFullYear()
const newYear = year-140 
date.setFullYear(newYear)
console.log("fron findDate function :",date)
return  date 
}


export default findDate