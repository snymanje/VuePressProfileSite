---
title: The 9 must know JavaScript Array Methods
excerpt: "Using the Filter, Map, Foreach, Find, Some, Every, Reduce, Sort and Includes array methods."
date: 2019-11-25
tags: ["Javascript"]
keywords: "javascript arrays"
sidebar: auto
---

# The 9 must know JavaScript Arrays

<br>
<hr>
<br>

The array below will be used to demonstrate all the array methods.

```javascript
const items = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 1000 },
  { name: "Computer", price: 25 },
];
```

<br>

## Filter

The filter() method creates a new array containing only the items that meets the filter criteria,  
like in the example below, al the items where the price is less or equal to 100.

```javascript
const filteredItems = items.filter((item) => {
  return item.price <= 100;
});

console.log(filteredItems);
```

Results

```json
[
  { "name": "Bike", "price": 100 },
  { "name": "Album", "price": 10 },
  { "name": "Book", "price": 5 },
  { "name": "Computer", "price": 25 }
]
```

<br>

## Map

The map() method will iterate over an array, perform some operations on the data and create a new array from that results.

```javascript
// iterating on an array and creating a new array based in your selection createria
const itemNames = items.map((item) => {
  return item.price * 2;
});

console.log(itemNames);
```

Results

```json
[200, 400, 20, 10, 2000, 50]
```

<br>

## Find

The find() method returns the value of the first element in the provided array that satisfies the provided testing function.

```javascript
// find a single item in an array
const findItem = items.find((item) => {
  return item.price === 1000;
});

console.log(findItem);
```

Results

```json
{ "name": "Phone", "price": 1000 }
```

- If you need the index of the found element in the array, use **findIndex()**.
- If you need to find the index of a value, use Array.prototype.**indexOf()**. (It’s similar to findIndex(), but checks each element for equality with the value instead of using a testing function.)
- If you need to find if a value exists in an array, use Array.prototype.**includes()**.

<br>

## Foreach

The foreach() method iterates over ever element in the array, once.  
Unlike map(), foreach() will mutate the array if you change the orginal values in the array.

```javascript
items.forEach((item) => {
  console.log(item.name);
});
```

Results

```json
Bike
TV
Album
Book
Phone
Computer
```

<br>

## Some

The some() method returns **true** of **false** if one of the items in the array matches condition

```javascript
const hasSomeExpensiveItems = items.some((item) => {
  return item.price > 1100;
});

console.log(hasSomeExpensiveItems);
```

Results

```json
false
```

<br>

## Every

The every() method returns **true** of **false** if all of the items in the array matches condition

```javascript
const hasExpensiveItems = items.every((item) => {
  return item.price < 1100;
});

console.log(hasExpensiveItems);
```

Results

```json
true
```

<br>

## Reduce

The reduce() method performs an operation on the array and returns one result,
like getting the total amount of all the items in a cart.

```javascript
const total = items.reduce((currentTotal, item) => {
  return item.price + currentTotal;
}, 0);

console.log(total);
```

Results

```json
1340
```

<br>

## Sort

The sort() method sorts items based on a property and returns a new array

```javascript
const sorted = items.sort((a, b) => {
  // Sorting high to low
  return a.price < b.price;
  // Sorting low to high
  // return a.price > b.price;
});

console.log(sorted);
```

Results

```json
[
  { "name": "Phone", "price": 1000 },
  { "name": "TV", "price": 200 },
  { "name": "Bike", "price": 100 },
  { "name": "Computer", "price": 25 },
  { "name": "Album", "price": 10 },
  { "name": "Book", "price": 5 }
]
```

<br>

## Includes

The includes() method determines whether an array includes a certain value among its entries,  
returning true or false as appropriate

```javascript
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// expected output: true

console.log(pets.includes("at"));
// expected output: false
```

<br>

Thank you!
