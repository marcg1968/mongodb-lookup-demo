// models.js

const mongoose = require('mongoose')

const ingredQtyModel = new mongoose.Schema({
    amt: { type: String, required: true },
    unit: { type: String },
})

const ingredModel = new mongoose.Schema({
    name: { type: String },
    qty: { type: ingredQtyModel },
})

const recipeModel = new mongoose.Schema({
    title: { type: String, required: true },
})

const recipePartModel = new mongoose.Schema({
    title: { type: String, required: true },
    recipe_id: { type: mongoose.Types.ObjectId, ref: 'recipes' }, // <<== this is the lookup link
    ingreds: [ ingredModel ],
    method: [ String ]
})

const Recipes = mongoose.model('recipes', recipeModel)
const RecipeParts = mongoose.model('recipeParts', recipePartModel)

module.exports = {
    Recipes,
    RecipeParts,
}