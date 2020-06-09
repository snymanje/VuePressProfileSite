---
title: JavaScript - Destructuring
excerpt: "JavaScript - Destructuring examples"
date: 2019-12-26
tags: ["JavaScript"]
keywords: "javascript"
sidebar: auto
---

# Destructuring

<br>
<hr>
<br>
The ability to destructure properties of an object or array helps us write more expressive code with less errors.

```javascript
const obj = {
  firstName: "Jean",
  surnameName: "Snyman",
  age: 32,
  role: "Solutions Architect",
};

const { firstName } = obj;
console.log(firstName); // jean
```

<br>

Destructure an array.

```javascript
const arr = [10, 20, 30, 40, 50];
[a, b] = arr;

console.log(a);
```
