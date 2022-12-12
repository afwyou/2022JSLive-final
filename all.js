let chart = c3.generate({
  bindto: '#chart', // HTML 元素綁定
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ] // 資料存放
  }
});
const api_path = 'erwin';
const token = 'yCZCYeLTxAb6UAUNbvYpJ2AyYSy1';

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
let productLists = []
let cartLists = []
const productWrap = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')


//取得產品清單
function renderProductList() {
  axios.get(api_route.getProduct)
    .then(function (res) {
      productLists = res.data.products
      console.log('產品清單:', productLists)
      renderProduct(productLists)
    })
}
function renderProduct(arr) {
  let str = ''
  arr.forEach(item => {
    str += `
     <li class="productCard">
        <h4 class="productType">新品</h4>
        <img
          src="${item.images}"
          alt="">
        <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
      </li>`
  });
  productWrap.innerHTML = str
}
renderProductList()

//產品篩選
productSelect.addEventListener('change', function (e) {
  const target = e.target
  let filterProductLists = []
  if (target.value === '全部') {
    filterProductLists = productLists.filter(function (item) {
      return item
    })
  } else {
    filterProductLists = productLists.filter(function (item) {
      return item.category === target.value
    })
  }
  renderProduct(filterProductLists)

})

//加入購物車（數量判斷）
productWrap.addEventListener('click', function (e) {
  e.preventDefault()
  const target = e.target
  const id = target.getAttribute('data-id')
  let num = 1
  cartLists.forEach(function (item) {
    if (item.id === id) {
      num += item.quantity
    }
  })
  if (target.getAttribute('class') === 'addCardBtn') {
    console.log('12344')
  }

})

//取得購物車清單（購物車金額）

//購物車刪除

//送出訂單