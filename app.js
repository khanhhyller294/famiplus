const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối tới MongoDB thành công'))
  .catch((error) => console.log('Kết nối MongoDB thất bại:', error));

// Tạo schema và model cho tài khoản
const accountSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  position: String,
});

const Account = mongoose.model('Account', accountSchema);

// Middleware
app.use(bodyParser.json());
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

// API để tạo tài khoản
app.post('/create-account', async (req, res) => {
  const { username, email, password, position } = req.body;
  const newAccount = new Account({ username, email, password, position });

  try {
    await newAccount.save();
    res.status(201).json({ message: 'Tài khoản đã được tạo thành công.', position });
  } catch (error) {
    res.status(400).json({ message: 'Có lỗi xảy ra.', error });
  }
});

// Khởi chạy server
app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
