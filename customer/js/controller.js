let renderPhoneList = (list) => {
  let contentHTML = "";
  list.forEach((phone) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      phone;
    let phoneCard = /*html*/
      `
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card h-100">
                <div class="content-overlay"></div>
                <img src="${img}" alt="" />
                <div class="content-details">
                        <h3 class="pb-5 text-light text-center">ABOUT ITEM</h3>
                    <div class="d-flex justify-content-start py-1">
                        <span class="text-light"><b>Screen:</b> ${screen}</span>
                    </div>
                    <div class="d-flex justify-content-start py-1">
                        <span class="text-light"><b>Back Camera:</b> ${backCamera}</span>
                    </div>
                    <div class="d-flex justify-content-start py-1">
                        <span class="text-light"><b>Front Camera:</b> ${frontCamera}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$${price.toLocaleString()}</h6>
                    <p class="card-text text-center">${type}</p>
                    <p><b>Description:</b> ${desc}</p>
                    <button type="button" class="btn btn-block w-50" onclick="addToCart('${id}')">Add to cart</button>
                </div>
            </div>
        </div>
        `;
    contentHTML += phoneCard;
  });
  document.getElementById("listItem").innerHTML = contentHTML;
};

let fetchPhone = () => {
  axios({
    url: "https://64d6fae32a017531bc12e71b.mockapi.io/Phone",
    method: "GET",
  })
    .then((res) => {
      renderPhoneList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

let renderCart = (cart) => {
  let contentHTML = "";
  let totalValue = 0;
  cart.forEach((phone) => {
    let { id, name, price, img, type, quantity } = phone;
    let total = quantity * price;
    let phoneCart = /*html*/
      `
        <div class="card mb-3">
        <div class="row">
        <div class="col-md-4 d-flex align-items-center justify-content-center">
            <img src="${img}" alt="" class="card-img" style="width: 100%; max-height: 100%;" alt="Image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Loại: ${type}</p>
              <p class="card-text">Giá: $${price.toLocaleString()} / 1 cái</p>
              <div class="quantity">
              <button onclick="decreaseQuantity(event)" data-id="${id}">-</button>
              <span id="quantity">${quantity}</span>
              <button onclick="increaseQuantity(event)" data-id="${id}">+</button>
              </div>
                <a onclick="removeFromCart(${id})">Remove</a>
                <p>Total: ${total.toLocaleString()} </p>
            </div>
            </div>
          </div>
        </div>
      </div>
        `;
    contentHTML += phoneCart;
    totalValue += total;
  });
  document.getElementById("CartModal").innerHTML = contentHTML;
  document.getElementById("totalValue").innerHTML = totalValue.toLocaleString();
};


