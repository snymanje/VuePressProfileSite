---
title: Querying and updating the DOM using Javascript
excerpt: "Manipulating the DOM using Javascript"
date: 2019-12-28
tags: ["DOM", "JavaScript"]
keywords: "Querying and updating the DOM using Javascript"
cover_image: ""
---

# Querying and updating the DOM using Javascript
<br>
<hr>
<br>

## Get Element By Id

```javascript
const element = document.getElementById('page-banner');
```
<br>

## Get Element By Class or Tag

```javascript
// By Class
// Retrieves a list(html collection) of element with the same name
const elements = document.getElementsByClassName('title');

// By Tag 
// Retrieves a list(html collection) of element with the same name
const elements = document.getElementsByTagName('li');
```
<br>

## Loop through an HTML collection

```javascript
const el = document.getElementsByTagName('li');

// First convert the HTML collection to an array with Array.from()
Array.from(el).forEach(el => {
    console.log(el) // <li></li>
})
```
<br>

## Get Element with querySelector

```javascript
// returns one element
const el = document.querySelector('#book-list li:nth-child(2) .name');

console.log(el); // <span class="name">The Wise Man's Fear</span>
```
<br>

## Get Element with querySelectorAll

```javascript
// returns an Node list.
const books = document.querySelectorAll('#book-list .name');

books.forEach(book => {
    console.log(book.textContent);
})
```
<br>

## Changing Text & HTML Content

<br>

Updating textContent
```javascript
const books = document.querySelectorAll('#book-list .name');

books.forEach(book => {
    book.textContent += '(book title)'
})
```
<br>
Updating html

```javascript
const books = document.querySelectorAll('#book-list .name');

books.forEach(book => {
    book.innerHTML += '<h3>Added a heading tag</h3>'
})
```
<br>

## Nodes

```javascript
const banner = document.querySelector('#page-banner');

// Get Node names
console.log(`#page-banner is nodeName: ${banner.nodeName}`) // #page-banner is nodeName: DIV

// Check for Child nodes
console.log(`#page-banner is hasChildNodes?: ${banner.hasChildNodes()}`) // #page-banner is hasChildNodes?: true

// Cloned Node with child nodes.
const clonedBanner = banner.cloneNode(true);
console.log(clonedBanner);
```
<br>

## Traversing the DOM

```javascript
const bookList = document.querySelector('#book-list');
console.log(bookList);

// Parent nodes
console.log('ParentNode is: ', bookList.parentNode)
console.log('ParentNode is: ', bookList.parentElement)
console.log('ParentNode is: ', bookList.parentElement.parentElement)

// Child Nodes
console.log('ChildNode is: ', bookList.childNodes)
console.log('ChildNode is: ', bookList.children)

// Siblings
console.log('Next sibling is: ', bookList.nextSibling)
console.log('Previous sibling is: ', bookList.nextElementSibling)
console.log('Next sibling is: ', bookList.previousSibling)
console.log('Previous sibling is: ', bookList.previousElementSibling)

// A more complex example combining some selectors.
bookList.previousElementSibling.querySelector('p').innerHTML += '<br /> Too cool for everyone else!'
```
<br>

## Events

Using the addEventListener,
```javascript
const h2 = document.querySelector('#book-list h2');

h2.addEventListener('click', function(e) {
    console.log('Event clicked', e.target)
})

// Delete li element example
const btns = document.querySelectorAll('#book-list .delete');

btns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const li = e.target.parentElement;
        console.log(li); // <li></li>
        console.log(li.parentNode) // <ul></ul>
        li.parentNode.removeChild(li);
    })
})

// Prevent default navigation when clicking a link.
const link = document.querySelector('#page-banner a');

link.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Navigation to', e.target.textContent, 'was prevented')
})

// A beter way using event bubbeling
const list = document.querySelector('#book-list ul');
list.addEventListener('click', function(e) {
    if(e.target.className === 'delete') {
        const li = e.target.parentElement;
        list.removeChild(li);
    }
})
```
<br>

## Forms

<br>

Selecting a form.
```javascript
 document.forms['add-book'] // <form id="add-book"></form>
```
<br>

Create and add element to DOM
```javascript
// add book-list form

const addForm = document.forms["add-book"];
const list = document.querySelector("#book-list ul");

addForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const value = addForm.querySelector('input[type="text"').value;

  // create elements
  const li = document.createElement("li");
  const bookName = document.createElement("span");
  const deleteBtn = document.createElement("span");

  // append to document
  li.appendChild(bookName);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  // Add text content
  bookName.textContent = value;
  deleteBtn.textContent = "delete";

  // add classes
  bookName.classList.add("name");
  deleteBtn.classList.add("delete");
});

```
<br>

## Attributes

```javascript
const book = document.querySelector('li:first-child .name')

// Get attribute name
item.getAttribute('class') // "name"

// set attribute value
item.setAttribute('class', 'newClass')

// check if element has any attributes
item.hasAttributes() // true

// check for specific attribute
item.hasAttribute('class') // true

// remove an attribute
item.removeAttribute('class')
```
<br>

## Checkboxes & Change Events

```javascript
// hide elements
const hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", function(e) {
  if (hideBox.checked) {
    list.style.display = "none";
  } else {
    list.style.display = "initial";
  }
});
```
<br>

## Create a Search Filter

```javascript
// filter elements
const searchbar = document.forms["search-books"].querySelector("input");
searchbar.addEventListener("keyup", function(e) {
  const term = e.target.value.toLowerCase();
  const books = list.getElementsByTagName("li");

  Array.from(books).forEach(book => {
    const title = book.firstElementChild.textContent;
    title.toLocaleLowerCase().includes(term)
      ? (book.style.display = "block")
      : (book.style.display = "none");
  });
});
```
<br>

## Add remove classes based on active tabs


```javascript
const tabs = document.querySelector(".tabs");
const panels = document.querySelectorAll(".panel");
tabs.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    const targetPanel = document.querySelector(e.target.dataset.target);
    Array.from(panels).forEach(panel => {
      panel === targetPanel
        ? panel.classList.add("active")
        : panel.classList.remove("active");
    });
  }
});
```
<br>
<br>

Small App Example

https://codesandbox.io/embed/js-interacting-with-the-dom-mn28n?fontsize=14&hidenavigation=1&theme=dark

<br>
<br>

### Thanks for reading!



