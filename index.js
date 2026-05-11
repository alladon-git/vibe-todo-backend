const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const todoRouter = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/todos', todoRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공!'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
