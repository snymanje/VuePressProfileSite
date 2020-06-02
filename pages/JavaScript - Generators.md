---
title: JavaScript - Generators
excerpt: "JavaScript - Generator examples"
date: 2019-12-26
tags: ["Javascript"]
keywords: "javascript"
cover_image: ""
---

# Generators
<br>
<hr>
<br>

Generators are basically functions that can be played and paused as we like, so that we can control the flow of them.

```javascript
// The * sets up the generator and returns an iterator
function* gen() {
  // yield pause generator
  let x = yield "pear";
  let y = yield "banana";
  let z = yield "apple";
  return x + y + z;
}

const myGen = gen();

console.log(myGen.next()); // { value: 'pear', done: false }
console.log(myGen.next(10)); // { value: 'banana', done: false }
console.log(myGen.next(20)); // { value: 'apple', done: false }
console.log(myGen.next(5)); // { value: 35, done: true }
```