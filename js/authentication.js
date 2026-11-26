// Lấy danh sách tài khoản đã đăng ký
function getUsers() {
    var users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
        users = [];
    }

    return users;
}

// Kiểm tra người dùng đã đăng nhập hay chưa
function checkAuthentication() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    var authentication = document.getElementById("authentication");
    var userInfo = document.getElementById("user-info");
    var principal = document.getElementById("principal");
    var logout = document.getElementById("logout");

    if (currentUser != null) {
        // Đã đăng nhập thì ẩn nút đăng ký, đăng nhập
        if (authentication != null) {
            authentication.classList.add("hidden");
        }

        // Hiển thị tên người dùng và nút đăng xuất
        if (userInfo != null) {
            userInfo.classList.remove("hidden");
        }

        if (principal != null) {
            principal.innerText = currentUser.name;
        }
    } else {
        // Chưa đăng nhập thì hiển thị nút đăng ký, đăng nhập
        if (authentication != null) {
            authentication.classList.remove("hidden");
        }

        if (userInfo != null) {
            userInfo.classList.add("hidden");
        }
    }

    // Xử lý khi người dùng bấm đăng xuất
    if (logout != null) {
        logout.onclick = function (event) {
            event.preventDefault();

            localStorage.removeItem("currentUser");

            alert("Bạn đã đăng xuất!");
            window.location.href = "/home.html";
        };
    }
}

// Chờ trang tải xong rồi mới xử lý các form
window.addEventListener("load", function () {

    // Xử lý đăng ký tài khoản
    var registerForm = document.getElementById("register-form");

    if (registerForm != null) {
        registerForm.onsubmit = function (event) {
            event.preventDefault();

            var name = document.getElementById("register-name").value.trim();
            var email = document.getElementById("register-email").value.trim().toLowerCase();
            var password = document.getElementById("register-password").value;
            var confirmPassword = document.getElementById("confirm-password").value;

            // Kiểm tra các ô nhập liệu
            if (name == "" || email == "" || password == "" || confirmPassword == "") {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            // Kiểm tra độ dài mật khẩu
            if (password.length < 6) {
                alert("Mật khẩu phải có ít nhất 6 ký tự!");
                return;
            }

            // Kiểm tra mật khẩu xác nhận
            if (password != confirmPassword) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }

            var users = getUsers();
            var emailExists = false;

            // Kiểm tra email đã tồn tại trong danh sách chưa
            for (var i = 0; i < users.length; i++) {
                if (users[i].email == email) {
                    emailExists = true;
                    break;
                }
            }

            if (emailExists == true) {
                alert("Email này đã được đăng ký!");
                return;
            }

            // Tạo tài khoản mới
            var newUser = {
                name: name,
                email: email,
                password: password
            };

            // Lưu tài khoản vào localStorage
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            window.location.href = "/page/login.html";
        };
    }

    // Xử lý đăng nhập tài khoản
    var loginForm = document.getElementById("login-form");

    if (loginForm != null) {
        loginForm.onsubmit = function (event) {
            event.preventDefault();

            var email = document.getElementById("login-email").value.trim().toLowerCase();
            var password = document.getElementById("login-password").value;

            var users = getUsers();
            var loginSuccess = false;

            // Tìm tài khoản có email và mật khẩu trùng khớp
            for (var i = 0; i < users.length; i++) {
                if (users[i].email == email && users[i].password == password) {

                    // Lưu thông tin người dùng đang đăng nhập
                    var currentUser = {
                        name: users[i].name,
                        email: users[i].email
                    };

                    localStorage.setItem("currentUser", JSON.stringify(currentUser));

                    loginSuccess = true;
                    break;
                }
            }

            // Kiểm tra kết quả đăng nhập
            if (loginSuccess == true) {
                alert("Đăng nhập thành công!");
                window.location.href = "/home.html";
            } else {
                alert("Email hoặc mật khẩu không chính xác!");
            }
        };
    }
});
