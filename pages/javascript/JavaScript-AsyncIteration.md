---
title: JavaScript - Asynchronous Iteration
excerpt: "JavaScript - Asynchronous Iteration examples"
date: 2019-12-27
tags: ["JavaScript"]
keywords: "javascript"
sidebar: auto
---

# Asynchronous Iteration with "for-await-of"

<br>
<hr>
<br>

## for-await-of

This is an **_extremely_** useful feature. Basically it allows us to create loops of async code with ease!

This feature adds a new **_“for-await-of”_** loop that allows us to call async functions that return promises (or Arrays with a bunch of promises) in a loop. The cool thing is that the loop waits for each Promise to resolve before doing to the next loop.

```javascript
const promises = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
  new Promise((resolve) => resolve(3)),
];

// BEFORE
// Runs synchronize
async function beforeWait() {
  for (const obj of promises) {
    console.log(obj); // // logs 3 promises
  }
}

// After
// Waits for promises to finish
async function afterWait() {
  for await (const obj of promises) {
    console.log(obj); // log
  }
}

beforeWait(); // logs 3 promises
afterWait(); // logs 1,2,3
```
