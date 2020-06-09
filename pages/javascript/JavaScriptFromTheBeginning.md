---
title: JavaScript Notes
excerpt: "JavaScript from the beginning."
date: 2019-11-29
tags: ["JavaScript"]
keywords: "javascript"
sidebar: auto
---

# JavaScript from the beginning.

<br>
<hr>
<br>

## Interpreter or Compiler

<br>

Javascript has a JIT Compiler that is a combination of an interpreter and compiler that optimizes code on the fly.

- An Interpreter intranslates on the fly - no conversion into other code, so no optimization
- Compilers translates ahead of time

<br>
 
Babel is a Javascript compiler that takes your modern JS code and returns browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.  
Both of these do exactly what compilers do: Take one language and convert into a different one!  
<br>
<br>

![GIT](/assets/images/JavaScript/JItCompiler.jpg)

## Call Stack and Memory Heap

<br>

- The memory heap is where all the memory allocation happens.
- JavaScript has a garbage collector which frees up memory on the heap when no longer needed.  
  <br>
- The call stack is where the engine keep track of where your code is in the execution.
- A stack overflow happens when to many items are push onto the stack.

<br>

![MemoryHeap](/assets/images/JavaScript/memoryHeap.jpg)

## Single Threaded

- JavaScript is a single threaded language, it runs one set of instructions at a time with one call stack and one heap.
- The JavaScript Runtime calls into the Web APIs ( fetch, setTimeout etc) which runs tasks asyncroniously in the background  
  and on completion will return, the Event Loop will then first check the Job Queue(resolved promises), if there is nothing in the Job Queue it will check the callback Queue to push the next task onto the Call Stack.

![singleThreaded](/assets/images/JavaScript/singleThreaded.jpg)

## Execution Context

When code is run on the Javascript Engine a Global Execution Context is created and when you run a function  
a new execution context is added and we start running our code until everything gets popped of the stack and all our code is run.

![ExecutionContext](/assets/images/JavaScript/ExecutionContext.jpg)

## Lexical Environment

The lexical environment is where the code is located. Everytime you create a function you are also creating a new lexical environment.  
The execution context tells you which lexical environment is currently running.

## Hoisting

During the creation fase of the Global execution context variables (var) and function declarations are reserved in memory before the javascript is run. Variables ( var only, not let and const ) are partially hoisted which means there value will be undifined. Functions and fully hoisted and can be called before they are declared. ( function declarations only ).
Hoisting should be avoided by using variables const and let intruduced in ES6.

## Function Invocation

```javascript
//Function Expression
const canada = () => {
  console.log("Function Expression");
};

//Function Declaration
function india() {
  console.log("Function Declaration");
}

//Function Invocation
canada();
india();

function marry(person1, person2) {
  console.log(`arguments = ${Array.from(arguments)}`);
  return `${person1} is now married to ${person2}`;
}

console.log(marry("Tim", "Tina"));
```

<br>

When a function is called it creats a execution context with "**this**" declared pointing to itself.
It also creates the arguments key word and the variable environment.
![functionExecution](/assets/images/JavaScript/functionExecution.jpg)

## Scope Chain

If a variable is not found in its local environment it will look for the variable in it's parent environment.
If it can't find it there it will look in the parents parent environment...and it will keep doing this untill it finds a variable with that name or if it reaches the global scope without finding the variable it will return undefined.
This is called the scope chain.

This is an example of where the variable is not declared in the function (func), so it will look for it in it's parent environment.

```javascript
let x = "From parent environment";

// This functions has access to the variable on the parent object
// in this case the parent object is in the global scope
const func = () => {
  console.log("Function Expression");
  console.log(x);
};

func(); // From parent environment
```

<br>

If functions is on the global scope
![scopechain](/assets/images/JavaScript/scopechain.jpg)
S
If functions is local to each other
![scopechain2](/assets/images/JavaScript/scopechain2.jpg)

## IIFE

It enables us to attached private data to a function and it creates a fresh environment so that you don't add a bunch of variables and functions on the global execution context.

This is an example of how IIFE's create private data. In ES6 we don't need to do this because we have block scoping and is not limited to function scoping.

```javascript
var script1 = (function() {
  var firstName = "Jean";
  console.log(firstName);

  return {
    firstName,
  };
})();

script1.firstName; // Jean

// console.log(firstName); // ERROR: firstname is not defined
```

<br>

## THIS

Refers to the current object. Who called me? So it's whatever is on the left. ( **obj**.sing() )

```javascript
// 1 this gives methods access to their object
// 2 Execute same code for multiple objects
const obj = {
  name: "Jean",
  sing() {
    return `lalala ${this.name}`;
  },
  singAgain() {
    return `${this.sing()}!`;
  },
};

console.log(obj.singAgain());

// Here the this keyword refers to the windows object
function importantperson() {
  console.log(this.name);
}

console.log(importantperson()); // undefined

// This is a pre ES6 example where this called in a function inside an object still refers to the window object.
const obj = {
  name: "Billy",
  sing: function() {
    console.log(this);

    var anotherFunc = function() {
      console.log(this);
    };
    anotherFunc();
  },
};

obj.sing(); // anotherFunc() will refer to the window Object

// This problem could be resolved by assigning this to a variable called self outside the function call.
const obj = {
  name: "Billy",
  sing: function() {
    console.log(this);

    var self = this;
    var anotherFunc = function() {
      console.log(self);
    };
    return anotherFunc;
  },
};

obj.sing()(); // anotherFunc() will now refer to obj

// ES6 resolved this problem with arrow functions.
const obj = {
  name: "Billy",
  sing: function() {
    console.log(this);

    const anotherFunc = () => {
      console.log(this);
    };
    return anotherFunc;
  },
};

obj.sing()(); // anotherFunc() will now refer to obj
```

<br>

## call(), apply() and bind()

<br>

**call()** can execute a method with it's **this** object pointing to another object.
Basically you copy a method from another object.

```javascript
const healer = {
  health: 0,
  heal(toBeAddedHealth) {
    return (this.health += toBeAddedHealth);
  },
};

const archer = {
  name: "Robin Hood",
  health: 50,
};

console.log(archer);
// Here we are using the call method to call the heal function of the healter object,
// but pointing the this object to archer.
// So this.name will become Robin Hood and this.health === 50
healer.heal.call(archer, 30);
console.log(archer);
```

<br>

**apply()**, works exactly the same as call(), the only difference is takes an array of parameters.

```javascript
healer.heal.apply(archer, [30]);
```

<br>

**bind()** returns a new function with a certain context and parameters and it's usually used when we want to call a function later on with a certain type of **this** context.

```javascript
// bind() will return a function that can be called later with the context(this)
// still pointing to the object called in the parameters.
const healedArcher = healer.heal.bind(archer, 30);
healedArcher();
console.log(archer); // { name: 'Robin Hood', health: 80 }
```

<br>

## Types

<br>

JavaScript has 7 types and they are,

1. number
2. string
3. boolean
4. undefined
5. null
6. Symbol()
7. Object

<br>

We can use typeof to check what type something is,

```javascript
typeof 5; // number
typeof "hi"; // string
typeof true; // boolean
typeof undefined; // undefined
typeof null; // object ( this is weird and it's a mistake in the language)
typeof Symbol(); // Symbol
typeof {}; // object
```

<br>

## First Class Citizens (functions)

<br>

JavaScript functions can be passed around just like data.
Anything you can do with other types, you can also do with functions.

```javascript
// 1
// In other language you can't assign functions to variables, you can just run then
const stuff = function() {};

// 2
// We can pass a function as a parameter
function a(fn) {
  fn();
}

a(function() {
  console.log("Hi There!"); // Hi There!
});

// 3
function b() {
  return function c() {
    console.log("bye");
  };
}

const d = b();
d(); // bye
```

<br>

## Higher Order Functions

<br>

A higher order function is simply a functions that takes another function as a argument or a function that returns another function.

```javascript
// This is a higher order function because it's returning a function.
const multiplyBy = (num1) => {
  return (num2) => {
    return num1 * num2;
  };
};

const multiplyByTwo = multiplyBy(2);
const multiplyByFive = multiplyBy(5);

console.log(multiplyByFive(5)); //25
```

<br>

## The 2 Pilars ( Closures and Prototypes )

<br>

### Closures

The JavaScript engine will make sure that the child functions has access to all of the variables outside of the function that it is referencing.

```javascript
function a() {
  let grandpa = "grandpa";
  return function b() {
    let father = "father";
    return function c() {
      let son = "son";
      return `${grandma} > ${grandpa} > ${father} > ${son}`;
    };
  };
}

let grandma = "grandma";

console.log(a()()()); // grandma > grandpa > father > son
```

<br>

### Closures and Memory

Closures can help us to write memory efficient code.  
Below we have a closure that keeps the referecing the the creation of a big array so that it is not recreated very time.

```javascript
function heavyDuty2() {
  const bigArray = new Array(7000).fill("abc"); // expensive operation, this could also be accessing data in a database.
  console.log("Created array once!");
  return function(index) {
    return bigArray[index];
  };
}

const getHeavyDuty = heavyDuty2();

console.log(getHeavyDuty(300));
console.log(getHeavyDuty(500));
console.log(getHeavyDuty(600));
```

<br>

### Closures and Encapsulation

By wrapping our Database in a closure we can encapsulate our private functions and data. The way to read this is that

- Database is a function that defines a closure.
- The variables within that closure have access to each other (i.e. \_create has access to \_data).
- When the Database is called it returns an object that explicitly exposes 4 functions and nothing else.

```javascript
const Database = (function() {
  _data = {};

  _create = function(create) {
    return `_create function, ${create}`;
  };
  _read = function(read) {
    return `_read function, ${read}`;
  };
  _update = function(update) {
    return `_update function, ${update}`;
  };
  _delete = function(del) {
    return `_delete function, ${del}`;
  };

  return {
    create: _create,
    read: _read,
    update: _update,
  };
})();

console.log(Database.create("abc")); //_create function, abc

console.log(Database._data); // undefined

console.log(Database.delete("abc")); // TypeError: Database.delete is not a function
```

<br>

### Prototypes

These days we don't really use the prototype syntax to write Object Orientated code, we use the class construct.  
But under the hood JavaScript still uses prototypes and prototypical inheritance and it's important to understand.

#### What is a Protopype?

Only constructor functions have the prototype property. The prototype is a reference to another object and it is used whenever JavaScript can’t find the property you’re looking for on the current object. Simply put, whenever you call a property on an object and it doesn’t exist, JavaScript will go to the prototype object and look for it there. If it finds it it will use it, if not it will go to that object’s property and look there. This can bubble up all the way to Object.prototype before returning undefined. This is the essence of the prototype chain and the behavior that sits behind JavaScript’s inheritance.  
All objects have a **\_proto\_\_** property which is simply a pointer to up the chain prototype.

![prototype](/assets/images/JavaScript/proto.jpg)

![proto_prototype](/assets/images/JavaScript/proto_prototype.jpg)
<br>

An example of doing OOP using the prototype syntax. This is also what happens under the hood when using classes.

```javascript
// Constructor function
function User(email, name) {
  this.email = email;
  this.name = name;
  this.online = false;
}

// creating a method on the User Object
User.prototype.login = function() {
  this.online = true;
  console.log(this.email, "has logged in");
};

// creating a method on the User Object
User.prototype.logout = function() {
  this.online = false;
  console.log(this.email, "has logged out");
};

// Constructor function that inherates the User object properties
function Admin(...args) {
  User.apply(this, args);
  this.role = "Admin";
}

// Inherating the User Object methods
Admin.prototype = Object.create(User.prototype);
Admin.prototype.deleteUser = function(u) {
  console.log(`User: ${u} deleted`);
};

var userOne = new User("ryu@ninjas.com", "Ryu");
var userTwo = new User("yoshi@mariokorp.com", "Yoshi");

var admin = new Admin("jean@ninjas.com", "Jean");

console.log(userOne); // User { email: 'ryu@ninjas.com', name: 'Ryu', online: false }
userTwo.login(); // yoshi@mariokorp.com has logged in
userTwo.logout(); // yoshi@mariokorp.com has logged out

console.log(admin);
/* User {
    email: 'jean@ninjas.com',
    name: 'Jean',
    online: false,
    role: 'Admin' } */

admin.login(); // jean@ninjas.com has logged in
admin.deleteUser("Jimmy"); // User: Jimmy deleted
```

<br>

## Programming Paradigms ( OOP and FP )

<br>

### Object Oriented programming

- Organizing the code into units
- Clear + Understandable
- Easy to Extend
- Easy to Maintain
- Memory Efficient
- DRY

<br>

### classes

<br>

- The **class** keyword in JS is syntactic sugar. Under the hood, it still uses prototypal inheritance
- Instances of a class must be instantiated with the **new** keyword
- The constructor method is used to instantiate the state (data) of a new object
- The state is typically unique to each instance
- Functions are typically not included in the constructor because it would create a memory reference for the function in each new instance of the class, thus using more memory than needed
- By including functions as methods of the class, instances of the class can reference the function via the prototype chain
- Prototypal Inheritance has better memory efficiency than classical inheritance due to it sharing the memory references of its prototype properties with those objects that inherit from it. In classical inheritance, instances of the class create new memory references for each inherited property.

<br>

Example of OOP class syntax

```javascript
class Superhero {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return `attack with ${this.weapon}`;
  }
}

// Inheriting Superhero in new class
class Ironman extends Superhero {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}

const ironman = new Ironman("IronMan", "Lazers", "red");
console.log(ironman.attack());

console.log(ironman.getColor());
```

<br>

### 4 Principles of OOP

1. **Encapsulation** - Rapping code into boxes that are related to each other.
2. **Abstraction** - Hidding complexity from the user, only exposing the necessary methods in a class.
3. **Inheritance** - Avoid rewriting the same code again. (using extends and super)
4. **Polymorphism** - The abitity to call the same method of different objects and each object responds in a different way.

<br>

## Functional Programming

The goal of Functional Programming is to minimize side effects and compartmentalize functions so that when there is a bug, you know exactly where to go.

### Pure Functions

A pure function must always return the same output given the same input and the function cannot modify anything outside itself.

Example

```javascript
// Not Pure
const array = [1, 2, 3, 4];

// This function modified the array outside the function - not pure - side effects
function popItem(arr) {
  arr.pop();
  return arr;
}

console.log(popItem(array)); // [ 1, 2, 3 ]

// Pure function
const array2 = [1, 2, 3, 4];

function popItem(arr) {
  const arr2 = [].concat(arr); // making a copy of the original array
  arr2.pop();
  return arr2;
}

console.log(popItem(array2)); // [ 1, 2, 3 ]
console.log(array2); // [ 1, 2, 3, 4 ]  Original array not modified.
```

<br>

An image describing the aspects of good, pure functions  
![pureFunctions](/assets/images/JavaScript/pureFunctions.jpg)
<br>

### Imperative vs Declarative

**_Imperative code_** is code that tells the machine what to do and how to do it.  
**_Declarative code_** is code that tells the machines what to do and what should happen, it doesn’t tell the machine how to do it.  
**_Functional programming helps us to be more Declarative._**

Examples

```javascript
// Imperative
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// Declarative
[1, 2, 3, 4, 5].forEach((el) => console.log(el));
```

<br>

### Immutability

Not changing the data (state). Make a copy of the state and return the state everytime.

```javascript
// Immutability
const obj = { name: "Andrei" };
function clone(obj) {
  return { ...obj }; // this is pure
}

function updateName(obj) {
  const obj2 = clone(obj);
  obj2.name = "Jean";
  return obj2;
}

const updatedObj = updateName(obj);
console.log(obj, updatedObj); // { name: 'Andrei' } { name: 'Jean' }
```

<br>

### Currying

<br>

- **_Currying_** transforms a function with multiple arguments into a sequence/series of functions each taking a single argument.
- **_Currying_** can remind us of methods shared through prototypes of objects which saves memory

```javascript
function multiply(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    };
  };
}
log(multiply(1)(2)(3)); // 6
```

<br>

### Memoization

Memoization is a specific kind of caching algorithm.

```javascript
function memoizedAddTo80() {
  let cache = {};
  return function(n) {
    if (n in cache) {
      return cache[5];
    } else {
      console.log("long time");
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoized = memoizedAddTo80();
console.log(memoized(5)); // long time, 85
console.log(memoized(5)); // 85
console.log(memoized(5)); // 85

console.log(memoized(8)); // long time, 88
console.log(memoized(8)); // 88
console.log(memoized(8)); // 88
```

<br>

### Compose and Pipe

Function composition is an act or mechanism to combine simple functions to build more complicated ones.

```javascript
//Compose
const compose = (f, g) => (data) => f(g(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);
multiplyBy3AndAbsolute(-50); // 150
```

<br>

A pipeline consists of a chain of processing elements (processes, threads, coroutines, functions, etc.), arranged so that the output of each element is the input of the next; the name is by analogy to a physical pipeline.

```javascript
pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const pipe = (f, g) => (data) => g(f(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = pipe(multiplyBy3, makePositive);
multiplyBy3AndAbsolute(-50); // 150
```

<br>

Shopping Cart example using compose and pipe.

```javascript
const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};
const history1 = [];
const compose = (f, g) => (...args) => f(g(...args));
const pipe = (f, g) => (...args) => g(f(...args));
const purchaseItem = (...fns) => fns.reduce(compose);
const purchaseItem2 = (...fns) => fns.reduce(pipe);
console.log(
  purchaseItem2(
    addItemToCart,
    applyTaxToItems,
    buyItem,
    emptyUserCart
  )(user, { name: "laptop", price: 60 })
);
// purchaseItem(
//   emptyUserCart,
//   buyItem,
//   applyTaxToItems,
//   addItemToCart
// )(user, {name: 'laptop', price: 50})
function addItemToCart(user, item) {
  history1.push(user);
  const updatedCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updatedCart });
}

function applyTaxToItems(user) {
  history1.push(user);
  const { cart } = user;
  const taxRate = 1.3;
  const updatedCart = cart.map((item) => {
    return {
      name: item.name,
      price: item.price * taxRate,
    };
  });
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
  history1.push(user);
  const itemsInCart = user.cart;
  return Object.assign({}, user, { purchases: itemsInCart });
}
function emptyUserCart(user) {
  history1.push(user);
  return Object.assign({}, user, { cart: [] });
}
```

Another example with pipe.

```javascript
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const reverse = (string) =>
  string
    .split("")
    .reverse()
    .join("");

const get6Characters = (string) => string.substring(0, 6);

const uppercase = (string) => string.toUpperCase();

getName = (person) => person.name;

const result = pipe(
  getName,
  uppercase,
  get6Characters,
  reverse
)({ name: "JavaScript functional Programming is amazing!" });

console.log(result);

/* [Function: getName]
JavaScript functional Programming is amazing!
[Function: uppercase]
JAVASCRIPT FUNCTIONAL PROGRAMMING IS AMAZING!
[Function: get6Characters]
JAVASC
[Function: reverse]
CSAVAJ */
```

<br>

## Asynchronous JavaScript

<br>

### Promises

A promise is an object that may produce a single value some time in the future.  
Either a resolved value, or a reason thta it's not resoved (rejected).  
Three posible states, fullfilled, rejected or pending.

```javascript
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("stuff worked");
  } else {
    reject("Error occured");
  }
});

promise
  .then((result) => {
    console.log(result);
    // throw Error;
  })
  // catch should always be called last.
  .catch(() => {
    console.log("Caught error!");
  });

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "promise 2");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "promise 3");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "promise 4");
});

Promise.all([promise, promise2, promise3, promise4])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error);
  });
```

<br>

### Async Await

Async Await is build on top of promises. It improved that async syntax.

```javascript
const request = require("request-promise");

const getData = async () => {
  try {
    const resp = await request.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(resp);
  } catch (err) {
    console.log("Try catch error!");
  } finally {
    console.log("finally are always run, regardless of success or failure");
  }
};

getData();
```

<br>

### Parallel, Sequence and Race Promises

<br>

```javascript
const promisify = (item, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify("a", 100);
const b = () => promisify("b", 5000);
const c = () => promisify("c", 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `prallel is done: ${output1} ${output2} ${output3}`;
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`;
}

sequence().then(console.log);
parallel().then(console.log);
race().then(console.log);
```

<br>

## Modules

<br>

### Before ES6 Modules

<br>

- Before modules, JavaScript used IIFE to create a module pattern to containerize our code.
- An IIFE would create a function scope for the functions and variables to live inside of where they would be private. This would prevent pollution of the global namespace.
- By returning functions/variables from the IIFE in an object, we create an interface for interacting with the code inside of the IIFE function scope.
- This method of containerizing our code is called the Revealing Module Pattern.

<br>

Example

```javascript
// IIFE
// Revealing Module Pattern

var fightModule = (function() {
  function fight() {
    var attack1 = Math.floor(Math.random() * characters.harry.length);
    var attack2 = Math.floor(Math.random() * characters.voldemort.length);
    return attack1 > attack2
      ? `${characters.harry} wins`
      : `${characters.voldemort}, winner.`;
  }

  return {
    fight,
  };
})(characters);

var characters = (function() {
  const harry = "Potter";
  const voldemort = "Voldemort";

  return {
    harry,
    voldemort,
  };
})();

console.log(fightModule.fight()); //
```

<br>

### ES6 Native Modules

- Brought to client-side JavaScript in ES6
- Provides native module functionality in the browser

```javascript
//Native ES6 Modules
import jump from 'module1'
import module2, { anotherFunc } from 'module2'
import { anotherFunc1,  anotherFunc2 } from 'module2'

export default function jump() {
}

export anotherFunc() {
}

export anotherFunc2() {
}
```

<br>

## Error handling

<br>

- Errors are used with the keyword throw
- The name property refers to the general class of Error
- The message property generally provides a more succinct message than one would get by converting the error object to a string.
- The stack property traces the Error’s position in the call-stack back to the global context which is typically <anonymous>

```javascript
const c = new Error("again?");
console.log(c.name); // Error
console.log(c.message); // again?
console.log(c.stack); // Error: again?↵ at <anonymous>:1:11
```

<br>

### Error types

- Error, general error
- SyntaxError, e.g. a misplaced comma
- ReferenceError, e.g. undefined variable

When an Error is thrown, it searches up the call-stack for a catch.
If no catch is found, the runtime handles it.  
In the browser, it is onerror().  
In Node.js, it is process.on(‘uncaughtException’)

### try/catch/finally

```javascript
function fail() {
  try {
    console.log("this works"); //successfully logs because it is above the error
    throw new Error("whoops!"); //throws an error, looks for a catch
  } catch (error) {
    console.log("We have an error", error); // "We have an error Error: whoops!
  } finally {
    console.log("final"); // logs "final" regardless of try/catch success/fail
  }
}
```

<br>

### Custom Errors

- Error is a class and can be extended with the extends keyword to create custom Errors.
- This can be useful for creating secure Errors by not displaying too much information.

```javascript
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionError";
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.favoriteSnack = "grapes";
  }
}
const a = new AuthenticationError("snack");
console.log(a.favoriteSnack); // grapes
throw new AuthenticationError("oops"); // AuthenticationError: oops
```
