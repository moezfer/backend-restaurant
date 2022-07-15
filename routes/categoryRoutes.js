const express = require('express')
const router = express.Router()
const {
  getCategorys,
  setCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCategorys).post(protect, setCategory)
router.route('/:id').delete(protect, deleteCategory).put(protect, updateCategory)

module.exports = router
