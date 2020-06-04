---
title: JavaScript - Sets
excerpt: "JavaScript - Sets examples"
date: 2019-12-26
tags: ["Javascript"]
keywords: "javascript"
sidebar: auto
---

# Sets

<br>
<hr>
<br>

Sets are a new data structure that we can use in ES6. We can use them to store a set of unique values of any type.

```javascript
const names = new Set();

names
  .add("Jean")
  .add("John")
  .add("Crystal");

console.log(names); // Set { 'Jean', 'John', 'Crystal' }

// Let try to add 'Jean' again..
names.add("Jean");

// You can see that 'Jean' is not added again. Sets contains only unique values.
console.log(names); // Set { 'Jean', 'John', 'Crystal' }

// Set size
console.log(names.size);

// delete from set
names.delete("John");
console.log(names); // Set { 'Jean', 'Crystal' }

// delete everything form the set
names.clear();
console.log(names); // Set { }

// recreate set
names
  .add("Jean")
  .add("John")
  .add("Crystal");

// Check if sets has a certain element
const check = names.has("Jean");
console.log(check); // true

// remove duplicate in array
const people = ["Jean", "John", "Shaun", "Adrian", "Jean"];

const removedDups = new Set(people);
console.log([...removedDups]); // [ 'Jean', 'John', 'Shaun', 'Adrian' ]
```
