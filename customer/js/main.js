fetchPhone();
let cart = [];
let jsonData = localStorage.getItem("cart");
if(jsonData != null){
    cart = JSON.parse(jsonData);
    renderCart(cart);
}
let addToCart = (id) => {
  let existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
    renderCart(cart);
    var jsonData = JSON.stringify(cart);
    localStorage.setItem("cart", jsonData);
  } else {
    axios({
      url: `https://64d6fae32a017531bc12e71b.mockapi.io/Phone/${id}`,
      method: "GET",
    })
      .then((res) => {
        let product = res.data;
        cart.push({ ...product, quantity: 1 });
        console.log(cart);
        renderCart(cart);
        var jsonData = JSON.stringify(cart);
        localStorage.setItem("cart", jsonData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

let removeFromCart = (id) => {
    let index = cart.findIndex((item) => {
        return item.id == id;
    })
    cart.splice(index,1);
    renderCart(cart)
    var jsonData = JSON.stringify(cart);
    localStorage.setItem("cart", jsonData);
    console.log(id);
}

let decreaseQuantity = (event) => {
  event.preventDefault();
  let id = event.target.dataset.id;

  let existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      renderCart(cart);
      var jsonData = JSON.stringify(cart); 
      localStorage.setItem("cart", jsonData);
    } else {
      removeFromCart(id);
    }
  }
};

let increaseQuantity = (event) => {
  event.preventDefault();
  let id = event.target.dataset.id;
  let existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
    renderCart(cart);
    var jsonData = JSON.stringify(cart); 
    localStorage.setItem("cart", jsonData);
  }
};
