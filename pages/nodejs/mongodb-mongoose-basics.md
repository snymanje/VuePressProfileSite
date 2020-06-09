---
title: Introduction to MongoDB and Mongoose
excerpt: "Examples of using MongoDB and Mongoose"
date: 2019-10-15
tags: ["Nodejs", "mongoose", "mongodb"]
keywords: "mongodb, mongooose, nodejs"
sidebar: auto
---

# Introduction to MongoDB and Mongoose

<br>
<hr>
<br>

## Overview

![overview](/assets/images/MongoDB/Overview.jpg)

<br>

## Relational Database Structure

![structurenosql](/assets/images/MongoDB/StructureNoSQL.jpg)

<br>

## Relational Database Structure

![structuresql](/assets/images/MongoDB/StructureSQL.jpg)

<br>

## Creating a local DB using the Mongo Shell

```javascript
//First run mongo command to enter the Mongo Shell
mongo

// This will create the natours-test DB if it doesn't exist.
use natours-test

//db is the current DB, tours collection will be created automatically.
db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7});
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5da29ebd8adf1de813580280")
}
//finding the newly created document
db.tours.find()
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }

//Show all Databases
show dbs
admin         0.000GB
config        0.000GB
local         0.000GB
natours-test  0.000GB
test          0.000GB

//Switch to a different DB
use admin
switched to db admin

//Switch back the natours-test DB
use natours-test
switched to db natours-test

//Show all collections in DB
show collections
tours

//Quite the Mongo shell
quite()
```

<br>

## Creating New Documents

```javascript
//Insert One Document
db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7});
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5da29ebd8adf1de813580280")
}

//Insert many Documents
db.tours.insertMany([{name: "The sea explorer", price: 497, rating: 4.8},
                     {name: "The snow adventurer", price: 456, rating: 4.9},
                     {name: "The snow explorer", price: 497, rating: 4.8, difficulty: "easy"}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5da2a1388adf1de813580281"),
                ObjectId("5da2a1388adf1de813580282"),
                ObjectId("5da2a1388adf1de813580283")
        ]
}

//Find Documents
db.tours.find()
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 456, "rating" : 4.9 }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer", "price" : 497, "rating" : 4.8, "difficulty" : "easy" }
```

<br>

## Quering Documents

```javascript
//Find document with specific name
db.tours.find({name: "The Forest Hiker"})
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }

//Less than or equal to query
db.tours.find({price: {$lte:400}})
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }

//Less than AND greater than query
db.tours.find({price: {$lt:400}, rating: {$gt: 4.6}})
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }

//OR query
db.tours.find({$or: [ {price: {$lte: 400}}, {rating: {$gte: 4.7}}]})
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 456, "rating" : 4.9 }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer", "price" : 497, "rating" : 4.8, "difficulty" : "easy" }

db.tours.find({$or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}}]})
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 456, "rating" : 4.9 }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer", "price" : 497, "rating" : 4.8, "difficulty" : "easy" }

//returning only the name property
db.tours.find({$or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}}]}, {name: 1})
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer" }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer" }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer" }

```

<br>

## Updating Documents

```javascript
//Updating One document
db.tours.updateOne({name: "The snow adventurer"}, {$set: {price: 599} })
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.tours.find()
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 599, "rating" : 4.9 }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer", "price" : 497, "rating" : 4.8, "difficulty" : "easy" }

//Update Many
db.tours.updateMany({price: {$gt:500}, rating: {$gt: 4.8}},{$set: {premiun: true}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.tours.find()
{ "_id" : ObjectId("5da29ebd8adf1de813580280"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5da2a1388adf1de813580281"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 599, "rating" : 4.9, "premiun" : true }
{ "_id" : ObjectId("5da2a1388adf1de813580283"), "name" : "The snow explorer", "price" : 497, "rating" : 4.8, "difficulty" : "easy" }
```

<br>

## Deleting Documents

```javascript
db.tours.deleteMany({rating: {$lte: 4.8}})
{ "acknowledged" : true, "deletedCount" : 3 }

db.tours.find()
{ "_id" : ObjectId("5da2a1388adf1de813580282"), "name" : "The snow adventurer", "price" : 599, "rating" : 4.9, "premiun" : true }

//Deleting ALL documents in a collection
db.tours.deleteMany({})
{ "acknowledged" : true, "deletedCount" : 1 }

```

<br>

# Mongoose

<br>

![Mongoose](/assets/images/MongoDB/Mongoose.jpg)

```javascript
// Create a basic schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
```

```javascript
// Creating the model
// Model names always start with capital letter
const Tour = mongoose.model("Tour", tourSchema);
```

```javascript
// Testing the model
// Create instance of Tour model
const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

// a better way of creating documents
const newTour = await Tour.create(req.body);
```

<br>

### A Schema with validation, virtual properties and middleware

```javascript
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A Tour name must have less than 41 characterss"],
      minlength: [10, "A Tour must have more than 10 characters"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty must be easy, medium or difficult",
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //Removes it from the results
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  //Add virtual properties to the schema - Used for display purposes, you can't query with virtual properties
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Define the virtual property
tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

//Document middleware
//Runs before save and create command. NOT for insertMany
tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/* tourSchema.pre('save', function(next) {
  console.log('Will save doc...');
  next();
});

//Runs after save and create command.
tourSchema.post('save', function(doc, next) {
  next();
}); */

//QUERY MIDDLEWARE
tourSchema.pre("/^find/", function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

//Model names always start with capital letter
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
```

```javascript
// In your patch\update request you have to set runValidators to true,
// otherwise the validation will not run when you update a field.
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
});
```

```javascript
// Example of a custom validator
priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          //this only works when creating new documents...not for updates.
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
```
