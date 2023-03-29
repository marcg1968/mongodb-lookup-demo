# Demo of MongoDB lookup (or "JOIN")

Using Mongoose Node.js module for MongoDB.

## Requirements and setup

You will need a `MongoDB` instance, e.g. [Free tier Atlas MongoDB Cloud][Atlas].

Create two collections, ``recipes`` and ``recipeparts``.

If using MongoDB Atlas, obtain your connection string, e.g. for database ``db1``, 
``mongodb+srv://username:password@cluster01.koazls1.mongodb.net/db1``

Import the JSON data files ``recipes.json`` and ``recipeparts.json`` 
(the ``-vvv`` switch will generate a heap of debugging output so feel free to reduce it to ``-v``):

```bash
URI="mongodb+srv://username:password@cluster01.koazls1.mongodb.net/db1"
mongoimport -vvv --uri "$URI" --collection testRecipes --file recipes.json --jsonArray
mongoimport -vvv --uri "$URI" --collection testRecipeParts --file recipeparts.json --jsonArray
```

Run the following to install dependencies:

```
yarn install
```

## Demo scripts

Two scripts, ``demo.js`` and ``app.js`` demonstration the implementation. To run them on the 
commandline:

```bash
node demo.js
node app.js
```


[Atlas]: https://cloud.mongodb.com/

