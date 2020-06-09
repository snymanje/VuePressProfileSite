---
title: Nodejs Notes
excerpt: "Nodejs basics"
date: 2019-10-05
tags: ["Nodejs", "javascript"]
keywords: "nodejs"
sidebar: auto
---

# Nodejs Notes

<br>
<hr>
<br>

## Overview

Node give us the ability to runs javascript on the server and not just in the browser.  
At the heart of Nodejs is the V8 engine which converts our javascript into machine code.  
V8 is googles open source high-performance javascript engine written in C++ and used in google chrome.  
V8 can run standalone or can be embedded into any C++ application... like Nodejs.  
Nodejs includes a library called libuv that adds additional capabilities like IO.

## Global Object

In the browser its the Window Object.  
In Nodejs it's called the Global and has methods that can be used out of the box, like (console.log(), setTimeout, etc).  
https://nodejs.org/api/globals.html

<br>

Function statement vs Function Expression

```javascript
//function statement
function syaHi() {
  console.log("Hi");
}
sayHi();

// function expression
var sayBye = function() {
  console.log("Bye");
};
sayBye();
```

<br>

## Moduels and require

A module is just another javascript file

```javascript
const counter = function(name) {
  return name;
};

const counter2 = function(name) {
  return name;
};

const counter3 = function(name) {
  return name;
};

//make function available outside
module.exports = {
  counter,
  counter2,
  counter3,
};
```

```javascript
// in the main file
const { counter } = require("./counter");
console.log(counter);
```

<br>

## Reading and writing files

Use the node fs module

Create a file in the root and call it readme.txt

```javascript
//reading and writing syncronously
var fs = require("fs");
var readMe = fs.readFileSync("readme.txt", utf8);
fs.writeFileSync("writeMe.txt", readMe);
console.log(readMe);
```

```javascript
//reading and writing asyncronously
var fs = require("fs");
var readMe = fs.readFile("readme.txt", utf8, (err, data) => {
  fs.writeFile("writeMe.txt", data);
});
```

<br>

## Creating a node http server without express

```javascript
const http = require("http");
const server = http.createServer((req, res) => {
  console.log(`Request on ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hey ninjas");
});
server.listen(3000, "127.0.0.1");
console.log("Listening on port 3000");
```

<br>

## Event Emitters

For creating custom events

```javascript
// a simple example
const events = require("events");
const myEmitter = new events.EventEmitter();

myEmitter.on("someEvent", (mssg) => {
  console.log(mssg);
});

myEmitter.emit("someEvent", "Firing the event");
```

```javascript
// more complex example
const events = require("events");
const utils = require("util");

const Person = function(name) {
  this.name = name;
};

utils.inherits(Person, events.EventEmitter);

const james = new Person("james");
const mary = new Person("mary");
const ryu = new Person("ryu");

const people = [james, mary, ryu];

people.forEach((person) => {
  person.on("speak", (mssg) => {
    console.log(`${person.name} said: ${mssg}`);
  });
});

james.emit("speak", "Hey dudes");
```

<br>

## Streams and buffers

Temporary storage spot for a chunks of data that is being transferred from one place to another.  
The buffer is filled with data, then passed along.  
Transfers small chuncks od data at a time.  
Increases performance in Node.

Writeable streams - allow node to write data to a stream.  
Readable stream - allows node to read data from a stream.  
Duplex = can read and write to a stream.

Create readable stream

```javascript
const http = require("http");
const fs = require("fs");

const myReadStream = fs.createReadStream(`${__dirname}/readMe.txt`, "utf8");

myReadStream.on("data", (chunk) => {
  console.log("New chuck received:");
  console.log(chunk);
});
```

Create writeable stream

```javascript
const http = require("http");
const fs = require("fs");

const myReadStream = fs.createReadStream(`${__dirname}/readMe.txt`, "utf8");
const myWriteStream = fs.createWriteStream(`${__dirname}/writeMe.txt`, "utf8");

myReadStream.on("data", (chunk) => {
  console.log("New chuck received:");
  myWriteStream.write(chunk);
});
```

Using Pipes with http server

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`Request on ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  const myReadStream = fs.createReadStream(`${__dirname}/readMe.txt`, "utf8");
  myReadStream.pipe(res);
});
server.listen(3000, "127.0.0.1");
console.log("Listening on port 3000");
```

<br>

## Serving HTML pages

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`Request on ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/html" });
  const myReadStream = fs.createReadStream(`${__dirname}/index.html`, "utf8");
  myReadStream.pipe(res);
});
server.listen(3000, "127.0.0.1");
console.log("Listening on port 3000");
```

<br>

## Serving JSON data

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Request on ${req.url}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  const myObj = {
    name: "Jean",
    job: "Solutions Architect",
    age: "35",
  };
  res.end(JSON.stringify(myObj));
});
server.listen(3000, "127.0.0.1");
console.log("Listening on port 3000");
```

<br>

## Routing

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`Request on ${req.url}`);
  if (req.url === "/home" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const myReadStream = fs
      .createReadStream(`${__dirname}/index.html`)
      .pipe(res);
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const myReadStream = fs
      .createReadStream(`${__dirname}/contact.html`)
      .pipe(res);
  } else if (req.url === "/api/ninjas") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const myObj = {
      name: "Jean",
      job: "Solutions Architect",
      age: "35",
    };
    res.end(JSON.stringify(myObj));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    const myReadStream = fs.createReadStream(`${__dirname}/404.html`).pipe(res);
  }
});
server.listen(3000, "127.0.0.1");
console.log("Listening on port 3000");
```

<br>

## Express

Easy and flexible routing system.  
Integrates with many templating engines.  
Contains a middleware framework.

### Responding to Requests

GET - app.get('route', fn)  
POST - app.post('route', fn)  
DELETE - app.delete('route', fn)

### Simple Express app with route

```javascript
const express = require("express");

//Require return a function
const app = express();

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

<br>

### Route Params examples

```javascript
const express = require("express");

//Require return a function
const app = express();

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/contact", (req, res) => {
  res.send("This is the contact page");
});

//route prams
app.get("/profile/:id", (req, res) => {
  res.send("You requested the profile id " + req.params.id);
});

app.get("/profile/:name", (req, res) => {
  res.send("You requested the profile id " + req.params.name);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

<br>

### Templating Engine EJS

```javascript
const express = require("express");

//Require return a function
const app = express();

//Set Templating engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

// Render profile page and pass parameters
app.get("/profile/:name", (req, res) => {
  const data = {
    name: req.params.name,
    age: 35,
    hobbies: ["Cricket", "rugby", "Coding"],
    //hobbies: ["Cricket", "Rugby", "Coding"]
  };
  res.render("profile", { data });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

In the ejs template

```javascript
<h1>This is the profile page for <%= data.name %> with age <%= data.age %> and hobbies <% data.hobbies.forEach(item => { %>
    <li><%= item %></li>
<% }) %></h1>
```

<br>

### Partial views

Create a partials folder in the views folder and in that the file nav.ejs

```javascript
<nav>
  <ul>
    <li>
      <a href="#">Home</a>
    </li>
    <li>
      <a href="#">Contact</a>
    </li>
  </ul>
</nav>
```

```javascript
//Include this on all the required views to render that partial page.
<% include partials/nav.ejs %>
```

<br>

## Adding middleware files like css

<br>

![Middelware](/assets/images/Nodejs/Nodejs-middleware.jpg)

```javascript
//using middelware (call next to move on to next middleware functions)
app.use("/assets", express.static("assets"));
```

```javascript
//using middelware (call next to move on to next middleware functions)
app.use("/assets", (req, res, next) => {
    console.log('Middleware running');
    next();
}));
```

<br>

### Query Strings

mysite.com/blog/news?page=2  
Page=2  
mysite.com/contact?person=jean&dept=marketing

Query parameters can be access on the req object

```javascript
app.get("/contact", (req, res) => {
  res.send(req.query);
});
```

<br>

### POST Requests

POST is a request method.  
POST requests, ask the server to accept/store data which is enclosed in the body of the request.  
Often used when submitting forms.

Require body-parser package to be installed

```javascript
npm install body-parser

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
```

<br>

## MVC Architecture

<br>

![MVC](/assets/images/Nodejs/mvcOverview.jpg)

<br>

![MVC](/assets/images/Nodejs/mvcAppVsBussLogic.jpg)

<br>

## Error Handling Middleware

<br>

![MVC](/assets/images/Nodejs/Error-handling-middleware.jpg)

## JWT

<br>

![MVC](/assets/images/Nodejs/jwt0.JPG)

![MVC](/assets/images/Nodejs/jwt1.JPG)

![MVC](/assets/images/Nodejs/jwt2.JPG)

Github example.  
https://github.com/snymanje/Node-TodoApp-MVC
