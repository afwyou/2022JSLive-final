
const api_path = 'erwin';
const token = 'yCZCYeLTxAb6UAUNbvYpJ2AyYSy1';
let productList = []
const productWrap = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const api_route = {
  getProduct: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`,

  getCarts: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,

  addCarts: {
    reference: {
      "data": {
        "productId": "產品 ID (String)",
        "quantity": 5
      }
    }
  },

  // deleteCarts: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`,

  sendOrder: {
    api: `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
    reference:
    {
      "data": {
        "user": {
          "name": customerName.value,
          "tel": customerPhone.value,
          "email": customerEmail.value,
          "address": customerAddress.value,
          "payment": tradeWay.value
        }
      }
    }

  }
}


//取得產品清單
function getProductList() {
  axios.get(api_route.getProduct)
    .then(res => {
      productList = res.data.products
      console.log(productList)
      renderProduct(productList)
    })
}
getProductList()
function renderProduct(arr) {
  let str = ''
  arr.forEach(item => {
    str += `
    <li class="productCard">
        <h4 class="productType">新品</h4>
        <img
          src="${item.images}"
          alt="">
        <a href="#" class="addCardBtn">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
      </li>
    `
  });
  productWrap.innerHTML = str
}
//產品篩選
productSelect.addEventListener('change', e => {
  let target = e.target
  let selectArr = []
  if (target.value === '全部') {
    selectArr = productList
  } else {
    selectArr = productList.filter(function (item) {
      return item.category === target.value
    })
  }
  renderProduct(selectArr)

})
//加入購物車（數量判斷）

//取得購物車清單（購物車金額）

//購物車刪除

//送出訂單

