---
title: Build a Basic CLI with Nodejs and Commander
excerpt: "A Basic Nodejs CLI with commander"
date: 2020-01-05
tags: ["Nodejs", "javascript"]
keywords: "nodejs"
sidebar: auto
---

# Build a Basic CLI with Nodejs and Commander

<br>
<hr>
<br>

### Commander.js is a very popular module that lets you create your own CLI program.

<br>
Create a app.js file and add the below boilerplate code.

```javascript
// import commander
const program = require("commander");

// set the version number ( You can run node app --version )
program.version("1.0.0").description("Client Management System");

// Create a add command
program
  .command("add <firstname> <lastname> <phone> <email>")
  .alias("a")
  .description("Add a customer")
  .action((firstname, lastname, phone, email) => {
    console.log({ firstname, lastname, phone, email });
  });

// Create a find command
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => {
    console.log(`Customer found ${name}`);
  });

// Create a List command
program
  .command("list")
  .alias("l")
  .description("List all customers")
  .action(() => {
    console.log("List of customers");
  });

program.parse(process.argv);
```

<br>

Run **_node app --version_**

![commander help](/assets/images/Nodejs/Commanderjs.jpg)

<br>

Run the add command

```bash
node commands.js add John Doe 0868907335 john.doe@gmail.com

{
  firstname: 'John',
  lastname: 'Doe',
  phone: '0868907335',
  email: 'john.doe@gmail.com'
}

```

<br>

### Addition Resources

[Commander npm package](https://www.npmjs.com/package/commander "Commander")  
[Inquirer npm package](https://www.npmjs.com/package/inquirer "inquirer")  
[Build CLI Video](https://www.youtube.com/watch?v=v2GKt39-LPA&t=2246s "Build CLI Video")
