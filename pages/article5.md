---
title: JavaScript Shorthand Techniques
lang: en-US
published: 2019-09-19
meta:
  keywords:
    - TypeScript
    - JavaScript
    - Tutorial
  description:
    content: Article on TypeScript

sidebar: auto
---


# JavaScript Shorthand Techniques  

<hr>
  
## Switch Case Statements
<br>

You can refactor switch statements to an object, making the syntax cleaner and more declarative.
```javascript
// Longhand version
switch (something) {
  case 1:
    doSomething();
  break;
  case 2:
    doSomethingElse();
  break;
  case 3:
    doSomethingElseAndOver();
  break;
  // And so on...
}

// Shorthand version
const cases = {
  1: doSomething,
  2: doSomethingElse,
  3: doSomethingElseAndOver
};
```
<br>

## IF Assignment
<br>

This technique is very trivial, though worth mentioning. Since the value is already a boolean, it can be directly checked in the if.
```javascript
// Longhand version
if (isTrue === true)
if (isTrue === false)

// Shorthand version
if (isTrue)
if (!isTrue)
```
<br>

## Short IF statements
<br>

We can also club multiple if checks in an array and then can check for the presence of those conditions in that array.
```javascript
// Longhand
if(x == 1 || x == 5 || x == 7)  {
  console.log('X has some value');
}

// Shorthand
([1,5,7].indexOf(x) !=- 1) && alert('X has some value!');
```
<br>

## If true … else case
<br>

```javascript
// Longhand
let result;
if (x) {
    result = "If Case";
}
else {
    result = "Else Case";
}

// Shorthand
let x = true; let result = x ? "If Case" : "Else Case";
```
<br>

## Using Lookup Tables
<br>

If we have multiple if-else conditions and the behavior of each condition is different, we can use lookup tables. We can also do the same using switch statement, however using lookup approach is more clean and crisp, IMO.
```javascript
// Longhand
if (hero === 'Robin') {
  callRobin();
}
else if (hero === 'Raven') {
  callRaven();
}
else if (hero === 'Starfire') {
  callStarfire();
}
else if (hero === 'BeastBoy') {
  callBeastBoy();
} else {
  throw new Error('No such hero is available...!!! - ' + type);
}

// Shorthand
const heroNeeded= {
  Robin: callRobin,
  Raven: callRaven,
  Starfire: callStarfire,
  BeastBoy: callBeastBoy
};
 
const func = heroNeeded[hero];
(!func) && throw new Error('Hero not available ' + hero); 
func();
```
<br>

## For Loop
<br>

```javascript
// Longhand version
let justiceLeaque = ['Batman', 'Superman', 'Flash', 'Green Lantern']for(let hero = 0; hero < justiceLeaque.length; hero++){
   console.log(justiceLeaque[hero])
}

// Shorthand version
let justiceLeaque = ['Batman', 'Superman', 'Flash', 'Green Lantern']for(let hero of justiceLeaque){
   console.log(hero)
}
```
<br>

## Empty Check, Undefined Checks, or Null Checks
<br>

Many times we want to check variables values for undefined or null. It is a very common scenario in all types of application.
```javascript
// Longhand
if (anyVariable !== null || anyVariable !== undefined || anyVariable !== '') {
  const doSomeCalculation = anyVariable;
}

// Shorthand
const doSomeCalculation = anyVariable  || '';
//output: '' (an empty string)
```
<br>

## Function Calling
<br>

We can use ternary operators to call functions directly based on conditional expression.
```javascript
function printA () {
  console.log('A');
};
function printB () {
  console.log('B');
};

// Longhand
const isTrue = true;
if (isTrue) {
  printA();
} else {
  printB();
}

// Shorthand
(isTrue ? printA : printB)();
```
<br>

## Spread Operator
<br>

In JavaScript, we can use a spread operator in many scenarios to make our code more efficient, clean and crisp.  
Syntax of Spread operator is three dots …
```javascript
//Concatenation Example:
// Longhand
let heroes = ['Raven', 'Starfire', 'BeastBoy']// concatenate
let titans = ['Robin'].concat(heroes)

//shorthand
let heroes = ['Raven', 'Starfire', 'BeastBoy']// Concatenation using ... operator.
let titans = ['Robin', ...heroes]

//Cloning Example:
// Longhand version
const heroes = ['Batman', 'Superman', 'Hawk', 'Wonder Woman'];
const justiceLeaque = heroes.slice()

// shorthand versionconst heroes = ['Batman', 'Superman', 'Hawk', 'Wonder Woman'];
const justiceLeaque = [...heroes];

//Using Arrow Functions
// longhand
function print(){
console.log('print A');
}

//shorthand
// In case of single line function
const print = () => {
   console.log('print AAAA');
};
//Another Example -
// Longhand version
list.forEach(function(item) {
    console.log(item);
});

// Shorthand version
list.forEach(item => console.log(item));
```
<br>

## Combining of Arrays Into an Object Literal
```javascript
// Longhand
const justiceLeaque  = new Array();
justiceLeaque[0] = 'Batman';
justiceLeaque[1] = 'Superman';
justiceLeaque[2] = 'Flash';// Shorthand
const justiceLeaque = ['Batman', 'Superman', 'Flash'];

//Another use case is of Associative Arrays, ie. creating and adding multiple elements to an array using object literals. A point to ///note is that Associative Arrays are fundamentally JavaScript Objects with properties.
// Longhand
const teenTitans = new Array();
teenTitans['Dick Grayson'] = 'Robin';
teenTitans['Kory Anders'] = 'Starfire';
teenTitans['Rachel Roth'] = 'Raven';
teenTitans['Gar Logon'] = 'Beast Boy';

// Shorthand
const teenTitans = {
  'Dick Grayson': 'Robin',
  'Kory Anders': 'Starfire',
  'Rachel Roth': 'Raven',
  'Gar Logon': 'Beast Boy'
};
```
<br>