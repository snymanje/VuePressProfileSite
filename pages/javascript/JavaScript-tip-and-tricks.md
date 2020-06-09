---
title: JavaScript Tips and Tricks
excerpt: "Improve your everyday coding with these tips and tricks"
date: 2019-12-05
tags: ["JavaScript"]
keywords: "javascript"
sidebar: auto
---

# JavaScript Tips and Tricks.

<br>
<hr>
<br>
<br>

# Objects

<hr>
<br>
<br>

## Get Lenght of Object

```javascript
//create an array
const arr = [1, 2, 3];

console.log(arr.length); // = 3

//create a Object
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(obj.length); // undefined

let length = Object.keys(obj);
console.log(length); // [ 'a', 'b', 'c' ]

length = Object.keys(obj).length;
console.log(length); // 3
```

<br>

## Iterate over an Object

```javascript
//create an Object
const obj = {
  FirstName: "Jean",
  LastName: "Snyman",
  Age: 35,
};

// Option 1
for (let u in obj) {
  if (obj.hasOwnProperty(u)) {
    console.log(u, obj[u]);
  }
}

// Option 2
for (let u of Object.keys(obj)) {
  console.log(u, obj[u]);
}

// Option 3 - ES7+
Object.entries(obj).forEach(([key, value]) => console.log(key, value));
```

<br>

## Convert Object to Array

```javascript
const obj = {
  FirstName: "Jean",
  LastName: "Snyman",
  Age: 35,
};

// Option 1
const result = Object.keys(obj).map((key) => [key, obj[key]]);
console.log(result);

// Option 2
console.log(Object.entries(obj));
```

<br>

## Check if property is in Object

```javascript
const user = {
  FirstName: "Jean",
  LastName: "Snyman",
  Age: 35,
  address: {
    street: "Main Road",
    city: "Cape Town",
    PostalCode: "8000",
  },
};

const property = user.address.hasOwnProperty("PostalCode");

console.log(property);
```

<br>

## Prevent Object Properties from Being Added, Deleted or Changed

```javascript
const user = {
  FirstName: "Jean",
  LastName: "Snyman",
  Age: 35,
};

// View Object properties
console.log(Object.getOwnPropertyDescriptors(user));

// Prevent object properties from being added
Object.preventExtensions(user);

// Prevent object properties from being added or deleted
Object.seal(user);

// Prevent object properties from being changed at all
Object.freeze(user);
```

<br>

## Merge two or more Objects (Object.assign & Object spread)

```javascript
const defaultUser = {
  FirstName: "Jean",
  LastName: "Snyman",
  Age: 35,
};

const additionalUserProps = {
  Email: "jeans@gmail.com",
  Age: 40,
};

//Merge two objects using Object.assign
const user = Object.assign(defaultUser, additionalUserProps);

console.log(user);

//Merge two objects using object spread
const user2 = { ...defaultUser, ...additionalUserProps };

console.log(user2);
// {
//   FirstName: 'Jean',
//   LastName: 'Snyman',
//   Age: 40,
//   Email: 'jeans@gmail.com'
// }
```

<br>

## Computed Object Properties

```javascript
// Create a state object where we will add our computed props to
let state = {};

// Create a key and a value property
const key = "name";
const value = "This is the value of the prop";

// Assign it to the state object
state[key] = value;

// Create a function
const func = () => {
  console.log("Running a function");
};

// You can also assign a function as a computed prop
state["func"] = func;

console.log(state);

state.func();

// { name: 'This is the value of the prop',
//  func: [Function: func] }
//  Running a function
```

<br>

## Delete or Filter Property of Object

```javascript
const user = {
  firstName: "Jean",
  lastName: "Snyman",
  age: 35,
};

function filterObj(obj, prop) {
  let filteredObj = {};
  Object.keys(user)
    .filter((k) => k !== prop)
    .map((key) => (filteredObj[key] = obj[key]));
  return filteredObj;
}

console.log(filterObj(user, "firstName")); //{ lastName: 'Snyman', age: 35 }
```

<br>

## Get All Values in Object

```javascript
const user = {
  firstName: "Jean",
  lastName: "Snyman",
  age: 35,
};

console.log(Object.values(user)); // [ 'Jean', 'Snyman', 35 ]
```

<br>

# Arrays

<hr>
<br>
<br>

## Shollow Copy/Clone Array

```javascript
const fruits = ["apples", "bananas"];

let newFruits = fruits.slice();
// Alternative method
// const newFruits = [].concat(fruits);

newFruits.push("cherry");

console.log(fruits); // [ 'apples', 'bananas', 'cherry' ]

// Using ES6 spread operator
newFruits = [...fruits, "pear"];
console.log(newFruits); // [ 'apples', 'bananas', 'pear' ]
```

<br>

## Get Random Element from Array

```javascript
const ages = [12, 32, 45, 78, 3, 55, 9];

let randomNumber = ages[Math.round(Math.random() * ages.length)];

console.log(randomNumber);
```

<br>

## Remove falsy values from Array

```javascript
// Falsy values = values which wjen converted to a boolean always become false
// Five falsy values in JS = '', 0, null, undefined, NaN

const temps = [12, 32, 45, 78, 3, undefined, 9, 0, NaN, ""];

// filter converts all values to booleans and if true keeps them in the array
const newTemp = temps.filter((temp) => temp);

console.log(newTemp); // [ 12, 32, 45, 78, 3, 9 ]
```

<br>

## Remove items from Array

```javascript
const nums = [12, 32, 45, 78, 3];

function removeItems(arr, fn) {
  return arr.filter(fn).map((el) => {
    arr.splice(arr.indexOf(el), 1);
    return el;
  });
}

let res = removeItems(nums, (num) => num > 32);

console.log(res); // [ 45, 78 ]
console.log(nums); // [ 12, 32, 3 ]
```

<br>

## Fill Array with values

```javascript
const phoneNumber = "555-525-5248";

// Using the fill method to replace characters in a string
let newNumber = phoneNumber
  .split("")
  .fill("*", 0, 8)
  .join("");

console.log(newNumber); // ***5255248
```

<br>

## Find Certain Element / Index / Indices of Array

```javascript
const people = ["Jean", "John", "James", "John"];

function findIndexAll(arr, value) {
  let indices = [];
  arr.forEach((el, i) => el === value && indices.push(i));
  return indices;
}

let res = findIndexAll(people, "John");

console.log(res); //[ 1, 3 ]
```

<br>

## Make Range of Numbers within Array

```javascript
const range = Array.from({ length: 10 }, (value, index) => index + 1);

console.log(range); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

<br>

## Get Unique Values in Array ( Filter or Set)

```javascript
const users = ["Jean", "John", "John", "James", "John"];

// Filter method
const newUsers = users.filter((name, index, array) =>
  array.indexOf(name) === index ? name : ""
);

console.log(newUsers); // [ 'Jean', 'John', 'James' ]

// Set method
const set = [...new Set(users)];

console.log(set); // [ 'Jean', 'John', 'James' ]
```

<br>

## Find Difference Between Two Arrays ( Filter and Set)

```javascript
const users = ["Jean", "John", "John", "James", "John"];

const users2 = ["Jean", "Milan", "John", "Jones", "John", "Jones"];

const result = [...new Set(users2)].filter((el) => !users.includes(el));

console.log(result); // [ 'Milan', 'Jones' ]
```

<br>

## Get Last Item / Everything Before last Item in Array

```javascript
const users = ["Jean", "John", "John", "James", "John"];

const lastElement = users[users.length - 1];

console.log(lastElement); // John

// Get everything except last element
const beforeLastElement = users.slice(0, -1);

console.log(beforeLastElement); // [ 'Jean', 'John', 'John', 'James' ]
```

<br>

# Strings

<hr>
<br>
<br>

## Iterate over a string

```javascript
const str = "Hello world";

for (let s of str) {
  console.log(s);
}
```

<br>

## Capitalize first word of string

```javascript
const capitalize = ([first, ...rest]) =>
  `${first.toUpperCase()}${rest.join("")}`;

const result = capitalize("hello world");

console.log(result); // Hello world
```

<br>

## Capitalize every word of string

```javascript
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

const result = capitalizeWords("hello world, it's a nice day");

console.log(result); // Hello World, It's A Nice Day
```

<br>

# Numbers And Math Operations

<hr>
<br>
<br>

## Change Length of Decimal

```javascript
let num = Number((1.234).toFixed(2));
console.log(num);
```

<br>

## Round Decimals to Integers

```javascript
let num = Math.floor(1.2345); //rounds down

console.log(num); // 1

let num2 = Math.ceil(1.2345); //rounds up

console.log(num2); // 2

let num3 = Math.round(1.49); // 1.5 and up will round up and < .5 will round down

console.log(num3); // 1

let num4 = Math.round(1.5); // 1.5 and up will round up and < .5 will round down

console.log(num4); // 2
```

<br>

# General

<hr>
<br>
<br>

## Private Data using IIFEs or Block Scope

```javascript
//Use IIFEs or Block scope (w/ let /const) to hide / expose data

// Before ES6
var getUserdata = (() => {
  let name = "John";
  let email = "johan@gmail.com";
  let password = "3kj3n432423kj";

  return { name, email };
})();

getUserdata; // gets access to name and email only

// ES6

{
  let name = "John";
  let email = "johan@gmail.com";
  let password = "3kj3n432423kj";

  const sayHi = () => {
    return `Hi, ${name}`;
  };

  // make function available outside the block scope
  var result = {
    sayHi,
  };
}

console.log(result.sayHi()); // Hi, John
```

<br>

## Array Destructuring

```javascript
const nums = [1, 2, 3, 4, 5, 6];

//Destructuring
const [one, two, three] = nums;
console.log(one); // 1
console.log(two); // 2
console.log(three); // 3

// Ussing destructuring to swp varialbes

let name = "doug@gmail.com";
let email = "doug";

// First construct an array from which to destructure
[email, username] = [name, email];

console.log(email); // doug@gmail.com

// variable can be renamed with destructuring
console.log(username); // doug
```
