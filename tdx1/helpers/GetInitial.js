
 function getInitial (title) {
const spaceNumber = (title.split(" ")).lenght
    console.log((title.split(" ")).map(word => word[0] ).join("").toUpperCase() )

    
    // // Get the number of words based on the space
    

    return (title.split(" ")).map(word => word[0] ).join("").toUpperCase()

 }

 export default getInitial