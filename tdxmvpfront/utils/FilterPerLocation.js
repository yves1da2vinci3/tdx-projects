const filterCartByLocation = (cart, location) => {
    const newCart =[]

    //  const newCart = cart.map(cartItem => cartItem.items.filter(item => item.cityName === location))
    cart.forEach((cartItem) => {
      const newItems = cartItem.items.filter((item) => item.cityName === location);
      if (newItems.length > 0) {
        newCart.push({ ...cartItem, items: newItems });
      }
    });
  
    return newCart;
  };

  export default filterCartByLocation