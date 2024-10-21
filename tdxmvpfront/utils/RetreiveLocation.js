const getLocationsFromCart = (cart) => {
    const locations = new Set(); // Create a new Set to store unique locations
  
    cart.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        locations.add(item.cityName); // Add the location to the Set
      });
    });
  
    return Array.from(locations); // Convert the Set to an array and return it
  };


  export default getLocationsFromCart