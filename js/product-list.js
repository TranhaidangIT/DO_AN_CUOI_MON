/*@File: cart.js, Shopping Cart using localStorage
  @Author: vdlinh@ctu.edu.vn | vdlinh@cit.ctu.edu.vn
  @Created date: 28-7-2021, updated 05-05-2026 */


/* Hàm kiểm tra item mới thêm vào đã tồn tại trong giỏ hàng (cartItemArr) chưa. Nếu có, trả về chỉ số
   của nó trong mảng cartItemArr, ngược lại trả về -1, nên sử dụng hàm Array.findIndex() */
function isExistedInCart(item, cartItemArr) {
  let myIndex = -1;
  for (let i=0; i < cartItemArr.length; i++)
    if (cartItemArr[i].id == item.id) {
      myIndex = i;
      break;
    }
  return myIndex;
}

let updatedCartItems = [];  //chứa các mặt hàng của giỏ hàng: Array of Objects

//Hàm nghiệp vụ: Xử lý và thêm sản phẩm được chọn vào giỏ hàng
const orderSelectedProduct = (evt) => {  // function with Event Objects
  const linkClicked = evt.target;
  alert("Item-id:" + linkClicked.previousElementSibling.children[0].textContent);

  if (typeof Storage !== undefined) {
    let newItem = {  //sản phẩm vừa được click chọn mua
      id: linkClicked.previousElementSibling.children[0].textContent,
      name: linkClicked.previousElementSibling.children[1].textContent,
      price: linkClicked.previousElementSibling.children[2].textContent,
      quantity: 1
    };

    if (JSON.parse(localStorage.getItem('cartItems')) === null) {
      //giỏ hàng chưa tồn tại --> tạo mới cartItems
      updatedCartItems.push(newItem);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      location.reload();
    } else {  //localStorage đã tồn tại
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems'));

      if ((index = isExistedInCart(newItem, updatedCartItems)) >= 0) {
        //trh 1: nếu newItem.id đã tồn tại trong giỏ thì cập nhật số lượng lên 1
        updatedCartItems[index].quantity++;
      } else {  //trh 2: newItem chưa tồn tại trong giỏ thì thêm mới vào giỏ
        updatedCartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      location.reload();
    }
  } else {
    alert('Local storage is not working on your browser.');
  }
}

function addEventToAllCartButtons() { //được gọi từ product-list.html
  const add2CartList = document.getElementsByClassName('add-cart');  //productList
  //1. Sử dụng HTMLCollection
  //Cách 1.a
  for (let item = 0; item < add2CartList.length; item++) {
    add2CartList[item].addEventListener('click', orderSelectedProduct, false);  //orderSelectedProduct
  }
  /*Cách 1.b: Array.prototype.forEach.call(add2CartList, (item) =>
                    item.addEventListener('click', orderSelectedProduct, false)) */

  /* 2. Sử dụng Array ... [Ghi chú: trong PDF, dòng 66-76 bị thu gọn nên không hiển thị nội dung] */
}

function setPrices() {
  const prices = document.querySelectorAll('.item-price')
  prices.forEach(item => {
    item.innerText = Number(item.innerText)
      .toLocaleString('de-DE', { style: 'currency', currency: 'VND' });
  }, false)
}

const setHover = () => {
  // The spread operator (...) to expand the collection into a new array
  const imgList = [...document.getElementsByClassName('item-image')]
  imgList.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.nextElementSibling.style = 'display:none;'
    })
    item.addEventListener('mouseout', () => {
      item.nextSibling.nextSibling.style = 'display:block;'
    })
  })
}

function redirect2ShowCartPage() {
  if (localStorage.cartItems != undefined) {
    const numberOrderedItems = document
      .querySelector('.shopping-cart .no-ordered-items');
    let numberOfItems = 0;
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    custommerCart.forEach(item => {
      numberOfItems += item.quantity;
    });
    numberOrderedItems.innerHTML = numberOfItems;
  }

  const shoppingCart = document.querySelector('.shopping-cart');
  shoppingCart.addEventListener("click", function () {
    location.href = "/page/show-cart.html";
  });
}

function setup() {
  setPrices()
  addEventToAllCartButtons()
  setHover()
  redirect2ShowCartPage()
}

window.addEventListener('load', setup, false)
