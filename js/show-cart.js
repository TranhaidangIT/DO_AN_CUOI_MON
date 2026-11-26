
function showCart() {  // được gọi từ show-cart.html
  document.querySelector(".shopping-cart").style = "visibility: hidden;"
  if (localStorage.cartItems == undefined) {
    alert('Your cart is empty. Please go back homepage to shopping.');
    location.href = "/home.html"; //redirect the browser to the home.html
  } else {
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    const tblHead = document.getElementsByTagName('thead')[0];
    const tblBody = document.getElementsByTagName('tbody')[0];
    const tblHFoot = document.getElementsByTagName('tfoot')[0];

    let headColumns = bodyRows = footColumns = '';
    headColumns += '<tr><th>Số thứ tự</th><th>Mã sản phấm</th><th>Tên sản phẩm</th>' +
      '<th>Số lượng</th><th>Số tiền</th><th>Xóa sản phẩm</th></tr>';
    tblHead.innerHTML = headColumns;

    vat = total = amountPaid = no = 0;
    if (custommerCart[0] === null) {
      bodyRows += '<tr><td colspan="5">No items found</td></tr>'
    } else {
      custommerCart.forEach(item => {
        total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g, ""));
        bodyRows += '<tr><td>' + ++no + '</td><td>' + item.id + '</td><td>' + item.name +
          '</td><td>' +
            '<button class="btn-minus">-</button> ' +
            item.quantity +
            ' <button class="btn-plus">+</button>' +
          '</td><td>' +
          formatCurrency(item.price.replace(/[^0-9]/g, "")) +
          '</td><td><a href="#" onclick="deleteCartItem(this)">Delete</a></td></tr>';
      });
    }
    tblBody.innerHTML = bodyRows;

    footColumns += '<tr><td colspan="4">Total:</td><td>' + formatCurrency(total) + '</td><td rowspan="3"></td></tr>';
    footColumns += '<tr><td colspan="4">VAT (10%):</td><td>' + formatCurrency(Math.floor(total * 0.1)) + '</td></tr>';
    footColumns += '<tr><td colspan="4">Amount paid:</td><td>' + formatCurrency(Math.floor(1.1 * total)) + '</td></tr>';
    tblHFoot.innerHTML = footColumns;
  }
}

function deleteCartItem(elmt) {
  let updatedDeleteCart = [];
  let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
  custommerCart.forEach(item => {
    if (item.id != elmt.parentElement.parentElement.children[1].textContent) {
      updatedDeleteCart.push(item);
    }
  });
  localStorage.setItem('cartItems', JSON.stringify(updatedDeleteCart));
  location.reload();  // reload the current page
}
function changeQuantity(itemId, change) {
  let custommerCart = JSON.parse(localStorage.getItem('cartItems'));

  custommerCart.forEach(item => {
    if (item.id == itemId) {
      let newQuantity = Number(item.quantity) + change;

      if (newQuantity >= 1) {
        item.quantity = newQuantity;
      }
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(custommerCart));

  showCart();
}

document.querySelector('.list-body').addEventListener('click', function(event) {

  if (event.target.className == 'btn-plus') {
    let itemId = event.target.parentElement.parentElement.children[1].textContent;
    changeQuantity(itemId, 1);
  }

  if (event.target.className == 'btn-minus') {
    let itemId = event.target.parentElement.parentElement.children[1].textContent;
    changeQuantity(itemId, -1);
  }

});

//------------Currency & Percentage format-------------------------

const formatPercentage = (value, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value);
}

const formatCurrency = (amount, locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
