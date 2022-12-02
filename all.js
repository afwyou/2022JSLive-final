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

// 初始化
function init() {
  getProductList()
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
            <a href="#" class="addCardBtn">加入購物車</a>
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
}

//加入購物車


//刪除購物車


//送出預定


