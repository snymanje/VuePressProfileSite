---
title: Basic Setup with Webpack and Babel
excerpt: "A Guide on setting up webpack with a Vanilla JavaScript Project"
date: 2020-01-19
tags: ["JavaScript","Webpack"]
keywords: "Modern JavaScript Build Setup with Webpack and babel"
cover_image: ""
---

# Modern JavaScript Build Setup with Webpack and Babel
<br>
<hr>
<br>

## Step 1
Create a new project folder and open it in VSCode.  

In the command prompt, run npm init.
```batch
run npm init -y
```
<br>

## Step 2

Install the webpack npm packages.
```batch
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin copy-webpack-plugin
```
The ***html-webpack-plugin*** is to inject the link to the js files into the html file.  
The ***copy-webpack-plugin*** is to move additional files from the src folder to the build (dist) folder. 
<br>

## Step 3

Install the Babel npm packages
```batch
npm install --save-dev @babel/core @babel/preset-env babel-loader
npm install --save core-js regenerator-runtime
```
<br>

## Step 4
Create the project structure.

In the ***root*** on the project, create 2 folders, one called ***dist*** and one called ***src***.  
In the src folder, create 2 folders, one for ***css*** and one for ***js***. Also create a ***index.html*** file.  
In the ***css*** folder create a styles.css file and in the ***js*** folder create a ***main.js*** file.  
In the root create the ***webpack.config.js*** file.  
![webpack_dir](../../src/assets/images/CodeQuality/webpack_dir.png)

<br>

## Step 5

Add some html boilerplate to the index.html file.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/styles.css">
    <title>Webpack Demo</title>
</head>
<body>
    <h2>This is a webpack demo</h2>
    <h3>Change this with JS</h3>
</body>
</html>
```
<br>

## Step 6
<br>

Add the configuration to the webpack.config.js file.
```javascript
const path = require("path");
// plugin to move html file from src to dist and inject the js file(s)
const HtmlWebpackPlugin = require("html-webpack-plugin");
// plugin to move other files from src to dist
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // The main entry point
  entry: ["./src/js/main.js"],
  // Output location for the javascript bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  // The directory used by the webpack dev server.
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([{ from: "src/css", to: "css" }])
  ],
  // babel transpiler config
  module: {
    rules: [
      {
        // testing for javascript files
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

```
<br>

In the package.json file add the below scripts to run the dev\build environment.
```json
"scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --mode development --open"
  }
```
<br>

## SASS

To use SASS instead of just regular CSS, first install the ***node-sass*** package.  
And also install ***npm-run-all***, to run multiple npm scripts.
sass
```batch
npm install node-sass npm-run-all --save-dev
```
<br>
Create a folder called sass in the src directory and in the sass directory a file called styles.scss

![webpack_dir](../../src/assets/images/CodeQuality/webpack_dir.png)

Add the below new lines to run the dev
```json
"scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --mode development --open",
    // new lines
    "watch:sass": "node-sass src/sass/styles.scss -o src/css/ -w",
    "start": "npm-run-all --parallel dev watch:sass"
  }
```
<br>

Now run the start script to launch the dev server and watch changes to the sass file.
```javascript
npm run start
```


