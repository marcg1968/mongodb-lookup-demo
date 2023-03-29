// demo.js

const mongoose = require('mongoose')
require('dotenv').config()

// load the models
const { Recipes, RecipeParts } = require('./models')

const { MONGODB_USER, MONGODB_PASS } = process.env
const URI = MONGODB_USER && MONGODB_PASS
    ? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster01.koazls1.mongodb.net/db1`
    : null

if (URI === null) {
    console.log('.env variables MONGODB_USER and MONGODB_PASS must exist and require valid values.')
    process.exit(1)
}

const main = async () => {
    await mongoose.connect(URI)
    const recipe = await Recipes.findOne({ title: { $regex: /^Warm salmon/ } })
    const oid = new mongoose.Types.ObjectId(recipe?._id.toString())
    const recipeParts = await RecipeParts.find({ recipe_id: oid }).populate('recipe_id')
    console.log(JSON.stringify(recipeParts, null, 2))
}

main().catch(err => console.log(err))

