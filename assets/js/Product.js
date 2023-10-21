const id = localStorage.getItem('id');

var images = [];
var index = 0;
var sohinh = 3;
var small_img = document.getElementsByClassName("product-details__small-img");
for (var i = 0; i < sohinh; i++) {
  images[i] = new Image();
  images[i].src = arrayProduct[id][`imgSmall${i + 1}`];
}

function clearBorder() {
  for (var i = 0; i < small_img.length; i++) {
    small_img[i].classList.remove("isChoose");
  }
}

function next() {
  index++;
  if (index >= images.length) index = 0;
  var imgLarge = document.getElementById("img-large");
  imgLarge.src = images[index].src;
  clearBorder();
  small_img[index].classList.add("isChoose");
}

function prev() {
  console.log("index");
  index--;
  if (index < 0) index = images.length - 1;
  var imgLarge = document.getElementById("img-large");
  imgLarge.src = images[index].src;
  clearBorder();
  small_img[index].classList.add("isChoose");
}

const eleProDetai = document.getElementById('product-details');
    const htmls =  `
        <div class="product-details__wrap">
            <div class="product-details__wrap-1">
                <div class="product-details__left">
                    <div class="product-details__large">
                        <button class="btn-lager__prev" onclick="prev()">
                            <i class="fa-solid fa-angle-left product-details__large-icon-2"></i>
                        </button>
                        <img class="product-details__large-img" id="img-large" src=${arrayProduct[id].img}
                            alt="Iphone 14">
                        <span class="product-details__large-icon">
                            <i class="fa-solid fa-heart"></i>
                        </span>
                        <button class="btn-lager__next" onclick="next()">
                            <i class="fa-solid fa-angle-right product-details__large-icon-2"></i>
                        </button>
                    </div>
                    <div class="product-details__small">
                        <div>
                            <img src= ${arrayProduct[id].imgSmall1} alt=""
                                class="product-details__small-img isChoose">
                            <img src= ${arrayProduct[id].imgSmall2} alt=""
                                class="product-details__small-img">
                            <img src= ${arrayProduct[id].imgSmall3}
                                alt="" class="product-details__small-img">
                        </div>
                    </div>
                </div>
                <div class="product-details__right">
                    <div class="product-details__description">
                        <h1 class="product-details__title">${arrayProduct[id].name}</h1>
                        <div class="product-details__price">
                            <span class="product-details__price-current">${arrayProduct[id].priceCurrent}</span>
                            <span class="product-details__price-old">${arrayProduct[id].priceOld}</span>
                        </div>
                        <span class="product-details__status">Đang cập nhập</span>
                        <div class="product-details__quantity-box">
                            <span class="product-details__quantity-title">Số Lượng: </span>
                            <button class="btn btn-size-s btn-minus">-</button>
                            <button class="btn btn-quantity">1</button>
                            <button class="btn btn-size-s btn-plus">+</button>
                            <button class="btn btn-size-l btn-active btn-buy">
                                <a class="btn-buy__link">Mua Ngay</a>
                                <!-- <a href="./Purchase.html" class="btn-buy__link">Mua Ngay</a> -->

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-details__description">
            <div class="product-details__description-wrap">
                <h1 class="product-details__description-title">Mô Tả Sản Phẩm</h2>
                    <p class="product-details__description-text"> ${arrayProduct[id].descTop}</p>
                    <div class="product-details__description-box-img">
                        <img class="product-details__description-img"
                            src=  ${arrayProduct[id].imgDesc} alt="">
                    </div>
                    <p class="product-details__description-text"> ${arrayProduct[id].descBottom}</p>
            </div>
        </div>`;
    if(eleProDetai) {
        eleProDetai.innerHTML = htmls;

    }





