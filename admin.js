// C3.js
let chart = c3.generate({
  bindto: '#chart', // HTML 元素綁定
  data: {
    type: "pie",
    columns: [
      ['Louvre 雙人床架', 1],
      ['Antony 雙人床架', 2],
      ['Anty 雙人床架', 3],
      ['其他', 4],
    ],
    colors: {
      "Louvre 雙人床架": "#DACBFF",
      "Antony 雙人床架": "#9D7FEA",
      "Anty 雙人床架": "#5434A7",
      "其他": "#301E5F",
    }
  },
});

const api_path = 'erwin'
const token = 'yCZCYeLTxAb6UAUNbvYpJ2AyYSy1';
let orderList = []
const jsTable = document.querySelector('.jsTable')

const apiRoute = {
  //取得訂單
  getOrders: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
  //修改訂單參數
  changeOrder:
  {
    "data": {
      // "id": id,
      // "paid": newStatus,
    },
  },
  //刪除訂單
  // deleteOrder: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`,
  //刪除全部訂單
  deleteAllOrder: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/`
  ,
  tokenObj: {
    headers: {
      'Authorization': token,
    }
  }
}


function init() {
  getOrderList()
}
init()
//取得訂單資料（組字串：基本結構、日期、多項目）
function getOrderList() {
  axios.get(apiRoute.getOrders, apiRoute.tokenObj)
    .then(res => {
      orderList = res.data.orders
      console.log('orderList', orderList)
      let str = ''

      orderList.forEach(item => {
        let orderDate = new Date(item.createdAt * 1000)
        let dateStr = `${orderDate.getFullYear()}/${orderDate.getMonth() + 1}/${orderDate.getDate()}`
        str += `
        <tr>
          <td>${item.createdAt}</td>
          <td>
            <p>${item.user.name}</p>
            <p>${item.user.tel}</p>
          </td>
          <td>${item.user.address}</td>
          <td>${item.user.email}</td>
          <td>
            <p>${item.products.title}</p>
          </td>
          <td>${dateStr}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
        `
      });
      jsTable.innerHTML = str
    })
}
//刪除訂單

//訂單處理

//訂單狀態監聽

//訂單全部刪除

//圖表顯示