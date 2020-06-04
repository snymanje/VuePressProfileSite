---
title: JavaScript - Object.values() and Object.entries()
excerpt: "JavaScript - Object.values() and Object.entries() Examples"
date: 2019-12-27
tags: ["Javascript"]
keywords: "javascript"
sidebar: auto
---

# Object.values() and Object.entries()

<br>
<hr>
<br>
This is a way to treat our objects like dictionaries we can pull out the field names and the actual values associated with them.  
<br>
<br>

## Object.values()

This is exactly opposite of Object.keys().

```javascript
const fruits = {
  apple: 10,
  orange: 20,
  grapes: 30,
  pineapple: 40,
};

const result = Object.values(fruits);

console.log(result); // [ 10, 20, 30, 40 ]
```

<br>

## Object.entries()

Object.entries() the method returns an array of a given object’s own enumerable property [key, value] pairs.

```javascript
const fruits = {
  apple: 10,
  orange: 20,
  grapes: 30,
  pineapple: 40,
};

for (const [key, val] of Object.entries(fruits)) {
  console.log(key, val);
}
/* 
apple 10
orange 20
grapes 30
pineapple 40 
*/
```
