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
const js_table = document.querySelector('.js-table')
const orderPageList = document.querySelector('.orderPage-list')

//取得訂單、渲染
function getOrderList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
    headers: {
      'Authorization': token,
    }
  }).then(function (res) {
    console.log(res.data.orders)
    orderList = res.data.orders

    //組字串
    let productStr = ''
    let str = ''
    let orderStatus = ''
    orderList.forEach(item => {

      //組字串（訂單表格內的品項部分）
      item.products.forEach(productItem => {
        productStr += `${productItem.title} x ${productItem.quantity}<br>`
      });
      //判斷訂單狀態
      if (item.paid === true) {
        orderStatus = '已處理'
      } else {
        orderStatus = '未處理'
      }
      //組時間字串





      //組合字串（表格部分）
      str += `<tr>
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
          <td>2021/03/08</td>
          <td class="orderStatus" >
            <a href="#" class="js-orderStatus" data-status = "${item.paid}" data-id="${item.id}">${orderStatus}</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" data-id = "${item.id}" value="刪除">
          </td>
        </tr>`
    });

    js_table.innerHTML = str

  })
}
getOrderList()


//修改訂單狀態
function changeOrderStatus(id, status) {
  console.log('status:', status)
  let newStatus
  if (status == false) {
    newStatus = true
    console.log('newStatus:', newStatus)
  } else {
    newStatus = false
    console.log('status:', status)
    console.log('newStatus:', newStatus)
  }
  console.log('newStatus:', newStatus)
  axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
    "data": {
      "id": id,
      "paid": newStatus,
    }
  }, {
    headers: {
      'Authorization': token,
    }
  })
  getOrderList()

}
orderPageList.addEventListener('click', function (e) {
  e.preventDefault()
  const targetClass = e.target.getAttribute('class')
  const id = e.target.getAttribute('data-id')
  let status = e.target.getAttribute('data-status')
  // console.log(targetClass, id, status)
  if (targetClass === 'js-orderStatus') {
    changeOrderStatus(id, status)
    alert('訂單修改成功')

  } else if (targetClass === 'delSingleOrder-Btn') {
    alert('你點擊到刪除訂單')
  }
})


//刪除訂單


//刪除全部訂單