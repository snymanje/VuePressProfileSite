---
title: JavaScript - Array.flat() and Array.flatmap()
excerpt: "JavaScript - Array.flat() and Array.flatmap() Examples"
date: 2019-12-27
tags: ["Javascript"]
keywords: "javascript"
cover_image: ""
---

# Array.flat() and Array.flatmap()
<br>
<hr>
<br>
Starting off with flat() and flatmap(), so if you have an array like below, you can just console.log this and you have a bunch of nested arrays.  
So if you want to flatten this whole array you have to use recursion or some sort of algorithm.  
Fortunately now JavaScript provides it by default by making use of .flat() which would recursively flatten your array up to the level you specify.  
<br>
<br>

## Array.flat()

```javascript
const nestedArray = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, [12, 13, 14]]
];

console.log(nestedArray); // [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10, 11, [ 12, 13, 14 ] ] ]
console.log(nestedArray.length); // 3

const flatten = nestedArray.flat();

console.log(flatten); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, [ 12, 13, 14 ] ]
console.log(flatten.length); // 12

//flat() also takes a depth argument that specifies how many levels down you want to flatten.
const flattenDepth = nestedArray.flat(2);
console.log(flattenDepth); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
console.log(flattenDepth.length); // 14
```
<br>

## Array.flatmap()
The new flatMap() function is equivalent to calling map() followed by flat(). This is handy if your map() returns an array.  

```javascript
const oddNumbers = [1, 3, 5, 7, 9];

const allNumbers1 = oddNumbers.flatMap(num => [num, num + 1]);
console.log(allNumbers1); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// Since the callback parameter to flatMap() above returns an array, flatMap() flattens out the array.
// The above is equivalent to:
const allNumbers2 = oddNumbers.map(num => [num, num + 1]).flat();
console.log(allNumbers2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// One neat trick with flatMap() is that you can do both filter() and map() in one step.
// You can filter out an element by returning an empty array [] from your flatMap() callback.
const oddNumbers2 = allNumbers2.flatMap(num => (num % 2 === 0 ? [] : num));
console.log(oddNumbers2);
```