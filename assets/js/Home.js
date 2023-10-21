var eleProduct = document.getElementById('product');
const noLogin = document.querySelector('.form-user');
const login = document.querySelector('.header__navbar-user');
var signupRedirect = document.querySelector('.sign-up');
var signinRedirect = document.querySelector('.sign-in');

// Panel Sign Up
signupRedirect.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.setItem('isSignUp', true);
    window.location.href = '../iframe/register.html'
});

// Panel Sign In
signinRedirect.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('isSignUp');
    window.location.href = '../iframe/register.html'
});


// ------------------------------------------------------------------
// handle Click Navbar
function HandleClickNavbar(brand, e) {
    const navbarPro = arrayProduct.filter((value) => {
        // toUpperCase() tránh phân biệt in hoa, in thường
        return value.name.toUpperCase().includes(brand.toUpperCase())
    })

    if (eleProduct) {
        render(eleProduct, navbarPro);
    } 
    
    // Handle Display Title
    let homeTitle = document.querySelector(".category-title");

    let categoryTitle = 
        `
        <i class="fa-regular fa-lightbulb"></i>
        <p>
            Điện thoại hãng  
            <p class = 'result-search'> '${brand}'</p>
        </p>
        `

    if (homeTitle) {
        homeTitle.style.display = 'flex';
        homeTitle.innerHTML = categoryTitle; 
    } 

    // Xử lý chuyển active
    const navbarItem = document.querySelectorAll('.header-nav__item');
    navbarItem.forEach((btn) => {
        btn.classList.remove('item-active');
    });
    console.log(e);
    e.classList.add('item-active');

    
}

// ------------------------------------------------------------------
// handle Click Sibar

function HandleClickSidebar(brand, e) {
    const sidebarPro = arrayProduct.filter((value) => {
        // toUpperCase() tránh phân biệt in hoa, in thường
        return value.name.toUpperCase().includes(brand.toUpperCase())
    })

    if (eleProduct) {
        render(eleProduct, sidebarPro);
    } 
    
    // Handle Display Title
    let homeTitle = document.querySelector(".category-title");

    let categoryTitle = 
        `
        <i class="fa-regular fa-lightbulb"></i>
        <p>
            Điện thoại hãng  
            <p class = 'result-search'> '${brand}'</p>
        </p>
        `

    if (homeTitle) {
        homeTitle.style.display = 'flex';
        homeTitle.innerHTML = categoryTitle; 
    } 

    // Xử lý chuyển active
    const sidebarItem = document.querySelectorAll('.sidebar-item');
    sidebarItem.forEach((btn) => {
        btn.classList.remove('item-active');
    });
    e.classList.add('item-active');
}


// ------------------------------------------------------------------
// Search Product

function HandleSearchProduct(event) {
    let searchInputV = document.querySelector('.search-header__input').value;

    const searchPro = arrayProduct.filter((value) => {
        // toUpperCase() tránh phân biệt in hoa, in thường
        return value.name.toUpperCase().includes(searchInputV.toUpperCase())
        
    })

    var targetElement = document.getElementById("product");

    if (targetElement) {
        render(targetElement, searchPro)
    }

    window.scrollBy(0, 180);

    var targetTitle = document.querySelector(".category-title");
    let categoryTitle = 
        `
        <i class="fa-regular fa-lightbulb"></i>
        <p>
            Kết quả tìm kiếm cho từ khóa 
            <p class = 'result-search'> "${searchInputV}"</p>
        </p>
        `

    if (targetTitle) {
        targetTitle.style.display = 'flex';
        targetTitle.innerHTML = categoryTitle; 
    }
}

// ------------------------------------------------------------------
// Sắp xếp theo giá

function handleLowToHight(e) {    
    for(var i = 0; i < arrayProduct.length - 1; i++) {
        for(var j = i +1 ; j < arrayProduct.length; j++) {
            if(arrayProduct[i].priceCurrentNumber > arrayProduct[j].priceCurrentNumber) {
                let t = arrayProduct[i]
                arrayProduct[i] = arrayProduct[j]
                arrayProduct[j] = t;
            }
        }
    }

    let newArr = [...arrayProduct];

    // Xử lý chuyển active
    const classyfyItem = document.querySelectorAll('.classify-item');
    classyfyItem.forEach((btn) => {
        btn.classList.remove('btn-active');
    });
    e.classList.add('btn-active');

    render(eleProduct ,newArr);

}

function handleHightToLow(e) {
    for(var i = 0; i < arrayProduct.length - 1; i++) {
        for(var j = i +1 ; j < arrayProduct.length; j++) {
            if(arrayProduct[i].priceCurrentNumber < arrayProduct[j].priceCurrentNumber) {
                let t = arrayProduct[i]
                arrayProduct[i] = arrayProduct[j]
                arrayProduct[j] = t;
            }
        }
    }

    let newArr = [...arrayProduct];

    // Xử lý chuyển active
    const classyfyItem = document.querySelectorAll('.classify-item');
    if(classyfyItem) {
        classyfyItem.forEach((btn) => {
            btn.classList.remove('btn-active');
        });
        e.classList.add('btn-active');
    }

    render(eleProduct ,newArr);


}

// ------------------------------------------------------------------
// Handle LogIn LogOut

function handleLogOut() {
    //Handle LogOut
    if(localStorage.getItem('isLoggedIn')) {
        isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        localStorage.setItem('isLoggedIn', 'false');
    }
    location.reload();

}

function handleLogInHome() {
    //  Xử lý login
    if(localStorage.getItem('isLoggedIn')) {
        isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn == true) {
            if(noLogin) {
                noLogin.style.display = 'none';
            }
    
            if (login) {
                login.style.display = 'flex';
            }
        } else {
            // Người dùng chưa đăng nhập
            if (noLogin) {
                noLogin.style.display = 'block';
            }
    
            if (login) {
                login.style.display = 'none';
            }
        }
    }

    // userName
    let nickname = document.querySelector('.header__navbar-user-name');
    if (localStorage.getItem('userData')) {
        userData = JSON.parse(localStorage.getItem('userData'));
        nickname.textContent = userData.username;
    }
}

// ------------------------------------------------------------------
// Function Render 

function render(e ,arr){

    // Render Product 
    const htmls = arr.map((item,) => {
        return `
        <div class="wrap-product col"  onclick="localStorage.setItem('id', ${(item.id) - 1});">
            <a href = './iframe/product.html' class="product-item">
                <img class="product-item__img"
                    src=${item.img}
                    alt="Điện thoại iphone">
                <div class="wrap-product-user-rating">
                    <h5 class="product-item__title">${item.name}</h5>
                    <div class="product-item__price">
                        <span class="product-item__price-old">${item.priceOld}</span>
                        <span class="product-item__price-current">${item.priceCurrent}</span>
                    </div>
                    <div class="product-item__actions">
                        <div class="product-item__actions-like">
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-regular fa-heart" style="display: none;"></i>
                        </div>
                        <div class="wrap-product-rating">
                            <span class="product-item__sold">Đã bán ${item.sold}k</span>
                        </div>
                    </div>
                    <div class="wrap-product-item__brand">
                        <span class="product-item__brand">Beta Shop</span>
                        <span class="product-item__City">${item.city}</span>
                    </div>
                    <div class="product-item__favourite">
                        <i class="fa-solid fa-check"></i>
                        <span>Yêu Thích</span>
                    </div>
                    <div class="product-item__sale-off">
                        <span class="product-item__sale-off-percen">${item.saleOff}%</span>
                        <span class="product-item__sale-off-label">GIẢM</span>
                    </div>
                </div>
            </a>
        </div>`;
    })


    if(e) {
        e.innerHTML = htmls.join(''); 
    } 

    handleLogInHome();
    
}
render(eleProduct, arrayProduct);






