// app.js

const mongoose = require('mongoose')
const readline = require('readline')
require('dotenv').config() // load variables from .env
const { Recipes, RecipeParts } = require('./models') // load the models

const { MONGODB_USER, MONGODB_PASS } = process.env
const URI = MONGODB_USER && MONGODB_PASS
    ? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster01.koazls1.mongodb.net/db1`
    : null

const usage = () => console.log('.env variables MONGODB_USER and MONGODB_PASS must exist and require valid values.')

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
})

const closeAndGo = async () => {
    console.log('Closing Mongoose default connection ... ')
    await mongoose.connection.close()
    console.log('Mongoose default connection closed')
    process.exit(0)
}

const main = async () => {

    if (!URI) {
        usage()
        process.exit(1)
    }

    await mongoose.connect(URI)

    const recipes = await Recipes.find({})

    // output a list of recipe titles
    recipes.forEach((e, i) => console.log(
        `${(i+1).toString().padStart(3, ' ')}. ${e.title} - ${e._id}`
    ))

    // show a prompt to display JSON of complete recipe record
    const _id = rl.question('Enter no. of recipe to display: ', async i => {
        if (i.match(/^q.*/i)) return await closeAndGo()
        if (i === 0)          return await closeAndGo()
        
        const record = recipes[parseInt(i-1)]
        const oid = new mongoose.Types.ObjectId(record?._id.toString())
        const recipeParts = await RecipeParts.find({ recipe_id: oid }).populate('recipe_id')
        console.log(JSON.stringify(recipeParts, null, 2))

        return await closeAndGo()
    })
}

main().catch(err => console.log(err))

