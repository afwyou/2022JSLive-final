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


let productLists = []
let cartLists = []
const productWrap = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const shoppingCart = document.querySelector('.js-shoppingCart')
const customerName = document.querySelector('#customerName')
const customerPhone = document.querySelector('#customerPhone')
const customerEmail = document.querySelector('#customerEmail')
const customerAddress = document.querySelector('#customerAddress')
const tradeWay = document.querySelector('#tradeWay')
const orderForm = document.querySelector('.orderInfo-form')
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
    if (item.product.id === id) {
      num += item.quantity
    }
  })
  if (target.getAttribute('class') === 'addCardBtn') {
    axios.post(api_route.getCarts,
      {
        "data": {
          "productId": id,
          "quantity": num
        }
      })
      .then(function (res) {
        alert('購物車加入成功')
        getCardList()
      })
  }

})

//取得購物車清單（購物車金額）
function getCardList() {
  axios.get(api_route.getCarts)
    .then(function (res) {
      cartLists = res.data.carts
      console.log('購物車清單', cartLists)
      let totalNum = 0
      let str = ''
      cartLists.forEach(item => {
        totalNum += item.product.price * item.quantity
        str += `
        <tr>
          <td>
            <div class="cardItem-title">
              <img src="${item.product.images}" alt="">
              <p>${item.product.title}</p>
            </div>
          </td>
          <td>NT$${item.product.price}</td>
          <td>${item.quantity}</td>
          <td>NT$${item.product.price * item.quantity}</td>
          <td class="discardBtn">
            <a href="#" class="material-icons" data-id="${item.id}">
              clear
            </a>
          </td>
        `
      })
      str += `
      <tr>
         <td>
             <a href="#" class="discardAllBtn">刪除所有品項</a>
               </td>
                <td></td>
                 <td></td>
                 <td>
                  <p>總金額</p>
                 </td>
                  <td>NT$${totalNum}</td>
             </tr>`
      shoppingCart.innerHTML = str
    })
}
getCardList()
//購物車刪除
shoppingCart.addEventListener('click', function (e) {
  e.preventDefault()
  const target = e.target
  const id = target.getAttribute('data-id')
  if (target.getAttribute('class') === 'material-icons') {
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`).then(res => {
      alert('刪除ＯＫ')
      getCardList()
    })
  }

  if (target.getAttribute('class') === 'discardAllBtn') {
    alert('您確認要清空購物車?????')
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/`).then(res => {
      alert('購物車已經清空囉')
      getCardList()
    })
  }

})


//送出訂單
orderForm.addEventListener('click', function (e) {
  e.preventDefault()
  const target = e.target
  if (target.getAttribute('class') === 'orderInfo-btn') {
    if (tradeWay === '' || customerAddress === '' || customerEmail === '' || customerPhone === '' || customerName === '') {
      alert('請填入正確表單資訊')
      return
    }
    axios.post(api_route.sendOrder.api, {
      "data": {
        "user": {
          "name": customerName.value,
          "tel": customerPhone.value,
          "email": customerEmail.value,
          "address": customerAddress.value,
          "payment": tradeWay.value
        }
      }
    })
      .then(function (res) {
        console.log('訂單傳送成功')

      })
      .catch(function (error) {
        console.log(error)
      })
  }


})
