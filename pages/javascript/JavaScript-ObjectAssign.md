---
title: JavaScript - Object.assign()
excerpt: "JavaScript - Object Asssign Example"
date: 2019-12-26
tags: ["Javascript"]
keywords: "javascript"
cover_image: ""
---

# Object.assign
<br>
<hr>
<br>

Javascript ***Object assign()*** is a built-in function that is used to copy the values of all it's own enumerable properties from one or more source objects to the target object.  
Object.assign() method will return a target object.  
Javascript Object.assign() method is used for cloning an object.  
It is used to merge objects with the same properties.

```javascript
const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: []
};

// We start with an empty object, we clone the user object  
// and also add a new property to the object.
const cloneMergeObject = Object.assign({}, user, { newprop: "haha" });
console.log( cloneMergeObject );
/* { name: 'Kim',
  active: true,
  cart: [],
  purchases: [],
  newprop: 'haha' } */
```