// Hiển thị danh sách sản phẩm trong giỏ hàng
function showCart() {
    // Ẩn biểu tượng giỏ hàng ở trang giỏ hàng
    var shoppingCart = document.querySelector(".shopping-cart");

    if (shoppingCart != null) {
        shoppingCart.style.visibility = "hidden";
    }

    // Lấy dữ liệu giỏ hàng từ localStorage
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    var tblHead = document.querySelector(".list-head");
    var tblBody = document.querySelector(".list-body");
    var tblFoot = document.querySelector(".list-foot");

    if (cartItems == null) {
        cartItems = [];
    }

    // Tạo tiêu đề bảng
    tblHead.innerHTML =
        "<tr>" +
        "<th>STT</th>" +
        "<th>Mã sản phẩm</th>" +
        "<th>Tên sản phẩm</th>" +
        "<th>Số lượng</th>" +
        "<th>Đơn giá</th>" +
        "<th>Xóa</th>" +
        "</tr>";

    var bodyRows = "";
    var total = 0;

    // Kiểm tra giỏ hàng có sản phẩm hay không
    if (cartItems.length == 0) {
        bodyRows = "<tr><td colspan='6'>Giỏ hàng đang trống!</td></tr>";
        tblFoot.innerHTML = "";
    } else {
        // Duyệt từng sản phẩm để hiển thị lên bảng
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];

            // Chuyển giá thành số để tính tiền
            var price = Number(item.price.replace(/[^0-9]/g, ""));
            var quantity = Number(item.quantity);

            total += price * quantity;

            bodyRows +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.name + "</td>" +
                "<td>" +
                "<button onclick='changeQuantity(\"" + item.id + "\", -1)'>-</button> " +
                quantity +
                " <button onclick='changeQuantity(\"" + item.id + "\", 1)'>+</button>" +
                "</td>" +
                "<td>" + formatCurrency(price) + "</td>" +
                "<td><a href='#' onclick='deleteCartItem(\"" + item.id + "\")'>Xóa</a></td>" +
                "</tr>";
        }

        // Tính VAT và tổng tiền cần thanh toán
        var vat = Math.floor(total * 0.1);
        var amountPaid = total + vat;

        // Hiển thị phần tổng kết tiền
        tblFoot.innerHTML =
            "<tr><td colspan='4'>Tổng tiền hàng:</td><td>" +
            formatCurrency(total) + "</td><td></td></tr>" +
            "<tr><td colspan='4'>VAT (10%):</td><td>" +
            formatCurrency(vat) + "</td><td></td></tr>" +
            "<tr><td colspan='4'>Tổng thanh toán:</td><td>" +
            formatCurrency(amountPaid) + "</td><td></td></tr>";
    }

    tblBody.innerHTML = bodyRows;
}

// Tăng hoặc giảm số lượng sản phẩm trong giỏ
function changeQuantity(productId, change) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems == null) {
        return;
    }

    // Tìm sản phẩm cần thay đổi số lượng
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id == productId) {
            cartItems[i].quantity += change;

            // Nếu số lượng nhỏ hơn 1 thì giữ ở mức 1
            if (cartItems[i].quantity < 1) {
                cartItems[i].quantity = 1;
            }

            break;
        }
    }

    // Lưu số lượng mới và hiển thị lại giỏ hàng
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function deleteCartItem(productId) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var updatedCart = [];

    if (cartItems == null) {
        return;
    }

    // Chỉ giữ lại những sản phẩm không bị xóa
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id != productId) {
            updatedCart.push(cartItems[i]);
        }
    }

    // Lưu lại giỏ hàng sau khi xóa
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Hiển thị lại danh sách
    showCart();
}

// Định dạng số tiền thành tiền Việt Nam
function formatCurrency(amount) {
    return Number(amount).toLocaleString("vi-VN") + " ₫";
}
