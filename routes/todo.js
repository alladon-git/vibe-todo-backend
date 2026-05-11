const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 할일 전체 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    res.status(200).json({ message: '삭제 완료' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
