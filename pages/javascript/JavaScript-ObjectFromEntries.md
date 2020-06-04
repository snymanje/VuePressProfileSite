---
title: JavaScript - Object.fromEntries()
excerpt: "JavaScript - Object.fromEntries() Examples"
date: 2019-12-26
tags: ["Javascript"]
keywords: "javascript"
sidebar: auto
---

# Object.fromEntries()

<br>
<hr>
<br>
The Object.fromEntries() function is intended to make it easy to convert a JavaScript Map into a JavaScript object.

```javascript
// { hello: 'world', foo: 'bar' }
Object.fromEntries(
  new Map([
    ["hello", "world"],
    ["foo", "bar"],
  ])
);
```

<br>

A neat side effect is you can convert an array of key/value pairs into a JavaScript object.

```javascript
// { hello: 'world', foo: 'bar' }
Object.fromEntries([
  ["hello", "world"],
  ["foo", "bar"],
]);
```
