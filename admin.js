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
const orderPageTable = document.querySelector('.orderPage-table')


//取得訂單、渲染
function getOrderList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
    headers: {
      'Authorization': token,
    }
  }).then(function (res) {
    console.log(res.data.orders)
    orderList = res.data.orders
    //組合字串
    let str = ''
    str += ` <thead>
          <tr>
            <th>訂單編號</th>
            <th>聯絡人</th>
            <th>聯絡地址</th>
            <th>電子郵件</th>
            <th>訂單品項</th>
            <th>訂單日期</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>`

    //動態部分
    orderList.forEach(item => {
      str += `<tr>
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
          <td>2021/03/08</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>`
    });

    orderPageTable.innerHTML = str

  })
}
getOrderList()


//修改訂單



//刪除訂單


//刪除全部訂單