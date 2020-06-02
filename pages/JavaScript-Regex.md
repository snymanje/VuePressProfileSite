---
title: JavaScript - Regular Expressions
excerpt: "JavaScript - Regular Expression Examples"
date: 2019-12-29
tags: ["Javascript"]
keywords: "javascript"
cover_image: ""
---

# Regular Expressions
<br>
<hr>
<br>

* Regular expressions always start with a / and ends with a /  
<br>

## Character sets
* /ninja/ - searches for the first occurence of ninja in a string
* /ninja/g - searches for all the occurences of te word ninja in a string 
* /ninja/gi - searches for all the occurences of te word ninja in a string - case insensitive
* /[ng]inja/g - search for all occurences of both ninja and ginja. [] contains the first charater
* /[^p]inja/g - search for all occurences where it does not start with a p.  
<br>

## Ranges
* /[a-z]inja/g - search for all occurences where it starts with a - z, like ainja, binja, cinja. 
* /[^a-cx-z]inja/g - Exclude a - c and include x - z.
* /[0-9]inja/g - search for all occurences where it starts with 0 - 9, like 0inja, 1inja, 2inja. 
<br><br>

## Repeating Characters
* /[0-9]+/ - At least one match.
* /[0-9]{5}/ - Searches for 5 consecutive numbers between 0 and 9 
* /[0-9]{5,8}/ - Searches for the numbers between 5 and 8
* /[0-9]{5,}/ - Searches for the numbers after 5
* /[a-z]{5}/ - same as with the numbers above
<br><br>

## Metacharacters
* \d - match any digit character (same as [0-9])
* \w - match any word character (a-z, A-Z, 0-9, and _ )
* \s - match a whitespace character (spaces, tabs etc)
* \t - match a tab character only
<br><br>

Example
```javascript
\d{3}\s\w{5}\g  // 134 words
```
<br>

##  Special Characters
* '+' - The one-or-more quantifier
* '\' - The escape character
* '[]' - The character set
* '[^]' - The negate symobol in a character set
* '?' - The zero-or-more quantifier (makes a preceding char optional)
* '.' - Any character whatsoever (except the newline character)
* '*' - the 0-or-more quantifier (a bit like +)

<br>

examples 
```javascript
// o is now option because of the ?
/hello?/g   // this will match hell

// the charater after the r can be anything because of the .
/car./g // this will match carr, carz, car5, etc.

// the charater after the first a can be any number of letter
/a[a-z]*/  // this wil match aabcdef.... 
```
<br>

##  Starting and ending Patterns

* ^ indicates the starting position (not the same as [^])
* $ indicated the ending position
* /^[0-9]{5}$/ - searches for 5 numbers only, nothing before it or after is

```javascript
// Start and end 
// matches 12345 
// don't match 123456
/^[0-9]{5}$/   

// matches hello 
// don't match hellou
/^[a-z]{5}$/   

// removing the ^ 
// matches 111111hello 
// don't match hello11111
/[a-z]{5}$/  

// removing the $
// matches hello111111
// don't match 111111hello
/^[a-z]{5}/  
```
<br>

##  Alternate Charaters

* | - this is same as OR.

```javascript
/(pet|toy|crazy) rabbit/g
// Will match the following
// pet rabbit
// toy rabbit
// crazy rabbit
// will not match this
// hello rabbit
```
<br>

##  How do we create a regex in JavaScript?

```javascript
// option 1
const reg = /[a-z]/gi;

// options 2
const reg2 = new RegExp(/[a-z]/,'gi');
```
<br>

##  Example application 

```javascript
// regex patterns
const patterns = {
  telephone: /^0\d{9}$/,
  username: /^[a-z\d]{5,12}$/i,
  password: /^[\d\w@-]{8,20}$/i,
  slug: /^[a-z\d-]{8,20}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
  //             yourname @ domain   .  com          ( .uk )
};
```
<br>

https://codesandbox.io/embed/smoosh-fire-s5sdp?fontsize=14&hidenavigation=1&theme=dark


