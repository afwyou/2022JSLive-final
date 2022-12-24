
const api_path = 'erwin';
const token = 'yCZCYeLTxAb6UAUNbvYpJ2AyYSy1';
let productList = []
let cartList = []
const productWrap = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const jsTable = document.querySelector('.js-table')
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


function init() {
  getProductList()
  getCartList()
}
init()

//取得產品清單
function getProductList() {
  axios.get(api_route.getProduct)
    .then(res => {
      productList = res.data.products
      console.log(productList)
      renderProduct(productList)
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
productWrap.addEventListener('click', e => {
  e.preventDefault()
  let target = e.target
  let id = target.getAttribute('data-id')
  let num = 1
  cartList.forEach(item => {
    if (item.product.id === id) {
      num += item.quantity
    }
  })
  console.log('num', num)
  //數量判斷 為了讓購物車可以即時更新正確的數量，所以必須加購時直接將參數帶上增加後的數字
  if (target.getAttribute('class') === 'addCardBtn') {
    axios.post(api_route.getCarts, {
      "data": {
        "productId": id,
        "quantity": num
      }
    }).then(res => {
      console.log('加入購物車成功')
      init()
    }).catch(error => {
      console.log(error)
    })
  }
})

//取得購物車清單（購物車金額）
function getCartList() {
  axios.get(api_route.getCarts)
    .then(res => {
      cartList = res.data.carts
      console.log('購物車：', cartList)
      renderCart(cartList)
    })
}

function renderCart(arr) {
  let str = ''
  arr.forEach(item => {
    str += `
   <tr>
          <td>
            <div class="cardItem-title">
              <img src="${item.product.images}" alt="">
              <p>${item.product.title}</p>
            </div>
          </td>
          <td>NT$${item.product.origin_price}</td>
          <td>1</td>
          <td>NT$${item.product.price}</td>
          <td class="discardBtn">
            <a href="#" class="material-icons" data-id="${item.id}">
              clear
            </a>
          </td>
        </tr>
  `
  });
  jsTable.innerHTML = str
}
//購物車刪除

//送出訂單

