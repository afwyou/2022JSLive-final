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
let productList = []
const productWrap = document.querySelector('.productWrap')
const productSelect = document.querySelector('.productSelect')
const shoppingCartTable = document.querySelector('.shoppingCart-table')
// 初始化
function init() {
  getProductList()
  getCartList()
}
init()

//取得產品資料
function getProductList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)
    .then(function (res) {
      productList = res.data.products
      console.log(productList)
      renderData(productList)
    })
}
//渲染
function renderData(arr) {
  let str = ''
  arr.forEach(function (item) {
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
  })
  productWrap.innerHTML = str
}

// 產品篩選
productSelect.addEventListener('change', function (e) {
  let target = e.target
  let filteredProductList = []
  filteredProductList = productList.filter(function (item) {
    if (target.value === '全部') {
      return item
    } else {
      return item.category === target.value
    }
    // if (target.value === '床架') {
    //   return item.category === '床架'
    // } else if (target.value === '窗簾') {
    //   return item.category === '窗簾'
    // } else if (item.category === '收納') {
    //   // console.log(true)
    //   // 不知道為什麼無法篩選出收納
    //   return item.category === '收納'
    // } else {
    //   return item
    // }
  })
  renderData(filteredProductList)

})

//取得購物車
function getCartList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
    .then(function (res) {
      console.log(res.data.carts)
      renderCart(res.data.carts)
    })
}

//渲染購物車
function renderCart(arr) {
  let str = `<tr>
          <th width="40%">品項</th>
          <th width="15%">單價</th>
          <th width="15%">數量</th>
          <th width="15%">金額</th>
          <th width="15%"></th>
        </tr>`
  arr.forEach(function (item) {
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
        </tr>
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
              <td>NT$13,980</td>
            </tr>`
  shoppingCartTable.innerHTML = str
}
//加入購物車
productWrap.addEventListener('click', function (e) {
  const target = e.target
  const id = target.getAttribute('data-id')
  if (target.classList.value === 'addCardBtn') {
    // console.log('geteeeeeee')
    axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
      {
        "data": {
          "productId": id,
          "quantity": 5
        }
      })
    getCartList()
  }
})

//刪除購物車
shoppingCartTable.addEventListener('click', function (e) {
  const target = e.target
  const id = target.getAttribute('data-id')
  if (target.classList.value === 'material-icons') {
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`)
      .then(getCartList())
    // console.log(135135646351351)
  }
}
)

//送出預定


