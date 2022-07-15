const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')
const User = require('../models/userModel')

// @desc    Get categorys
// @route   GET /api/categorys
// @access  Private
const getCategorys = asyncHandler(async (req, res) => {
  const categorys = await Category.find({ user: req.user.id })

  res.status(200).json(categorys)
})

// @desc    Set category
// @route   POST /api/categorys
// @access  Private
const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const category = await Category.create({
    text: req.body.text,
    user: req.user.id,
    desc:req.body.desc,
    price:req.body.price
  })

  res.status(200).json(category)
})

// @desc    Update category
// @route   PUT /api/categorys/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the category user
  if (category.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCategory)
})

// @desc    Delete category
// @route   DELETE /api/categorys/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the category user
  if (category.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await category.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getCategorys,
  setCategory,
  updateCategory,
  deleteCategory,
}
