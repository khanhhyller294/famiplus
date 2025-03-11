const express = require('express');
const app = express();

// Cấu hình EJS
app.set('view engine', 'ejs');

// Đường dẫn đến thư mục chứa tệp tĩnh (CSS, JS)
app.use(express.static('public'));

// Các route cho ứng dụng
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/create-account', (req, res) => {
  res.render('create-account');
});

// Khởi chạy server
app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
