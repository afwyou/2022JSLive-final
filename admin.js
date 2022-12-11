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
const apiRoute = {
  //取得訂單
  getOrders: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,

  //修改訂單參數
  changeOrder:
  {
    "data": {
      "id": id,
      "paid": newStatus,
    },
  },

  //刪除訂單
  deleteOrder: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`,

  //刪除全部訂單
  deleteAllOrder: `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/`
  ,

  tokenObj: {
    headers: {
      'Authorization': token,
    }
  }



}

//取得訂單資料（組字串：基本結構、日期、多項目）

//刪除訂單

//訂單處理

//圖表顯示