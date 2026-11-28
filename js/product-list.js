
/* Hàm kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa.
   Nếu có thì trả về vị trí, nếu chưa có thì trả về -1 */
function isExistedInCart(item, cartItemArr) {
  let myIndex = -1;
  for (let i = 0; i < cartItemArr.length; i++)
    if (cartItemArr[i].id == item.id) {
      myIndex = i;
      break;
    }
  return myIndex;
}

let updatedCartItems = [];  // Chứa các mặt hàng trong giỏ hàng

// Xử lý và thêm sản phẩm được chọn vào giỏ hàng
const orderSelectedProduct = (evt) => {
  const linkClicked = evt.target;

  if (typeof Storage !== 'undefined') {
    let newItem = {
      id: linkClicked.previousElementSibling.children[0].textContent,
      name: linkClicked.previousElementSibling.children[1].textContent,
      price: linkClicked.previousElementSibling.children[2].textContent,
      quantity: 1
    };

    if (JSON.parse(localStorage.getItem('cartItems')) === null) {
      // Giỏ hàng chưa tồn tại thì tạo mới
      updatedCartItems.push(newItem);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      location.reload();
    } else {
      // Nếu giỏ hàng đã tồn tại thì lấy dữ liệu cũ
      const updatedCartItems = JSON.parse(localStorage.getItem('cartItems'));

      if ((index = isExistedInCart(newItem, updatedCartItems)) >= 0) {
        // Nếu sản phẩm đã có thì tăng số lượng lên 1
        updatedCartItems[index].quantity++;
      } else {
        // Nếu chưa có thì thêm sản phẩm mới
        updatedCartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      location.reload();
    }
  } else {
    alert('Local storage is not working on your browser.');
  }
}

function addEventToAllCartButtons() {
  const add2CartList = document.getElementsByClassName('add-cart');

  // Gắn sự kiện click cho tất cả nút thêm vào giỏ hàng
  for (let item = 0; item < add2CartList.length; item++) {
    add2CartList[item].addEventListener('click', orderSelectedProduct, false);
  }

  /* 2. Sử dụng Array ... [Ghi chú: trong PDF, dòng 66-76 bị thu gọn nên không hiển thị nội dung] */
}

// Hiển thị giá sản phẩm theo định dạng tiền Việt Nam
function setPrices() {
  const prices = document.querySelectorAll('.item-price');

  prices.forEach(item => {
    // Xóa dấu chấm và ký tự không phải số trước khi chuyển thành số
    const price = Number(item.innerText.replace(/[^\d]/g, ''));

    // Định dạng giá tiền
    item.innerText = price.toLocaleString('vi-VN') + ' đ';
  });
}

const setHover = () => {
  // Chuyển danh sách hình ảnh thành mảng
  const imgList = [...document.getElementsByClassName('item-image')];

  imgList.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.nextElementSibling.style = 'display:none;';
    });

    item.addEventListener('mouseout', () => {
      item.nextSibling.nextSibling.style = 'display:block;';
    });
  });
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
  setPrices();
  addEventToAllCartButtons();
  setHover();
  redirect2ShowCartPage();
}

window.addEventListener('load', setup, false);
