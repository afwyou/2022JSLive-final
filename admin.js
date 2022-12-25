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
const discardAllBtn = document.querySelector('.discardAllBtn')

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
        let status
        let orderDate = new Date(item.createdAt * 1000)
        let dateStr = `${orderDate.getFullYear()}/${orderDate.getMonth() + 1}/${orderDate.getDate()}`

        if (item.paid === false) {
          status = '未處理'
        } else (
          status = '已處理'
        )

        // 產品字串
        let productStr = ''
        item.products.forEach(productItem => {
          productStr += `
          ${productItem.title}<br>
          `
        });

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
            <p>${productStr}</p>
          </td>
          <td>${dateStr}</td>
          <td class="orderStatus">
            <a href="#" class="orderStatus" data-id="${item.id}" data-status="${item.paid}">${status}</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" data-id="${item.id}"value="刪除">
          </td>
        </tr>
        `
      });
      jsTable.innerHTML = str
    })
}


//分別撰寫刪除跟改變狀態的函數，接者使用監聽帶入id和狀態參數
//訂單狀態監聽
jsTable.addEventListener('click', e => {
  e.preventDefault()
  let target = e.target
  let id = target.getAttribute('data-id')
  let status = target.getAttribute('data-status')
  let targetClass = target.getAttribute('class')
  let newStatus


  if (targetClass === 'orderStatus') {
    if (status === 'false') {
      newStatus = true
    } else {
      newStatus = false
    }
    changeStatus(id, newStatus)
  } else if (targetClass === 'delSingleOrder-Btn') {
    deleteOrder(id)
  }

})
//刪除訂單
function deleteOrder(id) {
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`, apiRoute.tokenObj)
    .then(res => {
      alert('訂單刪除成功')
      init()
    }).catch(error => {
      console.log(error)
    })
}
//訂單處理
function changeStatus(id, status) {
  axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
    "data": {
      "id": id,
      "paid": status,
    },
  }, apiRoute.tokenObj)
    .then(res => {
      alert('訂單狀態更改成功')
      init()
    }).catch(error => {
      console.log(error)
    })
}

//訂單全部刪除
discardAllBtn.addEventListener('click', e => {
  e.preventDefault()
  axios.delete(apiRoute.deleteAllOrder, apiRoute.tokenObj)
    .then(res => {
      alert('訂單全部刪除了')
      init()
    })
})
//圖表顯示