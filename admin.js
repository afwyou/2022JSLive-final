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
axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
  headers: {
    'Authorization': token,
  }
}).then(function (res) {
  console.log(res)
})

//修改訂單



//刪除訂單


//刪除全部訂單